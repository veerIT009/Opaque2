<?php

namespace App\Repositories;

use Exception;
use Carbon\Carbon;
use App\Models\Tag3;
use App\Models\Book3;
use App\Models\Genre3;
use App\Models\Author3;
use App\Models\Product3;
use App\Models\BookItem3;
use App\Models\Publisher3;
use App\Traits\ImageTrait;
use App\Imports\BookImport;
use Illuminate\Support\Arr;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Spatie\MediaLibrary\Support\File;
use Illuminate\Database\Eloquent\Builder;
use App\Exceptions\MissingPropertyException;
use App\Exceptions\ApiOperationFailedException;
use Illuminate\Support\Facades\DB as FacadesDB;
use Illuminate\Container\Container as Application;
use App\Repositories\Contracts\BookRepositoryInterface3;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class BookRepository
 */
class BookRepository3 extends BaseRepository3 implements BookRepositoryInterface3
{
    use ImageTrait;

    /** @var TagRepository */
    private $tagRepo;

    /** @var GenreRepository */
    private $genreRepo;

    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
        'published_on',
        'isbn',
        'is_featured',
    ];



    public function __construct(Application $app, TagRepository $tagRepository, GenreRepository $genreRepository)
    {
        parent::__construct($app);
        $this->tagRepo = $tagRepository;
        $this->genreRepo = $genreRepository;
    }

    /**
     * Return searchable fields
     *
     * @return array
     */
    public function getFieldsSearchable()
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Book3::class;
    }

    /**
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     * @param  array  $columns
     *
     * @return Book[]|Collection|int
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*'])
    {
        $orderBy = null;
        if (!empty($search['order_by']) && ($search['order_by'] == 'author_name')) {
            $orderBy = $search['order_by'];
            unset($search['order_by']);
        }

        $query = $this->allQuery($search, $skip, $limit);
        if (isset($search['is_ebooks']) && $search['is_ebooks']) {
            $query = $query->with([
                'authors', 'items' => function ($query) {
                    $query->where('format', BookItem3::FORMAT_E_BOOK);
                    $query->with(['publisher', 'language']);
                },
            ])->whereHas('items', function (Builder $query) {
                $query->where('format', BookItem3::FORMAT_E_BOOK);
            });
        } else {
            $query = $query->with(['genres', 'authors', 'items.publisher', 'items.language']);
        }
        $this->applyDynamicSearch($search, $query);

        if (!empty($search['withCount'])) {
            return $query->count();
        }

        $bookRecords = $query->get();

        if (!empty($orderBy)) {
            $sortDescending = ($search['direction'] == 'asc') ? false : true;
            $orderString = '';

            if ($orderBy == 'author_name') {
                $orderString = 'authors_name';
            }

            $bookRecords = $bookRecords->sortBy($orderString, SORT_REGULAR, $sortDescending);
        }

        return $bookRecords->values();
    }

    /**
     * @param  array  $search
     * @param  Builder  $query
     *
     * @return Builder
     */
    public function applyDynamicSearch($search, $query)
    {
        $query->when(!empty($search['search']), function (Builder $query) use ($search) {
            $keywords = explode_trim_remove_empty_values_from_array($search['search'], ' ');

            $query->orWhereHas('authors', function (Builder $query) use ($keywords) {
                Author3::filterByName($query, $keywords);
            });

            $query->orwhereHas('items.publisher', function (Builder $query) use ($keywords) {
                Publisher3::filterByName($query, $keywords);
            });
        });

        return $query;
    }

    /**
     * @param  array  $input
     *
     * @throws Exception
     *
     * @throws ApiOperationFailedException
     *
     * @return mixed
     */
    public function store($input)
    {
        $this->validateInput($input);
        try {
            DB::beginTransaction();
            if (isset($input['photo']) && !empty($input['photo'])) {
                $input['image'] = ImageTrait::makeImage($input['photo'], Book3::IMAGE_PATH);
            }

            if (!empty($input['image_url'])) {
                $input['image'] = ImageTrait::makeImageFromURL($input['image_url'], Book3::IMAGE_PATH);
                unset($input['image_url']);
            }

            /** @var Book $book */
            $book = Book3::create($input);

            $this->attachTagsAndGenres($book, $input);
            if (!empty($input['authors'])) {
                $this->attachAuthors($book, $input);
            }

            if (isset($input['items'])) {
                $this->createOrUpdateBookItems($book, $input['items']);
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            if (isset($input['image']) && !empty($input['image'])) {
                $this->deleteImage(Book3::IMAGE_PATH . DIRECTORY_SEPARATOR . $input['image']);
            }
            throw new ApiOperationFailedException($e->getMessage());
        }

        return Book3::with(['tags', 'genres', 'items', 'authors'])->findOrFail($book->id);
    }

    /**
     * @param  array  $input
     *
     * @throws Exception
     *
     * @return bool
     */
    public function validateInput($input)
    {
        if (isset($input['items'])) {
            $this->validateItems($input['items']);
        }

        return true;
    }

    /**
     * @param  array  $items
     *
     * @throws Exception
     *
     * @return bool
     */
    public function validateItems($items)
    {
        foreach ($items as $item) {
            if (empty($item['language_id'])) {
                throw new MissingPropertyException('Language is required.');
            }

            if (isset($item['format'])) {
                if (!in_array(
                    $item['format'],
                    [BookItem3::FORMAT_HARDCOVER, BookItem3::FORMAT_PAPERBACK, BookItem3::FORMAT_E_BOOK]
                )) {
                    throw new UnprocessableEntityHttpException('Invalid Book Format.');
                }
            }

            if ($this->checkBookItemIsEBOOK($item) && !isset($item['file'])) {
                throw new UnprocessableEntityHttpException('E-Book is required.');
            }

            if (isset($item['book_code'])) {
                if (strlen($item['book_code']) > 10 || strlen($item['book_code']) < 10) {
                    throw new UnprocessableEntityHttpException('Book code must be 10 character long.');
                }

                $bookItem = BookItem3::whereBookCode($item['book_code']);

                if (isset($item['id'])) {
                    $bookItem->where('id', '!=', $item['id']);
                }
                if ($bookItem->exists()) {
                    throw new UnprocessableEntityHttpException('Given book code is already exist.');
                }
            }
        }

        return true;
    }

    /**
     * @param  Book  $book
     * @param  array  $input
     *
     * @return Book
     */
    public function attachTagsAndGenres($book, $input)
    {
        $tags = (!empty($input['tags'])) ? $input['tags'] : [];
        $tags = array_map(function ($value) {
            return is_numeric($value) ? $value : Tag3::create(['name' => $value])->id;
        }, $tags);
        $book->tags()->sync($tags);

        $genres = (!empty($input['genres'])) ? $input['genres'] : [];
        $genres = array_map(function ($value) {
            return is_numeric($value) ? $value : Genre3::create(['name' => $value])->id;
        }, $genres);
        $book->genres()->sync($genres);

        return $book;
    }

    /**
     * @param  Book  $book
     * @param  array a$input
     *
     * @return bool
     */
    public function attachAuthors($book, $input)
    {
        $authors = array_map(function ($value) {
            if (is_numeric($value)) {
                return $value;
            }

            $result = explode(' ', $value);
            $author = Author3::create(['first_name' => $result[0], 'last_name' => isset($result[1]) ? $result[1] : '']);

            return $author->id;
        }, $input['authors']);
        $book->authors()->sync($authors);

        return true;
    }

    /**
     * @param  Book  $book
     * @param  array  $bookItems
     *
     * @throws Exception
     * @throws ApiOperationFailedException
     *
     * @return bool
     */
    public function createOrUpdateBookItems($book, $bookItems)
    {
        $existingItems = $book->items->pluck('id');
        $removedItems = array_diff($existingItems->toArray(), Arr::pluck($bookItems, 'id'));

        try {
            FacadesDB::beginTransaction();
            BookItem3::whereIn('id', $removedItems)->delete();
            /** @var BookItem $bookItem */
            foreach ($bookItems as $bookItem) {

                if (!empty($bookItem['publisher_id']) && !is_numeric($bookItem['publisher_id'])) {
                    $publisher = Publisher3::create(['name' => $bookItem['publisher_id']]);
                    $bookItem['publisher_id'] = $publisher->id;
                }

                if (!empty($bookItem['id'])) {
                    $item = BookItem3::findOrFail($bookItem['id']);
                } else {
                    $item = new BookItem();
                    $item->book_code = isset($bookItem['book_code']) ? $bookItem['book_code'] : $this->generateUniqueBookCode();
                    $item->status = BookItem3::STATUS_AVAILABLE;
                }

                if (isset($bookItem['file'])) {
                    $item->file_name = ImageTrait::makeAttachment(
                        $bookItem['file'],
                        "ebooks",
                        config('app.media_disc')
                    );
                }

                if (isset($bookItem['pdf_preview_file'])) {
                    $item->pdf_preview_file = ImageTrait::makeAttachment(
                        $bookItem['pdf_preview_file'],
                        "PDFPreview",
                        config('app.media_disc')
                    );
                }

                $item->edition = isset($bookItem['edition']) ? $bookItem['edition'] : '';
                $item->format = isset($bookItem['format']) ? $bookItem['format'] : null;
                $item->location = isset($bookItem['location']) ? $bookItem['location'] : '';
                $item->price = isset($bookItem['price']) ? $bookItem['price'] : null;
                $item->publisher_id = isset($bookItem['publisher_id']) ? $bookItem['publisher_id'] : null;
                $item->language_id = isset($bookItem['language_id']) ? $bookItem['language_id'] : null;
                $item->product_id = isset($bookItem['product_id']) ? $bookItem['product_id'] : null;
                $item->rack_number = isset($bookItem['rack_number']) ? $bookItem['rack_number'] : null;

                if ($this->checkBookItemIsEBOOK($bookItem)) {
                    $item->status = BookItem3::STATUS_AVAILABLE;
                } else {
                    $item->status = isset($bookItem['status']) ? $bookItem['status'] : BookItem3::STATUS_AVAILABLE;
                }

                $book->items()->save($item);
            }
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            throw new ApiOperationFailedException('Unable to update Book Items: ' . $e->getMessage());
        }

        return true;
    }

    /**
     * @param  Book  $book
     * @param  array  $bookItem
     *
     * @return mixed
     */
    public function addItem($book, $bookItem)
    {
        try {
            if (!empty($bookItem['publisher_id']) && !is_numeric($bookItem['publisher_id'])) {
                $publisher = Publisher3::create(['name' => $bookItem['publisher_id']]);
                $bookItem['publisher_id'] = $publisher->id;
            }

            if (!empty($bookItem['id'])) {
                $item = BookItem3::findOrFail($bookItem['id']);
            } else {
                if (isset($bookItem['book_code'])) {
                    $bookItemExists = BookItem3::whereBookCode($bookItem['book_code'])->exists();
                    if ($bookItemExists) {
                        throw new UnprocessableEntityHttpException('book code already exists');
                    }
                }
                $item = new BookItem();
                $item->book_code = isset($bookItem['book_code']) ? $bookItem['book_code'] : $this->generateUniqueBookCode();
                $item->status = BookItem3::STATUS_AVAILABLE;
            }

            if ($this->checkBookItemIsEBOOK($bookItem) && !empty($bookItem['file'])) {
                $item->file_name = ImageTrait::makeAttachment(
                    $bookItem['file'],
                    "ebooks",
                    config('app.media_disc')
                );
            }


            // if (isset($bookItem['file'])) {
            //     $item->file_name = ImageTrait::makeAttachment(
            //         $bookItem['file'],
            //         "ebooks",
            //         config('app.media_disc')
            //     );
            // }

            $item->book_code = isset($bookItem['book_code']) ? $bookItem['book_code'] : $this->generateUniqueBookCode();
            $item->edition = isset($bookItem['edition']) ? $bookItem['edition'] : '';
            $item->format = isset($bookItem['format']) ? $bookItem['format'] : null;
            $item->location = isset($bookItem['location']) ? $bookItem['location'] : '';
            $item->price = isset($bookItem['price']) ? $bookItem['price'] : null;
            $item->publisher_id = isset($bookItem['publisher_id']) ? $bookItem['publisher_id'] : null;
            $item->language_id = isset($bookItem['language_id']) ? $bookItem['language_id'] : null;
            $item->rack_number = isset($bookItem['rack_number']) ? $bookItem['rack_number'] : null;
            if ($this->checkBookItemIsEBOOK($bookItem)) {
                $item->status = BookItem3::STATUS_AVAILABLE;
            } else {
                $item->status = isset($bookItem['status']) ? $bookItem['status'] : BookItem3::STATUS_AVAILABLE;
            }

            $book->items()->save($item);

            return $this->findOrFail($book->id, ['items.publisher', 'items.language']);
        } catch (Exception $exception) {
            throw new UnprocessableEntityHttpException($exception->getMessage());
        }
    }

    /**
     * @return string
     */
    public function generateUniqueBookCode()
    {
        $rand = rand(1, 99999999);

        $itemId = sprintf('%08d', $rand);
        while (true) {
            if (!BookItem3::whereBookCode($itemId)->exists()) {
                break;
            }
            $itemId = rand(1, 99999999);
        }

        return $itemId;
    }

    /**
     * @param  array  $input
     * @param  int  $id
     *
     * @throws Exception
     * @throws ApiOperationFailedException
     *
     * @return JsonResponse|mixed
     */
    public function update($input, $id)
    {
        /** @var Book $book */
        $book = $this->findOrFail($id);
        unset($input['items']);
        $this->validateInput($input);
        $oldImageName = '';

        try {
            DB::beginTransaction();

            if (isset($input['photo']) && !empty($input['photo'])) {
                $input['image'] = ImageTrait::makeImage($input['photo'], Book3::IMAGE_PATH);
                $oldImageName = $book->image;
            }

            if (!empty($oldImageName) || !empty($input['remove_image'])) {
                $book->deleteImage();
            }
            $book->update($input);
            $this->attachTagsAndGenres($book, $input);
            if (!empty($input['authors'])) {
                $this->attachAuthors($book, $input);
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            if (isset($input['image']) && !empty($input['image'])) {
                $this->deleteImage(Book3::IMAGE_PATH . DIRECTORY_SEPARATOR . $input['image']);
            }
            throw new ApiOperationFailedException($e->getMessage());
        }

        return Book3::with(['tags', 'genres', 'items.publisher', 'items.language', 'authors'])->findOrFail($book->id);
    }

    /**
     * @param  Book  $book
     * @param  array  $items
     * @throws Exception
     *
     * @return Book
     */
    public function addBookItems($book, $items)
    {
        $this->validateItems($items);

        $this->createOrUpdateBookItems($book, $items);

        /** @var Book $book */
        $book = $this->findOrFail($book->id, ['items.publisher', 'items.language']);

        return $book;
    }

    /**
     * @param  string  $isbn
     *
     * @throws ApiOperationFailedException
     *
     * @return array
     */
    public function getBookDetailsFromISBN($isbn)
    {
        $url = config('services.openlib.api');
        $url = str_replace('{ISBN_NO}', $isbn, $url);
        $bookDetails = (new Book())->getFillable();
        $bookDetails = array_fill_keys($bookDetails, null);
        $bookDetails = array_merge(
            $bookDetails,
            ['tags' => [], 'publishers' => [], 'authors' => [], 'genres' => [], 'languages' => []]
        );

        try {

            $client = new \GuzzleHttp\Client();
            $res = $client->get($url);
            $content = (string) $res->getBody();

            /*  $data = file_get_contents($url); */
            $data = json_decode($content, true);

            if (empty($data)) {
                return $bookDetails;
            }
            $data = $data['ISBN:' . $isbn];

            $bookDetails['name'] = $data['title'];
            $bookDetails['published_on'] = (isset($data['publish_date'])) ?             Carbon::parse($data['publish_date'])->toDateTimeString() : null;
            $bookDetails['description'] = (isset($data['notes'])) ? $data['notes'] : null;
            $bookDetails['isbn'] = $isbn;
            $bookDetails['is_featured'] = false;

            if (isset($data['cover']['large'])) {
                $bookDetails['image_url'] = $data['cover']['large'];
            }

            if (isset($data['ebooks'][0]['preview_url'])) {
                $bookDetails['url'] = $data['ebooks'][0]['preview_url'];
            }

            if (isset($data['authors'])) {
                foreach ($data['authors'] as $author) {
                    list($firstName, $lastName) = explode(' ', $author['name']);

                    $authorDBRecord = Author3::whereFirstName($firstName)->whereLastName($lastName)->first();
                    if (!empty($authorDBRecord)) {
                        $bookDetails['authors'][] = $authorDBRecord->id;
                    } else {
                        $bookDetails['authors'][] = $author['name'];
                    }
                }
            }

            if (isset($data['publishers'])) {
                foreach ($data['publishers'] as $publisher) {
                    $publisherDBRecord = Publisher3::whereName($publisher['name'])->first();
                    if (!empty($publisherDBRecord)) {
                        $bookDetails['publishers'][] = $publisherDBRecord->id;
                    } else {
                        $bookDetails['publishers'][] = $publisher['name'];
                    }
                }
            }

            return $bookDetails;
        } catch (Exception $e) {

            throw new ApiOperationFailedException('Unable to get book details : ' . $e->getMessage());
        }
    }

    /**
     * @param  bool  $today
     * @param  string|null  $startDate
     * @param  string|null  $endDate
     *
     * @return array
     */
    public function booksCount($today, $startDate = null, $endDate = null)
    {
        $query = Book3::query();
        if (!empty($startDate) && !empty($endDate)) {
            $query->select('*', DB::raw('DATE(created_at) as date'));
            $query->whereRaw('DATE(created_at) BETWEEN ? AND ?', [$startDate, $endDate]);
        } elseif ($today) {
            $query->whereRaw('DATE(created_at) = ? ', [Carbon::now()->toDateString()]);
        }

        $records = $query->get();
        $books = prepareCountFromDate($startDate, $endDate, $records);

        return [$records->count(), $books];
    }

    /**
     * @return array
     */
    public function booksCountFromGenres()
    {
        /** @var Genre[] $genres */
        $genresRecords = Genre::withCount('books')->whereHas('books')->get();

        $genres = $booksCount = $colors = $colorsWithDifferentOpacity = [];
        foreach ($genresRecords as $genre) {
            $genres[] = $genre->name;
            $booksCount[] = $genre->books_count;
            $color = getRandomColor(0.9);
            $colors[] = $color;

            $color = substr($color, 0, -6);
            $color .= ', 0.7)';

            $colorsWithDifferentOpacity[] = $color;
        }

        return [$genres, $booksCount, $colors, $colorsWithDifferentOpacity];
    }

    /**
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     * @param  array  $columns
     *
     * @return Book[]|Collection
     */
    public function searchBooks($search = [], $skip = null, $limit = null, $columns = ['*'])
    {
        $query = Book3::query();
        if (!empty($search['by_authors'])) {
            $keywords = explode_trim_remove_empty_values_from_array($search['search'], ' ');
            $query->whereHas('authors', function (Builder $query) use ($keywords) {
                Author3::filterByName($query, $keywords);
            });
        }

        if (!empty($search['by_books'])) {
            $query = filterByColumns($query, $search['search'], ['name', 'description']);
        }

        if (!empty($search['is_featured'])) {
            $query->where('is_featured', true);
        }

        $count = $query->count();

        if (!is_null($skip)) {
            $query->skip($skip);
        }

        if (!is_null($limit)) {
            $query->limit($limit);
        }

        $bookRecords = $query->get();

        return [$bookRecords, $count];
    }

    /**
     * @param  array  $input
     *
     * @throws ApiOperationFailedException
     *
     * @return bool
     */
    public function importBooks($input)
    {
        try {
            /** @var UploadedFile $file */
            $file = $input['file'];

            $extension = $file->getClientOriginalExtension();
            if (!in_array($extension, ['xlsx', 'xls'])) {
                throw new ApiOperationFailedException('File must be xlsx or xls. Received: ' . htmlspecialchars(strip_tags($extension)));
            }

            $path = Book3::IMPORT . '/' . time() . '.' . $extension;
            $filePath = public_path('uploads/') . $path;
            move_uploaded_file($file->getRealPath(), $filePath); // for temp use only
            $readerType = ($extension == 'xlsx' ? \Maatwebsite\Excel\Excel::XLSX : \Maatwebsite\Excel\Excel::XLS);

            \Maatwebsite\Excel\Facades\Excel::import(new BookImport, $path, 'local', $readerType);

            // Delete file from system
            File::delete($filePath);

            return true;
        } catch (Exception $e) {
            // Delete file from system
            File::delete($filePath);
            throw new ApiOperationFailedException($e->getMessage());
        }
    }

    /**
     * @param  array  $input
     *
     * @return bool
     */
    public function checkBookItemIsEBOOK($input)
    {
        if (isset($input['format']) && $input['format'] == BookItem3::FORMAT_E_BOOK) {
            return true;
        }

        return false;
    }
}

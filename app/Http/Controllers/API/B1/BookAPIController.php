<?php

namespace App\Http\Controllers\API\B1;

use Exception;
use App\Models\Book;
use App\Exports\BookExport;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\BookImportRequest;
use App\Http\Requests\API\CreateBookRequest;
use App\Http\Requests\API\UpdateBookRequest;
use App\Http\Requests\API\AddBookItemRequest;
use App\Http\Requests\API\BookDetailsRequest;
use App\Exceptions\ApiOperationFailedException;
use App\Repositories\Contracts\BookRepositoryInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use App\Models\Brand;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Unit;

/**
 * Class BookAPIController
 */
class BookAPIController extends AppBaseController
{
    /** @var BookRepositoryInterface */
    private $bookRepository;

    public function addBook(Request $req)
    {
        $input = $req->all();

        if ($req->file()) {
            $fileName = time() . '_' . $req->file->getClientOriginalName();
            // $filePath = $req->file('file')->storeAs('uploads', $fileName, 'public');
            $filePath = Storage::putFileAs("public", $req->file, $fileName, 'public');
            return $this->sendResponse($req->file->getClientOriginalName(), 'Book saved successfully.');
        }
    }

    public function __construct(BookRepositoryInterface $bookRepo)
    {
        $this->bookRepository = $bookRepo;
    }

    /**
     * Display a listing of the Book.
     * GET|HEAD /books
     *
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {

        $input = $request->except(['skip', 'limit']);
        $books = $this->bookRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        $input['withCount'] = 1;

        return $this->sendResponse(
            $books->toArray(),

            [
                'message' => 'Books retrieved successfully.',
                'totalRecords' => $this->bookRepository->all($input)
            ],

        );
    }

    public function upcommingBooks(Book $book, Request $request)
    {

        $input = $request->except(['skip', 'limit']);
        $books = $this->bookRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        $input['withCount'] = 1;

        return $this->sendResponse(
            $books->toArray(),

            [
                'message' => 'Books retrieved successfully.',
                'totalRecords' => $this->bookRepository->all($input)
            ],

        );
    }

    /**
     * Store a newly created Book in storage.
     * POST /books
     *
     * @param  CreateBookRequest  $request
     *
     * @throws ApiOperationFailedException
     *
     * @return JsonResponse
     */
    public function store(CreateBookRequest $request)
    {
        $input = $request->all();

        $book = $this->bookRepository->store($input);

        return $this->sendResponse($book->toArray(), 'Book saved successfully.');
    }

    /**
     * Display the specified Book.
     * GET|HEAD /books/{id}
     *
     * @param  Book  $book
     *
     * @return JsonResponse
     */
    public function show(Book $book)
    {
        $book = Book::with(['tags', 'genres', 'authors', 'items.language', 'items.publisher'])->findOrFail($book->id);

        return $this->sendResponse($book->toArray(), 'Book retrieved successfully.');
    }

    /**
     * Update the specified Book in storage.
     * PUT/PATCH /books/{id}
     *
     * @param  Book  $book
     * @param  UpdateBookRequest  $request
     *
     * @throws ApiOperationFailedException
     * @return JsonResponse
     */
    public function update(Book $book, UpdateBookRequest $request)
    {
        /** @var Book $book */
        $book =  Book::with(['tags', 'genres', 'items.publisher', 'items.language', 'authors'])->findOrFail($book->id);

        $input = $request->all();

        $book = $this->bookRepository->update($input, $book->id);

        return $this->sendResponse($book->toArray(), 'Book updated successfully.');
    }

    /**
     * Remove the specified Book from storage.
     * DELETE /books/{id}
     *
     * @param  Book  $book
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(Book $book)
    {
        //        if (! empty($book->items->toArray())) {
        //            throw new BadRequestHttpException('Book can not be delete, it is has one or more book items.');
        //        }
        $book->deleteImage();
        $book->delete();

        return $this->sendResponse($book, 'Book deleted successfully.');
    }

    /**
     * @param  Book  $book
     * @param  AddBookItemRequest  $request
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function addItems(Book $book, AddBookItemRequest $request)
    {

        $items = $request->all();
        $book = $this->bookRepository->addBookItems($book, $items['items']);

        return $this->sendResponse($book->toArray(), 'Book items added successfully.');
    }

    /**
     * @param  Book  $book
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function addItem(Book $book, Request $request)
    {
        $items = $request->all();
        $book = $this->bookRepository->addItem($book, $items);

        return $this->sendResponse($book->toArray(), 'Book items added successfully.');
    }

    /**
     * @param  Book  $book
     *
     * @return JsonResponse
     */
    public function removeImage(Book $book)
    {
        $book->deleteImage();

        return $this->sendSuccess('Book image removed successfully.');
    }

    /**
     * @param  BookDetailsRequest  $request
     *
     * @throws ApiOperationFailedException
     *
     * @return JsonResponse
     */
    public function getBookDetails(BookDetailsRequest $request)
    {
        $bookDetails = $this->bookRepository->getBookDetailsFromISBN($request->get('isbn'));

        return Response::json($bookDetails, 200);
    }

    /**
     * @return JsonResponse
     */
    public function exportBooks()
    {
        $filename = 'exports/Books-' . time() . '.xlsx';
        Excel::store(new BookExport, $filename, config('filesystems.default'));
        $path = Storage::disk(config('filesystems.default'))->url($filename);

        return $this->sendResponse($path, 'Book details exported successfully.');
    }

    /**
     * @param  BookImportRequest  $request
     *
     * @return JsonResponse
     */
    public function importBooks(BookImportRequest $request)
    {
        $this->bookRepository->importBooks($request->all());

        return $this->sendSuccess('Books imported successfully.');
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function getEBooks(Request $request)
    {
        $input = $request->except(['skip', 'limit']);
        $input['is_ebooks'] = true;
        $books = $this->bookRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        $input['withCount'] = 1;

        return $this->sendResponse(
            $books->toArray(),
            'Books retrieved successfully.',
            ['totalRecords' => $this->bookRepository->all($input)]
        );
    }

    /**
     * @param  Book  $book
     *
     * @return JsonResponse
     */
    public function updateBookFlag(Book $book)
    {
        $book->show_on_landing_page = ($book->show_on_landing_page) ? 0 : 1;
        $book->save();

        return $this->sendResponse($book->toArray(), 'Book updated successfully.');
    }
}

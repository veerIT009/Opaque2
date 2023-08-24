<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Models\Book;
use App\Models\Book2;
use App\Models\Book3;
use App\Repositories\Contracts\BookRepositoryInterface;
use App\Repositories\Contracts\BookRepositoryInterface2;
use App\Repositories\Contracts\BookRepositoryInterface3;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class BookController
 */
class BookAPIController extends AppBaseController
{
    /** @var BookRepositoryInterface */
    private $bookRepository;
    private $bookRepository2;
    private $bookRepository3;

    public function __construct(BookRepositoryInterface $bookRepo, BookRepositoryInterface2 $bookRepo2, BookRepositoryInterface3 $bookRepo3)
    {
        $this->bookRepository = $bookRepo;
        $this->bookRepository2 = $bookRepo2;
        $this->bookRepository3 = $bookRepo3;
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

        $books = $this->bookRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );
        $books2 = $this->bookRepository2->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );
        $books3 = $this->bookRepository3->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );



        $books = array_merge($books->toArray(), $books2->toArray(), $books3->toArray());
        /*  $books3 = $this->bookRepository3->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        ); */
        // $books = $this->bookRepository->all();

        return $this->sendResponse($books, 'Books retrieved successfully.');
    }
}

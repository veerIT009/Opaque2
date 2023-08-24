<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Models\BookItem;
use App\Models\BookItem2;
use App\Models\BookItem3;
use App\Repositories\Contracts\BookItemRepositoryInterface;
use App\Repositories\Contracts\BookItemRepositoryInterface2;
use App\Repositories\Contracts\BookItemRepositoryInterface3;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class BookItemAPIController
 */
class BookItemAPIController extends AppBaseController
{
    /** @var BookItemRepositoryInterface */
    private $bookItemRepo;
    private $bookItemRepo2;
    private $bookItemRepo3;

    public function __construct(BookItemRepositoryInterface $bookItemRepo,BookItemRepositoryInterface2 $bookItemRepo2,BookItemRepositoryInterface3 $bookItemRepo3)
    {
        $this->bookItemRepo = $bookItemRepo;
        $this->bookItemRepo2 = $bookItemRepo2;
        $this->bookItemRepo3 = $bookItemRepo3;
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function searchBooks(Request $request)
    {

        $input = $request->except(['limit', 'skip']);

        $input['withCount'] = 1;

        $library_id = $request->library_id;

        if($library_id == 222)
        {
            $records = $this->bookItemRepo2->searchBooks(
                $input,
                $request->get('skip', null),
                $request->get('limit', null)
            );

            $records = $records->map(function (BookItem2 $bookItem) {
                return $bookItem->apiObj();
            });

        }else if($library_id == 333)
        {
            $records = $this->bookItemRepo3->searchBooks(
                $input,
                $request->get('skip', null),
                $request->get('limit', null)
            );

            $records = $records->map(function (BookItem3 $bookItem) {
                return $bookItem->apiObj();
            });
        }else{
            $records = $this->bookItemRepo->searchBooks(
                $input,
                $request->get('skip', null),
                $request->get('limit', null)
            );

            $records = $records->map(function (BookItem $bookItem) {
                return $bookItem->apiObj();
            });
        }


        return $this->sendResponse($records, 'BookItem retrieved successfully.');
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function getEBooks(Request $request)
    {
        $input = $request->except(['limit', 'skip']);

        $records = $this->bookItemRepo->searchEBooks(
            $input,
            $request->get('skip', null),
            $request->get('limit', null)
        );

        $input['withCount'] = 1;
        $records = $records->map(function (BookItem $bookItem) {
            return $bookItem->apiEBookResponse();
        });

        return $this->sendResponse(
            $records,
            'BookItem retrieved successfully.',
            ['totalRecords' => $this->bookItemRepo->searchEBooks($input)]
        );
    }
}

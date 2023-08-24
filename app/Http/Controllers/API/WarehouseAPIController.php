<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\CreateWarehouseRequest;
use App\Http\Requests\UpdateWarehouseRequest;
use App\Http\Resources\WarehouseCollection;
use App\Http\Resources\WarehouseResource;
use App\Models\ManageStock;
use App\Models\Purchase;
use App\Models\PurchaseReturn;
use App\Models\QuotationToPurchases;
use App\Models\Sale;
use App\Models\SaleReturn;
use App\Models\Warehouse;
use App\Repositories\WarehouseRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Prettus\Validator\Exceptions\ValidatorException;

/**
 * Class WarehouseAPIController
 */
class WarehouseAPIController extends AppBaseController
{
    /**
     * @var WarehouseRepository
     */
    private $warehouseRepository;

    public function __construct(WarehouseRepository $warehouseRepository)
    {
        $this->warehouseRepository = $warehouseRepository;
    }

    /**
     * @param Request $request
     *
     *
     * @return WarehouseCollection
     */
    public function index(Request $request)
    {
        $perPage = getPageSize($request);
        $search = $request->filter['search'] ?? '';
        $warehouses = Warehouse::where('name', 'LIKE', "%$search%")->where('country', 'LIKE', "%$search%")->paginate($perPage);
        WarehouseResource::usingWithCollection();

        return new WarehouseCollection($warehouses);
    }

    /**
     * @param CreateWarehouseRequest $request
     *
     * @throws ValidatorException
     *
     * @return WarehouseResource
     */
    public function store(CreateWarehouseRequest $request)
    {
        $input = $request->all();
        $warehouse = $this->warehouseRepository->create($input);

        return new WarehouseResource($warehouse);
    }

    public function warehouseDetails($id)
    {
        $warehouses = ManageStock::where('warehouse_id', $id)->with('product')->get();

        $products = [];

        foreach ($warehouses as $warehouse) {
            $products[] = $warehouse->prepareWarehouseAttributes();
        }

        return $this->sendResponse($products, "Products Retrived Successfully");
    }

    /**
     * @param $id
     *
     * @return WarehouseResource
     */
    public function show($id)
    {
        $warehouse = $this->warehouseRepository->find($id);

        return new WarehouseResource($warehouse);
    }

    /**
     * @param UpdateWarehouseRequest $request
     * @param $id
     *
     * @throws ValidatorException
     *
     * @return WarehouseResource
     */
    public function update(UpdateWarehouseRequest $request, $id)
    {
        $input = $request->all();
        $warehouse = $this->warehouseRepository->update($input, $id);

        return new WarehouseResource($warehouse);
    }

    /**
     * @param $id
     *
     * @return JsonResponse
     */
    public function destroy($id)
    {
        if (getSettingValue('default_warehouse') == $id) {

            return $this->SendError('Default warehouse can\'t be deleted');
        }

        $useWarehouse = $this->warehouseRepository->warehouseCanDelete($id);
        if ($useWarehouse) {
            return $this->sendError('Warehouse can\'t be deleted.');
        }
        $this->warehouseRepository->delete($id);

        return $this->sendSuccess('Warehouse deleted successfully');
    }

    public function warehouseReport(Request $request)
    {

        $report = [];
        if ($request->get('warehouse_id') && !empty($request->get('warehouse_id')) && $request->get('warehouse_id') != "null") {
            $report['sale_count'] = Sale::whereWarehouseId($request->get('warehouse_id'))->count();
            $report['purchase_count'] = QuotationToPurchases::whereWarehouseId($request->get('warehouse_id'))->count();
            $report['sale_return_count'] = SaleReturn::whereWarehouseId($request->get('warehouse_id'))->count();
            $report['purchase_return_count'] = PurchaseReturn::whereWarehouseId($request->get('warehouse_id'))->count();
        } else {
            $report['sale_count'] = Sale::count();
            $report['purchase_count'] = QuotationToPurchases::count();
            $report['sale_return_count'] = SaleReturn::count();
            $report['purchase_return_count'] = PurchaseReturn::count();
        }

        return $this->sendResponse($report, "");
    }
}

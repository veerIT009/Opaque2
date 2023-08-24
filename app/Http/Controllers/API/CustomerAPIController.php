<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\CreateCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Http\Resources\CustomerCollection;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use App\Repositories\CustomerRepository;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Sale;
use App\Models\SalesPayment;
use Illuminate\Support\Facades\Storage;
use Prettus\Validator\Exceptions\ValidatorException;

/**
 * Class CustomerAPIController
 */
class CustomerAPIController extends AppBaseController
{
    /** @var CustomerRepository */
    private $customerRepository;

    public function __construct(CustomerRepository $customerRepository)
    {
        $this->customerRepository = $customerRepository;
    }

    /**
     * @param Request $request
     *
     *
     * @return CustomerCollection
     */
    public function index(Request $request)
    {
        $input = $request->except(['skip', 'limit']);
        $customers = $this->customerRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        // $perPage = getPageSize($request);
        // $search = $request->filter['search'] ?? '';
        // $customers = Customer::where('name', 'LIKE', "%$search%")->where('email', 'LIKE', "%$search%")->paginate($perPage);

        CustomerResource::usingWithCollection();

        return new CustomerCollection($customers);
    }

    /**
     * @param CreateCustomerRequest $request
     * @throws ValidatorException
     *
     * @return CustomerResource
     */
    public function store(CreateCustomerRequest $request)
    {
        $input = $request->all();
        $customer = $this->customerRepository->create($input);

        return new CustomerResource($customer);
    }

    /**
     * @param $id
     * @return CustomerResource
     */
    public function show($id)
    {
        $customer = $this->customerRepository->find($id);

        return new CustomerResource($customer);
    }

    /**
     * @param UpdateCustomerRequest $request
     * @param $id
     *
     * @throws ValidatorException
     *
     * @return CustomerResource
     */
    public function update(UpdateCustomerRequest $request, $id)
    {
        $input = $request->all();
        $customer = $this->customerRepository->update($input, $id);

        return new CustomerResource($customer);
    }

    /**
     * @param $id
     *
     * @return JsonResponse
     */
    public function destroy($id)
    {
        if (getSettingValue('default_customer') == $id) {

            return $this->SendError('Default customer can\'t be deleted');
        }
        $this->customerRepository->delete($id);

        return $this->sendSuccess('Customer deleted successfully');
    }

    public function bestCustomersPdfDownload(): JsonResponse
    {
        $month = Carbon::now()->month;
        $topCustomers = Customer::leftJoin('sales', 'customers.id', '=', 'sales.customer_id')
            ->whereMonth('date', $month)
            ->select('customers.*', DB::raw('sum(sales.grand_total) as grand_total'))
            ->groupBy('customers.id')
            ->orderBy('grand_total', 'desc')
            ->latest()
            ->take(5)
            ->withCount('sales')
            ->get();

        $data = [];

        if (Storage::exists('pdf/best-customers.pdf')) {
            Storage::delete('pdf/best-customers.pdf');
        }

        $companyLogo = getLogoUrl();
        $pdf = PDF::loadView('pdf.best-customers-pdf', compact('topCustomers', 'companyLogo'))->setOptions([
            'tempDir' => public_path(),
            'chroot'  => public_path(),
        ]);
        Storage::disk(config('app.media_disc'))->put('pdf/best-customers.pdf', $pdf->output());
        $data['best_customers_pdf_url'] = Storage::url('pdf/best-customers.pdf');

        return $this->sendResponse($data, "pdf retrieved Successfully");
    }
    /**
     * @param Customer $customer
     *
     *
     * @return JsonResponse
     */
    public function pdfDownload(Customer $customer): JsonResponse
    {
        $customer = $customer->load('sales.payments');

        $salesData = [];

        $salesData['totalSale'] = $customer->sales->count();

        $salesData['totalAmount'] = $customer->sales->sum('grand_total');

        $salesData['totalPaid'] = 0;

        foreach ($customer->sales as $sale) {
            $salesData['totalPaid'] = $salesData['totalPaid'] + $sale->payments->sum('amount');
        }

        $salesData['totalSalesDue'] = $salesData['totalAmount'] - $salesData['totalPaid'];

        $data = [];

        if (Storage::exists('pdf/customers-report-' . $customer->id . '.pdf')) {
            Storage::delete('pdf/customers-report-' . $customer->id . '.pdf');
        }

        $companyLogo = getLogoUrl();
        $pdf = PDF::loadView('pdf.customers-report-pdf', compact('customer', 'companyLogo', 'salesData'))->setOptions([
            'tempDir' => public_path(),
            'chroot'  => public_path(),
        ]);
        Storage::disk(config('app.media_disc'))->put('pdf/customers-report-' . $customer->id . '.pdf', $pdf->output());
        $data['customers_report_pdf_url'] = Storage::url('pdf/customers-report-' . $customer->id . '.pdf');

        return $this->sendResponse($data, "pdf retrieved Successfully");
    }

    /**
     * @param Customer $customer
     *
     *
     * @return JsonResponse
     */
    public function customerSalesPdfDownload(Customer $customer): JsonResponse
    {
        $customer = $customer->load('sales.payments');

        $data = [];

        if (Storage::exists('pdf/customer-sales-' . $customer->id . '.pdf')) {
            Storage::delete('pdf/customer-sales-' . $customer->id . '.pdf');
        }

        $companyLogo = getLogoUrl();
        $pdf = PDF::loadView('pdf.customer-sales-pdf', compact('customer', 'companyLogo'))->setOptions([
            'tempDir' => public_path(),
            'chroot'  => public_path(),
        ]);
        Storage::disk(config('app.media_disc'))->put('pdf/customer-sales-' . $customer->id . '.pdf', $pdf->output());
        $data['customers_sales_pdf_url'] = Storage::url('pdf/customer-sales-' . $customer->id . '.pdf');

        return $this->sendResponse($data, "pdf retrieved Successfully");
    }

    /**
     * @param Customer $customer
     *
     *
     * @return JsonResponse
     */
    public function customerQuotationsPdfDownload(Customer $customer): JsonResponse
    {
        $customer = $customer->load('quotations');

        $data = [];

        if (Storage::exists('pdf/customer-quotations-' . $customer->id . '.pdf')) {
            Storage::delete('pdf/customer-quotations-' . $customer->id . '.pdf');
        }

        $companyLogo = getLogoUrl();
        $pdf = PDF::loadView('pdf.customer-quotations-pdf', compact('customer', 'companyLogo'))->setOptions([
            'tempDir' => public_path(),
            'chroot'  => public_path(),
        ]);
        Storage::disk(config('app.media_disc'))->put('pdf/customer-quotations-' . $customer->id . '.pdf', $pdf->output());
        $data['customers_quotations_pdf_url'] = Storage::url('pdf/customer-quotations-' . $customer->id . '.pdf');

        return $this->sendResponse($data, "pdf retrieved Successfully");
    }

    /**
     * @param Customer $customer
     *
     *
     * @return JsonResponse
     */
    public function customerReturnsPdfDownload(Customer $customer): JsonResponse
    {
        $customer = $customer->load('salesReturns');

        $data = [];

        if (Storage::exists('pdf/customer-returns-' . $customer->id . '.pdf')) {
            Storage::delete('pdf/customer-returns-' . $customer->id . '.pdf');
        }

        $companyLogo = getLogoUrl();
        $pdf = PDF::loadView('pdf.customer-returns-pdf', compact('customer', 'companyLogo'))->setOptions([
            'tempDir' => public_path(),
            'chroot'  => public_path(),
        ]);
        Storage::disk(config('app.media_disc'))->put('pdf/customer-returns-' . $customer->id . '.pdf', $pdf->output());
        $data['customers_returns_pdf_url'] = Storage::url('pdf/customer-returns-' . $customer->id . '.pdf');

        return $this->sendResponse($data, "pdf retrieved Successfully");
    }

    /**
     * @param $id
     *
     *
     * @return JsonResponse
     */
    public function customerPaymentsPdfDownload($id): JsonResponse
    {
        $saleIds = [];

        $sales = Sale::whereCustomerId($id)->get();

        foreach ($sales as $sale) {
            $saleIds[] = $sale->id;
        }

        $payments = SalesPayment::whereIn('sale_id', $saleIds)->with('sale')->get();

        $data = [];

        if (Storage::exists('pdf/customer-payments-' . $id . '.pdf')) {
            Storage::delete('pdf/customer-payments-' . $id . '.pdf');
        }

        $companyLogo = getLogoUrl();
        $pdf = PDF::loadView('pdf.customer-payments-pdf', compact('payments', 'companyLogo'))->setOptions([
            'tempDir' => public_path(),
            'chroot'  => public_path(),
        ]);
        Storage::disk(config('app.media_disc'))->put('pdf/customer-payments-' . $id . '.pdf', $pdf->output());
        $data['customers_payments_pdf_url'] = Storage::url('pdf/customer-payments-' . $id . '.pdf');

        return $this->sendResponse($data, "pdf retrieved Successfully");
    }
}

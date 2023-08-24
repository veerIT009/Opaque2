<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Http\Resources\SettingResource;
use App\Models\Country;
use App\Models\Currency;
use App\Models\Customer;
use App\Models\Setting;
use App\Models\State;
use App\Models\Warehouse;
use App\Repositories\SettingRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

/**
 * Class SettingAPIController
 */
class SettingAPIController extends AppBaseController
{
    /** @var  SettingRepository */
    private $settingRepository;

    public function __construct(SettingRepository $productRepository)
    {
        $this->settingRepository = $productRepository;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $settings = Setting::all()->pluck('value', 'key')->toArray();
        $settings['logo'] = getLogoUrl();
        $settings['warehouse_name'] = Warehouse::whereId($settings['default_warehouse'])->first()->name ?? '';
        $settings['customer_name'] = Customer::whereId($settings['default_customer'])->first()->name ?? '';
        $settings['currency_symbol'] = Currency::whereId($settings['currency'])->first()->symbol ?? '';
        $settings['countries'] = Country::all();

        return $this->sendResponse(
            new SettingResource(['type' => 'settings', 'attributes' => $settings]),
            "Setting data retrieved successfully."
        );
    }

    /**
     * @param Request $request
     *
     *
     * @return JsonResponse
     */
    public function update(Request $request)
    {
        $input = $request->all();
        $settings = $this->settingRepository->updateSettings($input);

        return $this->sendResponse(
            new SettingResource(['type' => 'settings', 'attributes' => $settings]),
            "Setting data updated successfully"
        );
    }

    /**
     *
     * @return JsonResponse
     */
    public function clearCache()
    {
        Artisan::call('cache:clear');

        return $this->sendSuccess("Cache cleared Successfully");
    }

    /**
     *
     * @return JsonResponse
     */
    public function getFrontSettingsValue(): JsonResponse
    {
        $keyName = [
            'currency', 'email', 'company_name', 'phone', 'developed', 'footer', 'default_language', 'default_customer',
            'default_warehouse', 'address',
        ];
        $settings = Setting::whereIn('key', $keyName)->pluck('value', 'key')->toArray();
        $settings['logo'] = getLogoUrl();
        $settings['warehouse_name'] = Warehouse::whereId($settings['default_warehouse'])->first()->name ?? '';
        $settings['customer_name'] = Customer::whereId($settings['default_customer'])->first()->name ?? '';
        $settings['currency_symbol'] = Currency::where('code', $settings['currency'])->value('symbol') ?? '';

        return $this->sendResponse(
            new SettingResource(['type' => 'settings', 'value' => $settings]),
            "Setting value retrieved successfully."
        );
    }

    /**
     * @param $countryId
     *
     *
     * @return JsonResponse
     */
    public function getStates($countryId)
    {
        $states = State::whereCountryId($countryId)->pluck('name');

        return $this->sendResponse(
            new SettingResource(['type' => 'states', 'value' => $states]),
            "States retrieved successfully."
        );
    }

    public function getMailSettings()
    {
        $envData = $this->settingRepository->getEnvData();

        return $this->sendResponse($envData, 'Mail Credential Retrieved Successfully');
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function updateMailSettings(Request $request): JsonResponse
    {
        $request->validate([
            'mail_mailer', 'mail_host', 'mail_port', 'mail_username', 'mail_password', 'mail_from_address', 'mail_encryption'
        ]);
        $this->settingRepository->updateMailEnvSetting($request->all());

        Artisan::call('optimize:clear');
        Artisan::call('config:cache');

        return $this->sendSuccess('Mail Settings Save Successfully');
    }
}

<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
use App\Mail\TestEmail;
use Illuminate\Support\Facades\Mail;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/app', function () {
    return view('Simple');
});

Route::get('/', function () {
    return view('welcome');
});




Route::get('/clear-cache', function () {

    Artisan::call('cache:clear');

    Artisan::call('route:clear');


    Artisan::call('view:clear');

    return "Cache is cleared.";
});

Route::get('/call-migrate', function () {

    Artisan::call('migrate');

    return "Migration ran successfully...";
});


Route::get('send-email', function(){
    $mailData = [
        "name" => "Test NAME",
        "dob" => "12/12/1990"
    ];

    Mail::to("prashant@veerit.com")->send(new TestEmail($mailData));

    dd("Mail Sent Successfully!");

});

include "upgrade.php";

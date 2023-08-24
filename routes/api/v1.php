<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\GenreAPIController;
use App\Http\Controllers\API\V1\BookAPIController;
use App\Http\Controllers\EbookSubscribeController;
use App\Http\Controllers\frontendContactController;
use App\Http\Controllers\API\V1\AuthorAPIController;
use App\Http\Controllers\API\V1\MemberAPIController;
use App\Http\Controllers\API\V1\StripeApiController;
use App\Http\Controllers\API\V1\CountryAPIController;
use App\Http\Controllers\API\V1\MemberAuthController;
use App\Http\Controllers\API\V1\SettingAPIController;
use App\Http\Controllers\API\V1\BookItemAPIController;
use App\Http\Controllers\API\B1\PublisherAPIController;
use App\Http\Controllers\API\V1\IssuedBookAPIController;
use App\Http\Controllers\API\V1\BookRequestAPIController;
use App\Http\Controllers\API\V1\TransactionAPIController;
use App\Http\Controllers\API\B1\SubscriptionAPIController;
use App\Http\Controllers\API\V1\MemberSettingAPIController;
use App\Http\Controllers\API\V1\MembershipPlanAPIController;
use App\Http\Controllers\EbookLimitController;

/**
 * Member Auth Middleware
 */


Route::resource('/v1/publishers', PublisherAPIController::class);
Route::get('/v1/books/{id?}', [BookAPIController::class, 'index'])->name('books.index');
Route::get('/v1/authors', [AuthorAPIController::class, 'index'])->name('authors.index');

Route::get('v1/search-books', [BookItemAPIController::class, 'searchBooks'])->name('search-books.index');

Route::get('v1/subscription-limit', [EbookLimitController::class, 'getSubscriptionLimit']);

Route::middleware(['auth:sanctum', 'member.auth', 'subscription'])->group(function () {
    // Reserve Book
    Route::any('v1/books/{book_item}/reserve-book', [IssuedBookAPIController::class, 'reserveBook'])
        ->name('reserve-book');


    // Un-Reserve Book
    Route::post('v1/books/{book_item}/un-reserve-book', [IssuedBookAPIController::class, 'unReserveBook'])
        ->name('un-reserve-book');

    // books history
    Route::get('v1/books-history', [IssuedBookAPIController::class, 'booksHistory'])->name('books-history.index');

    // get logged in member details
    Route::get('v1/member-details', [MemberAPIController::class, 'getLoggedInMemberDetails'])->name('member-details');

    // get all books

    // Book search

    // update logged in member profile
    Route::post('v1/update-member-profile', [MemberAPIController::class, 'updateMemberProfile'])
        ->name('update-member-profile');

    // delete login member image
    Route::post('v1/remove-image', [MemberAPIController::class, 'removeImage'])->name('remove-image');

    Route::get('v1/countries', [CountryAPIController::class, 'index'])->name('countries.index');


    /** Book Requests */
    Route::resource('v1/book-requests', BookRequestAPIController::class);

    Route::put('v1/change-password', [MemberAPIController::class, 'changePassword']);

    /** My Settings */
    Route::get('/v1/my-settings', [MemberSettingAPIController::class, 'index']);
    Route::post('/v1/update-settings', [MemberSettingAPIController::class, 'update']);
    // get e-books
    Route::get('/v1/e-books', [BookItemAPIController::class, 'getEBooks'])->name('e-books');


    Route::get('/v1/get-member-transactions', [TransactionAPIController::class, 'index']);
    Route::get('/v1/membership-details', [MembershipPlanAPIController::class, 'details']);
});
Route::get('/v1/e-books', [BookItemAPIController::class, 'getEBooks'])->name('e-books');
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/v1/membership-details', [MembershipPlanAPIController::class, 'details']);
});


Route::post('/v1/create-offline-subscription/{id}', [SubscriptionAPIController::class, 'CreateOfflineSubscription']);


Route::middleware(['auth:sanctum', 'member.auth'])->group(function () {
    Route::post('/v1/create-membership-payment-session/{id}', [StripeApiController::class, 'RazorPay']);
    Route::post('/v1/ebook-subscription', [EbookSubscribeController::class, "subscribe"]);
    Route::post('/v1/register-member-to-library/{library_id}', [MemberAuthController::class, 'registerMemberToLibrary']);
});

Route::get('/v1/is-member-registered/{id}', [MemberAuthController::class, 'isMember'])->name('is-member');

Route::get('/v1/ebook-subscription', [EbookSubscribeController::class, "index"]);

Route::get('/v1/membership-plans', [MembershipPlanAPIController::class, 'index'])->name('membership-plans.index');



Route::post('/v1/register-member', [MemberAuthController::class, 'register'])->name('register-member');
Route::get('/v1/activate-member', [MemberAuthController::class, 'verifyAccount'])->name('activate-member');



/** Password Reset API's For Member */
Route::post('/v1/send-reset-member-password-link', [MemberAuthController::class, 'sendResetPasswordLink']);
Route::post('/v1/reset-member-password', [MemberAuthController::class, 'resetPassword'])
    ->name('reset-member-password.index');

Route::get('/v1/settings', [SettingAPIController::class, 'index'])->name('settings.index');
Route::get('/v1/all-settings', [\App\Http\Controllers\API\B1\SettingAPIElibraryController::class, 'index']);
Route::resource('/v1/genres', GenreAPIController::class);
Route::resource('/v1/contact', frontendContactController::class);

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/donations/{userEmail}', 'App\Http\Controllers\ControllerD@getDonationsFromUser');
Route::post('/donations/save', 'App\Http\Controllers\ControllerD@saveDonation');
// Route::apiResource('/olla', App\Http\Controllers\ControllerO::class);
// Route::apiResource('/user', App\Http\Controllers\ControllerU::class);
// Route::apiResource('/donation', App\Http\Controllers\ControllerD::class);
// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

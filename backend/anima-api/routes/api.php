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
Route::get('/activate/{userEmail}/{token}', 'App\Http\Controllers\ControllerU@accountActivation');
Route::get('/ollas', 'App\Http\Controllers\ControllerO@getAll');
Route::post('/register', 'App\Http\Controllers\ControllerU@tempRegister');
Route::post('/login', 'App\Http\Controllers\ControllerU@tempLogin');
Route::get('/donations/{userEmail}', 'App\Http\Controllers\ControllerD@getDonationsFromUser');
Route::post('/donations/save', 'App\Http\Controllers\ControllerD@saveDonation');
// Route::apiResource('/olla', App\Http\Controllers\ControllerO::class);
// Route::apiResource('/user', App\Http\Controllers\ControllerU::class);
// Route::apiResource('/donation', App\Http\Controllers\ControllerD::class);
// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

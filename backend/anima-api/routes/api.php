<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ServiceHandler;


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
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');;
Route::post('/activate', [AuthController::class, 'accountActivation']);
Route::post('/pots/save', [ServiceHandler::class, 'createPot'])->middleware('auth:sanctum');;
Route::get('/pots', [ServiceHandler::class, 'getAllPots'])->middleware('auth:sanctum');;
Route::get('/pots/{offset}/{limit}', [ServiceHandler::class, 'getPotsPager'])->middleware('auth:sanctum');;
Route::get('/donations', [ServiceHandler::class, 'getDonationsFromUser'])->middleware('auth:sanctum');;
Route::post('/donations/save', [ServiceHandler::class, 'createDonation'])->middleware('auth:sanctum');;

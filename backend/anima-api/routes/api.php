<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ControllerU;
use App\Http\Controllers\ServiceHandler;
use App\Http\Controllers\ControllerD;

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
Route::post('/activate', [ControllerU::class, 'accountActivationHandler']);
Route::post('/pots/save', [ServiceHandler::class, 'createPot'])->middleware('auth:sanctum');;
Route::get('/pots', [ServiceHandler::class, 'getAllPots'])->middleware('auth:sanctum');;
Route::get('/donations/{userEmail}', [ServiceHandler::class, 'getDonationsFromUser'])->middleware('auth:sanctum');;
Route::post('/donations/save', [ServiceHandler::class, 'createDonation'])->middleware('auth:sanctum');;

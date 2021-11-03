<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DonationHandler;
use App\Http\Controllers\CommentHandler;
use App\Http\Controllers\PotHandler;
use App\Http\Controllers\PagerHandler;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//Comments
Route::post('/comment/save', [CommentHandler::class, 'createComment'])->middleware('auth:sanctum');;
Route::get('/comments/pots/{potID}', [CommentHandler::class, 'getCommentsFromPot']);;
Route::get('/comments/user', [CommentHandler::class, 'getCommentsFromUser'])->middleware('auth:sanctum');;
//User account
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');;
Route::post('/activate', [AuthController::class, 'accountActivation']);
//Pots
Route::post('/pots/update/{potID}', [PotHandler::class, 'updatePot'])->middleware('auth:sanctum');;
Route::post('/pots/save', [PotHandler::class, 'createPot'])->middleware('auth:sanctum');;
Route::get('/pots', [PotHandler::class, 'getAllPots']);;
Route::get('/pots/user', [PotHandler::class, 'getAllPotsFromUser'])->middleware('auth:sanctum');;
Route::get('/pots/{id}', [PotHandler::class, 'getPotById']);;
//Donations
Route::get('/donations', [DonationHandler::class, 'getDonationsFromUser'])->middleware('auth:sanctum');;
Route::post('/donations/save', [DonationHandler::class, 'createDonation'])->middleware('auth:sanctum');;
//Pagers
Route::get('/{contentType}/{offset}/{limit}', [PagerHandler::class, 'pagerWithoutAuth']);;
Route::get('auth/{contentType}/{offset}/{limit}', [PagerHandler::class, 'pagerWithAuth'])->middleware('auth:sanctum');;

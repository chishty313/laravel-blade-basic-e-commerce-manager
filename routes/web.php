<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;

// Frontend Route
Route::get('/', function () {
    return view('dashboard');
});

// API Routes
Route::prefix('api')->group(function () {
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('products', ProductController::class);
});

// Legacy API routes (for our JS to work)
Route::apiResource('categories', CategoryController::class);
Route::apiResource('products', ProductController::class);
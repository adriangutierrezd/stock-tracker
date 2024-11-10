<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TradeController;
use App\Http\Controllers\WalletController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::get('/trades', [TradeController::class, 'index'])->name('trades.index');
    Route::get('/wallets', [WalletController::class, 'index'])->name('wallets.index');
    Route::post('/trades', [TradeController::class, 'store'])->name('trades.store');
    Route::get('/trades/create', [TradeController::class, 'create'])->name('trades.create');
    Route::get('/trades/{trade}', [TradeController::class, 'edit'])->name('trades.edit');


    Route::prefix('/api')->group(function(){

        Route::post('/tradesOverview', [DashboardController::class, 'getOverviewInfo'])->name('dashboard.overview-info');

        Route::get('/wallets', [WalletController::class, 'getWallets'])->name('wallets.get');
        Route::post('/wallet', [WalletController::class, 'store'])->name('wallet.store');
        Route::put('/wallet/{wallet}', [WalletController::class, 'update'])->name('wallet.update');
        Route::delete('/wallet/{wallet}', [WalletController::class, 'destroy'])->name('wallet.destroy');

        Route::post('/trades', [TradeController::class, 'getTrades'])->name('trades.get');
        Route::put('/trades/{trade}', [TradeController::class, 'update'])->name('trades.update');
        Route::delete('/trades/{trade}', [TradeController::class, 'destroy'])->name('trades.destroy');
    });


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

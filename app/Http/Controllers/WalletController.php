<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWalletRequest;
use App\Http\Requests\UpdateWalletRequest;
use App\Http\Resources\WalletCollection;
use App\Http\Resources\WalletResource;
use App\Models\Wallet;
use Error;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWalletRequest $request)
    {
        try{
            $wallet = Wallet::create([
                'user_id' => $request->user()->id,
                'name' => $request->name,
                'description' => $request->description,
                'icon' => $request->icon
            ]);

            return response()->json([
                'message' => 'Cartera creada con éxito',
                'data' => new WalletResource($wallet)
            ], 201);
        }catch(Error $e){
            return response()->json([
                'message' => 'Ha ocurrido un error inesperado'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Wallet $wallet)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Wallet $wallet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWalletRequest $request, Wallet $wallet)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Wallet $wallet)
    {
        //
    }


    public function getWallets(Request $request){
        try{

            $wallets = Wallet::where('user_id', $request->user()->id)->get();

            return response()->json([
                'message' => 'Carteras obtenidas con éxito',
                'data' => new WalletCollection($wallets)
            ], 200);
        }catch(Error $e){
            return response()->json([
                'message' => 'Ha ocurrido un error inesperado'
            ], 500);
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Constants;
use App\Http\Requests\StoreWalletRequest;
use App\Http\Requests\UpdateWalletRequest;
use App\Http\Resources\WalletCollection;
use App\Http\Resources\WalletResource;
use App\Models\Wallet;
use App\Policies\WalletPolicy;
use Error;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WalletController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Wallets/Page');
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
                'message' => Constants::HTTP_SERVER_ERROR_MSG
            ], Constants::HTTP_SERVER_ERROR_CODE);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWalletRequest $request, Wallet $wallet)
    {
        try{
       
            $wallet->name = $request->name;
            $wallet->description = $request->description;
            $wallet->icon = $request->icon;

            $wallet->update();

            return response()->json([
                'message' => 'Cartera actualizada con éxito',
                'data' => new WalletResource($wallet)
            ], Constants::HTTP_OK_CODE);
        }catch(Error $e){
            return response()->json([
                'message' => Constants::HTTP_SERVER_ERROR_MSG
            ], Constants::HTTP_SERVER_ERROR_CODE);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Wallet $wallet)
    {
        try{
            if($request->user()->cannot('delete', [$wallet, WalletPolicy::class])){
                return response()->json(['message' => Constants::HTTP_FORBIDDEN_MSG], Constants::HTTP_FORBIDDEN_CODE);
            }
    
            $wallet->delete();
            return $this->getWallets($request);
        }catch(Error $e){
            return response()->json([
                'message' => $e->getMessage()
            ], Constants::HTTP_SERVER_ERROR_CODE);
        }
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
                'message' => Constants::HTTP_SERVER_ERROR_MSG
            ], Constants::HTTP_SERVER_ERROR_CODE);
        }
    }
}

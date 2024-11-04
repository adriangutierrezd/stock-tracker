<?php

namespace App\Http\Controllers;

use App\Http\Requests\FetchTradesRequest;
use App\Http\Requests\StoreTradeRequest;
use App\Http\Requests\UpdateTradeRequest;
use App\Http\Resources\TradeCollection;
use App\Models\Trade;
use App\Policies\TradePolicy;
use Error;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TradeController extends Controller
{


    public function getTrades(FetchTradesRequest $request){
        try{

            $filters = [
                'wallet_id' => $request->walletId
            ];

            if($request->status){
                $filters['status'] = $request->status;
            }

            $trades = Trade::with('tradeLines')
            ->where($filters)
            ->orderBy('id', 'desc')
            ->get();
            return response()->json(new TradeCollection($trades), 200);

        }catch(Error){
            return response()->json(['message' => 'Ha ocurrido un error inesperado'], 500);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Trades/Page');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Trades/Form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTradeRequest $request)
    {
        dd('Correcta request');
    }

    /**
     * Display the specified resource.
     */
    public function show(Trade $trade)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Trade $trade)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTradeRequest $request, Trade $trade)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Trade $trade)
    {
        if($request->user()->cannot('delete', [$trade, TradePolicy::class])){
            return response()->json(['message' => 'Unauthorized'], 403);
        }


        if($trade->delete()){
            return response()->json(['message' => 'Trade eliminado con éxito'], 200);
        }

        return response()->json(['message' => 'Ha ocurrido un error inesperado'], 500);
    }
}

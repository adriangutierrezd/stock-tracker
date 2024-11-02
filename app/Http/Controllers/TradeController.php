<?php

namespace App\Http\Controllers;

use App\Http\Requests\FetchTradesRequest;
use App\Http\Requests\StoreTradeRequest;
use App\Http\Requests\UpdateTradeRequest;
use App\Models\Trade;
use Error;

class TradeController extends Controller
{


    public function getTrades(FetchTradesRequest $request){
        try{

            $trades = Trade::where([
                'wallet_id' => $request->walletId,
                'status' => 'COMPLETED'
            ])->orderBy('id', 'desc')
            ->limit(10)
            ->get();
            return response()->json($trades, 200);

        }catch(Error){
            //
        }
    }

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
    public function store(StoreTradeRequest $request)
    {
        //
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
    public function destroy(Trade $trade)
    {
        //
    }
}

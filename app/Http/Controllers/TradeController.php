<?php

namespace App\Http\Controllers;

use App\Http\Requests\FetchTradesRequest;
use App\Http\Requests\StoreTradeRequest;
use App\Http\Requests\UpdateTradeRequest;
use App\Http\Resources\TradeCollection;
use App\Models\Trade;
use App\Models\TradeLine;
use App\Policies\TradePolicy;
use Error;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        try{

            $totalCost = 0;
            $totalReward = 0;

            DB::beginTransaction();

            $trade = Trade::create([
                'wallet_id' => $request->walletId,
                'company' => $request->company,
                'strategy' => $request->strategy,
                'date' => $request->date,
                'week' => date('W', $request->week),
                'year' => date('Y', $request->year),
                'status' => $request->status,
                'time' => $request->time,
                'result' => 0,
                'comment' => $request->comment
            ]);

            if(!$trade){
                throw new Error('Error guardando trade');
            }

            foreach($request->tradeLines as $trLine){
                $totalCost += floatval($trLine['commission']);
                if($trLine['type'] == 'BUY'){
                    $totalCost += floatval($trLine['price']) * intval($trLine['shares']);
                }else{
                    $totalReward += floatval($trLine['price']) * intval($trLine['shares']);
                }


                $tradeLine = TradeLine::create([
                    'trade_id' => $trade->id,
                    'shares' => $trLine['shares'],
                    'price' => $trLine['price'],
                    'type' => $trLine['type'],
                    'commission' => $trLine['commission']
                ]);

                if(!$tradeLine){
                    throw new Error('Error guardando tradeLine');
                }
            }

            if($request->status == 'COMPLETED'){
                $trade->result = $totalReward - $totalCost;
                $trade->update();
            }

            DB::commit();

            return response()->json(['messgae' => 'Trade guardado con éxito'], 201);
        }catch(QueryException $qE){
            DB::rollBack();
            return response()->json(['messgae' => 'Ha ocurrido un error inesperado'], 500);
        }catch(Error){
            DB::rollBack();
            return response()->json(['messgae' => 'Ha ocurrido un error inesperado'], 500);
        }
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

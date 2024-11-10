<?php

namespace App\Http\Controllers;

use App\Constants;
use App\Http\Requests\FetchOverviewInfoRequest;
use App\Models\Trade;
use Carbon\Carbon;
use DateTime;
use Error;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    
    public function index(){

        $date = new DateTime();
        $initialDate = $date->modify('first day of this month')->format('Y-m-d');
        $endDate = $date->modify('last day of this month')->format('Y-m-d');

        return Inertia::render('Dashboard/Page', [
            'initialDate' => $initialDate,
            'endDate' => $endDate
        ]);
    }

    public function getOverviewInfo(FetchOverviewInfoRequest $request){
        try{
            $trades = Trade::select(DB::raw('date, SUM(result) as amount'))
            ->where('status', 'COMPLETED')
            ->where('wallet_id', $request->walletId)
            ->whereBetween('date', [$request->startDate, $request->endDate])
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

            Carbon::setLocale('es');
            $formattedData = array_map(function ($item) {
                $item['date'] = Carbon::parse($item['date'])->format('d M');
                return $item;
            }, $trades->toArray());

            return response()->json($formattedData);

        }catch(Error $e){
            return response()->json([], Constants::HTTP_SERVER_ERROR_CODE);
        }
    }

}

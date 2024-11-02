<?php

namespace App\Http\Controllers;

use DateTime;
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

}

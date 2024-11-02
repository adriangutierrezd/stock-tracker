<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TradeLine extends Model
{
    
    protected $fillable = [
        'trade_id',
        'shares',
        'amount',
        'type',
        'commission',
        'comment'
    ];

    public function trade(){
        return $this->belongsTo(Trade::class);
    }

}

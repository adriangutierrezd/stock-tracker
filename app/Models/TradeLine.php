<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TradeLine extends Model
{
    
    protected $fillable = [
        'trade_id',
        'shares',
        'price',
        'type',
        'commission'
    ];

    public function trade(){
        return $this->belongsTo(Trade::class);
    }

}

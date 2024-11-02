<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trade extends Model
{
    
    protected $fillable = [
        'wallet_id',
        'company',
        'strategy',
        'date',
        'week',
        'year',
        'status',
        'time',
        'result',
        'comment'
    ];

    public function wallet(){
        return $this->belongsTo(Wallet::class);
    }

    public function tradeLines(){
        return $this->hasMany(TradeLine::class);
    }

}

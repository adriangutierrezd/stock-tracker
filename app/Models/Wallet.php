<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    
    protected $fillable = [
        'name',
        'user_id',
        'description',
        'icon'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

}

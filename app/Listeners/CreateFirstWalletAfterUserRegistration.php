<?php

namespace App\Listeners;

use App\Models\Wallet;
use Illuminate\Auth\Events\Registered;

class CreateFirstWalletAfterUserRegistration
{

    /**
     * Handle the event.
     */
    public function handle(Registered $event): void
    {
        Wallet::create([
            'user_id' => $event->user->id,
            'name' => 'Cartera 1',
            'icon' => 'CARROT'
        ]);
    }
}

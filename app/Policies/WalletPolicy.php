<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Wallet;

class WalletPolicy
{
    
    /**
     * Determine whether the user can use the model.
     */
    public function use(User $user, Wallet $wallet): bool
    {
        return $this->walletBelongsToUser($user, $wallet);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Wallet $wallet): bool
    {
        return $this->walletBelongsToUser($user, $wallet);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Wallet $wallet): bool
    {
        return $this->walletBelongsToUser($user, $wallet);
    }

    private function walletBelongsToUser(User $user, Wallet $wallet){
        return $wallet->user->id == $user->id;
    }

}

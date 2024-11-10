<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Wallet;
use Illuminate\Auth\Access\Response;

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
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Wallet $wallet): bool
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Wallet $wallet): bool
    {
        return $this->walletBelongsToUser($user, $wallet);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Wallet $wallet): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Wallet $wallet): bool
    {
        //
    }


    private function walletBelongsToUser(User $user, Wallet $wallet){
        return $wallet->user->id == $user->id;
    }

}

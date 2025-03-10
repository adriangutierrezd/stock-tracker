<?php

namespace App\Policies;

use App\Models\Trade;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TradePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Trade $trade): bool
    {
        //
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
    public function update(User $user, Trade $trade): bool
    {
        return $this->tradeBelongsToUser($user, $trade);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Trade $trade): bool
    {
        return $this->tradeBelongsToUser($user, $trade);
    }

    private function tradeBelongsToUser(User $user, Trade $trade){
        return $trade->wallet->user->id == $user->id;
    }
}

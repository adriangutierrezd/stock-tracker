<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TradeLineResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'tradeId' => $this->trade_id,
            'shares' => $this->shares,
            'amount' => $this->amount,
            'type' => $this->type,
            'commission' => $this->commission,
            'comment' => $this->comment
        ];
    }
}

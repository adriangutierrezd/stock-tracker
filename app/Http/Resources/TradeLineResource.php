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
            'price' => $this->price,
            'type' => $this->type,
            'commission' => $this->commission
        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TradeResource extends JsonResource
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
            'walletId' => $this->wallet_id,
            'strategy' => $this->strategy,
            'company' => $this->company,
            'date' => $this->date,
            'week' => $this->week,
            'year' => $this->year,
            'status' => $this->status,
            'time' => $this->time,
            'result' => $this->result,
            'comment' => $this->comment,
            'tradeLines' => new TradeLineCollection($this->whenLoaded('tradeLines'))
        ];
    }
}

<?php

namespace App\Http\Requests;

use App\Models\Wallet;
use Illuminate\Foundation\Http\FormRequest;

class StoreTradeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $wallet = Wallet::find($this->walletId);
        return $this->user()->can('use', $wallet);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'company' => ['required', 'min:1', 'max:10'],
            'walletId' => ['required'],
            'strategy' => ['required', 'min:1', 'max:20'],
            'date' => ['required', 'date'],
            'time' => ['nullable', 'date_format:H:i'],
            'result' => ['nullable', 'numeric'],
            'comment' => ['nullable', 'string'],
            'tradeLines' => ['required', 'array']
        ];
    }

}

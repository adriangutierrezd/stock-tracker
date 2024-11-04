import React from "react";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

export type WalletIconType = 'GROWING' | 'DIVERSIFIED' | 'RISK' | 'CARROT' | 'JOYSTICK';

export interface Wallet {
    id: number
    name: string
    userId: number
    description: string
    icon: WalletIconType
}

export interface TradeLine {
    id: number
    tradeId: number
    shares: number
    price: number
    type: 'BUY' | 'SELL'
    commission: number
}

export interface Trade {
    id: number
    walletId: number
    strategy: string
    company: string
    date: Date
    week: number
    year: number
    status: 'DRAFT' | 'COMPLETED'
    time: string | null
    result: number | null
    comment: string | null,
    tradeLines: TradeLine[]
}

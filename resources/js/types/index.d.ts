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
    id: number;
    name: string;
    description: string;
    logo: WalletIconType
}

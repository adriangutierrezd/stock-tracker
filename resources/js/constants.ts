import { AudioWaveform, Carrot, ChartPie, Joystick, Shrub } from "lucide-react";
import { TradeStatuses, WalletIconType } from "./types";

export const WALLET_ICON_CONVERSION: Record<WalletIconType, React.FC<React.SVGProps<SVGSVGElement>>> = {
    'GROWING': Shrub,
    'DIVERSIFIED': ChartPie,
    'RISK': AudioWaveform,
    'CARROT': Carrot,
    'JOYSTICK': Joystick
};

export const TRADE_STATUS_CONVERSION: Record<TradeStatuses, string> = {
    'COMPLETED': 'Completado',
    'DRAFT': 'Borrador'
}
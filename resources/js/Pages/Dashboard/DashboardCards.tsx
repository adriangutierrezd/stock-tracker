import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import { formatNumber } from "@/lib/utils";
import { ChartCandlestick, Euro, Percent } from 'lucide-react';
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useActiveWalletStore } from "@/stores";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Skeleton } from "@/Components/ui/skeleton";

interface Props {
    readonly dateRange: DateRange
}

interface PeriodResult {
    readonly totalProfit: number;
    readonly accProfitability: number;
    readonly totalTrades: number;
}

export default function DashboardCards({ dateRange }: Props) {

    const { toast } = useToast()
    const [data, setData] = useState<PeriodResult>({ totalProfit: 0, totalTrades: 0, accProfitability: 0 })
    // @ts-ignore
    const { activeWallet } = useActiveWalletStore()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const loadInfo = async () => {
        try {
            setIsLoading(true)

            const response = await axios.post(route('dashboard.period-results'), {
                startDate: dateRange.from,
                endDate: dateRange.to ?? dateRange.from,
                walletId: activeWallet.id
            })

            setData(response.data)

        } catch (error) {
            toast({
                title: 'Error',
                description: 'Ha ocurrido un error inesperado',
                variant: 'destructive'
            })
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadInfo()
    }, [activeWallet, dateRange])


    return (
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 mt-4">
            {isLoading ? (
                <>
                    <Skeleton className="h-[130px]" />
                    <Skeleton className="h-[130px]" />
                    <Skeleton className="h-[130px]" />
                </>
            ) : (
                <>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Beneficio total
                            </CardTitle>
                            <Euro className='size-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatNumber(data.totalProfit)}$</div>
                            {/* <p className="text-xs text-muted-foreground">
                                {fakeData.totalRevenue.lastMonth > 0 ? '+' : ''}{formatNumber(data.totalProfit)}% desde el último mes
                            </p> */}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Rentabilidad acumulada
                            </CardTitle>
                            <Percent className='size-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatNumber(data.accProfitability)}%</div>
                            {/* <p className="text-xs text-muted-foreground">
                            {fakeData.profit.lastMonth > 0 ? '+' : ''}{formatNumber(fakeData.profit.lastMonth)}% desde el último mes
                            </p> */}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Operaciones
                            </CardTitle>
                            <ChartCandlestick className='size-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{data.totalTrades}</div>
                            {/* <p className="text-xs text-muted-foreground">
                            {fakeData.trades.lastMonth > 0 ? '+' : ''}{formatNumber(fakeData.trades.lastMonth)}% desde el último mes
                            </p> */}
                        </CardContent>
                    </Card>
                </>
            )}

        </div>
    )
}
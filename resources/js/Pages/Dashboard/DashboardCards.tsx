import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import { formatNumber } from "@/lib/utils";
import { ChartCandlestick, Euro, Percent } from 'lucide-react';
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Skeleton } from "@/Components/ui/skeleton"


const fakeData = {
    totalRevenue: {
        value: 20334.23,
        lastMonth: 20.1
    },
    profit: {
        value: 34.4,
        lastMonth: 2.1
    },
    trades: {
        value: 10,
        lastMonth: -2.05
    }
}

interface Props {
    readonly dateRange: DateRange
}

export default function DashboardCards({ dateRange }: Props){

    const [isLoading, setIsLoading] = useState<boolean>(true)

    setTimeout(() => {
        setIsLoading(false)
    }, 1500)

    return(
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 mt-4">
            {isLoading ? (
                <>
                    <Skeleton className="h-[130px]"  />
                    <Skeleton className="h-[130px]"  />
                    <Skeleton className="h-[130px]"  />
                </>
            ): (
                <>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Beneficio total
                            </CardTitle>
                            <Euro className='size-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatNumber(fakeData.totalRevenue.value)}€</div>
                            <p className="text-xs text-muted-foreground">
                                {fakeData.totalRevenue.lastMonth > 0 ? '+' : ''}{formatNumber(fakeData.totalRevenue.lastMonth)}% desde el último mes
                            </p>
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
                            <div className="text-2xl font-bold">{formatNumber(fakeData.profit.value)}%</div>
                            <p className="text-xs text-muted-foreground">
                            {fakeData.profit.lastMonth > 0 ? '+' : ''}{formatNumber(fakeData.profit.lastMonth)}% desde el último mes
                            </p>
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
                            <div className="text-2xl font-bold">{fakeData.trades.value}</div>
                            <p className="text-xs text-muted-foreground">
                            {fakeData.trades.lastMonth > 0 ? '+' : ''}{formatNumber(fakeData.trades.lastMonth)}% desde el último mes
                            </p>
                        </CardContent>
                    </Card>
                </>
            )}

    </div>
    )
}
import { cn, formatNumber } from "@/lib/utils"
import { useActiveWalletStore } from "@/stores"
import axios from "axios"
import { useEffect, useState } from "react"


const fakeData = [
    {
        id: 1,
        company: 'HCTI',
        date: '24 oct 2024',
        strategy: 'Apertura',
        success: true,
        result: 200.34
    },
    {
        id: 2,
        company: 'UAVS',
        date: '24 oct 2024',
        strategy: 'Apertura',
        success: false,
        result: -22.56
    },
    {
        id: 3,
        company: 'UAVS',
        date: '22 oct 2024',
        strategy: '5 minutos',
        success: true,
        result: 12.89
    },
    {
        id: 4,
        company: 'ABC',
        date: '21 oct 2024',
        strategy: 'Apertura',
        success: true,
        result: 32.00
    }
]

export default function RecentTrades() {

    const {activeWallet} = useActiveWalletStore()
    const [recentTrades, setRecentTrades] = useState<any[]>([])

    const fetchRecentTrades = async () => {
        const response = await axios.post(route('trades.get'), {
            walletId: activeWallet.id ?? 0
        })

        console.log(response)
    }

    useEffect(() => {
        fetchRecentTrades()
    }, [activeWallet])

    return (
        <>
            {fakeData.length == 0 ? (
                <div className="h-full w-full flex items-center justify-center">
                    Aún no has registrado ninguna operación.
                </div>
            ) : (
                <div className="space-y-4">
                    {fakeData.map((trade) => (
                        <div key={trade.id} className="flex items-center justify-between gap-4">

                            <div className="flex items-center justify-start gap-4">
                                <div className="text-sm w-[50px] h-[50px] p-2 bg-secondary rounded flex items-center justify-center">
                                    {trade.company}
                                </div>

                                <div className="flex flex-col">
                                    <span>{trade.date}</span>
                                    <span className="text-sm">{trade.strategy}</span>
                                </div>
                            </div>

                            <span className={cn(
                                'rounded-full p-2',
                                trade.success ? 'text-emerald-500 bg-emerald-100/60 dark:text-emerald-800 dark:bg-emerald-300' : 'text-red-500 bg-red-100/60 dark:text-red-800 dark:bg-red-300',

                            )}>
                                {formatNumber(trade.result)}€
                            </span>

                            
                            {/* <div className="flex text-sm p-2 aspect-square size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                {trade.company}
                            </div> */}
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}
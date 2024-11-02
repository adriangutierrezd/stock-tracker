import { Button } from "@/Components/ui/button"
import { cn, formatNumber } from "@/lib/utils"
import { useActiveWalletStore } from "@/stores"
import { Trade } from "@/types"
import axios from "axios"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { format } from 'date-fns';
import { es } from 'date-fns/locale';


export default function RecentTrades() {

    const {activeWallet} = useActiveWalletStore()
    const [recentTrades, setRecentTrades] = useState<Trade[]>([])

    const fetchRecentTrades = async () => {
        const response = await axios.post(route('trades.get'), {
            walletId: activeWallet.id ?? 0
        })

        setRecentTrades(response.data)
    }

    useEffect(() => {
        fetchRecentTrades()
    }, [activeWallet])

    return (
        <>
            {recentTrades.length == 0 ? (
                <div className="h-full w-full flex flex-col gap-4 items-center justify-center">
                    <p>Aún no has registrado ninguna operación.</p>
                    <Button variant="secondary">
                        <Plus className="size-4" />
                        Añadir
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {recentTrades.map((trade) => (
                        <div key={trade.id} className="flex items-center justify-between gap-4">

                            <div className="flex items-center justify-start gap-4">
                                <div className="text-sm w-[50px] h-[50px] p-2 bg-secondary rounded flex items-center justify-center">
                                    {trade.company}
                                </div>

                                <div className="flex flex-col">
                                    <span>{format(trade.date, "d 'de' MMMM", { locale: es })}</span>
                                    <span className="text-sm">{trade.strategy}</span>
                                </div>
                            </div>

                            <span className={cn(
                                'rounded-full p-2',
                                trade.result && trade.result > 0 ? 'text-emerald-500 bg-emerald-100/60 dark:text-emerald-800 dark:bg-emerald-300' : 'text-red-500 bg-red-100/60 dark:text-red-800 dark:bg-red-300',

                            )}>
                                {formatNumber(trade.result ?? 0)}€
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}
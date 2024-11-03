import { DataTable } from "@/Components/Datatable"
import { columns } from "./Columns"
import { DateRange } from "react-day-picker"
import { useEffect, useState } from "react"
import { Trade } from "@/types"
import axios from "axios"
import { useActiveWalletStore } from "@/stores"
import { useToast } from "@/hooks/use-toast"
import { getErrorMessage } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface Props {
  readonly dateRange: DateRange
}

export default function TradesTable({ dateRange }: Props) {

  const { toast } = useToast()
  const { activeWallet } = useActiveWalletStore()
  const [trades, setTrades] = useState<Trade[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    reloadTrades()
  }, [dateRange, activeWallet])

  const reloadTrades = async () => {
    try {
      setIsLoading(true)
      const response = await axios.post(route('trades.get'), {
        walletId: activeWallet.id
      })

      setTrades(response.data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error obteniendo los datos',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteTrade = async (tradeId: number) => {
    try {
      const response = await axios.delete(route('trades.destroy', { id: tradeId }))

      if(response.status !== 200){
        throw new Error(response.data.message)
      }
      
      setTrades((prevTrades) => prevTrades.filter(trade => trade.id !== tradeId))

      toast({
        title: 'Correcto!',
        description: response.data.message
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: getErrorMessage(error),
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="mx-auto py-10">
      {isLoading ? (
        <Skeleton className="w-full h-[150px]" />
      ) : (
        <DataTable columns={columns(handleDeleteTrade)} data={trades} />
      )}
    </div>
  )
}

import { DataTable } from "@/Components/Datatable"
import { columns } from "./Columns"
import { DateRange } from "react-day-picker"
import { useEffect, useState } from "react"
import { Trade } from "@/types"
import axios from "axios"
import { useActiveWalletStore } from "@/stores"
import { useToast } from "@/hooks/use-toast"
import { getErrorMessage } from "@/lib/utils"
import { Skeleton } from "@/Components/ui/skeleton"
import { formatDate, subDays } from "date-fns"
import DateRangePicker from "@/Components/DateRangePicker"


const defaultDateRange: DateRange = {
  from: subDays(new Date(), 30),
  to: new Date(),
}

export default function TradesTable() {

  const { toast } = useToast()
  const { activeWallet } = useActiveWalletStore()
  const [trades, setTrades] = useState<Trade[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [dateRange, setDateRange] = useState<DateRange | undefined>(defaultDateRange)

  useEffect(() => {
    reloadTrades()
  }, [activeWallet, dateRange])

  const handleChangeRange = (date: DateRange | undefined) => {
    if (!date?.from || !date?.to) {
      toast({
        title: 'Error',
        description: 'Selecciona un rango de fechas válido',
        variant: 'destructive'
      })
      return
    }
    setDateRange(date)
  }

  const reloadTrades = async () => {
    try {
      setIsLoading(true)
      const response = await axios.post(route('trades.get'), {
        walletId: activeWallet?.id,
        startDate: formatDate(dateRange?.from ?? new Date(), 'yyyy-LL-dd'),
        endDate: formatDate(dateRange?.to ?? new Date(), 'yyyy-LL-dd')
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

      if (response.status !== 200) {
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
    <div className="mx-auto">

      <DateRangePicker defaultDateRange={defaultDateRange} handleUseValue={handleChangeRange} />

      <div className="mt-4">
        {isLoading ? (
          <Skeleton className="w-full h-[150px]" />
        ) : (
          <DataTable columns={columns(handleDeleteTrade)} data={trades} />
        )}
      </div>

    </div>
  )
}

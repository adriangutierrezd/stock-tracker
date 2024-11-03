import { DataTable } from "@/Components/Datatable"
import { columns } from "./Columns"
import { DateRange } from "react-day-picker"
import { useEffect, useState } from "react"
import { Trade } from "@/types"
import axios from "axios"
import { useActiveWalletStore } from "@/stores"
import { useToast } from "@/hooks/use-toast"
import { getErrorMessage, cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { format, subDays } from "date-fns"
import { Button } from "@/Components/ui/button"
import { Calendar } from "@/Components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover"
import { Search, Calendar as CalendarIcon } from "lucide-react";
import { es } from 'date-fns/locale';


export default function TradesTable() {

  const { toast } = useToast()
  const { activeWallet } = useActiveWalletStore()
  const [trades, setTrades] = useState<Trade[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: subDays(new Date(), 30),
  })


  useEffect(() => {
    reloadTrades()
  }, [activeWallet])

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

      <div className="my-4 flex flex-col sm:flex-row items-end sm:items-center justify-end gap-2">
        <div className={cn("grid gap-2", '')}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[250px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y", { locale: es })} -{" "}
                      {format(date.to, "LLL dd, y", { locale: es })}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y", { locale: es })
                  )
                ) : (
                  <span>Selecciona una fecha</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                locale={es}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button onClick={reloadTrades}>
          <Search className='size-4' />
        </Button>
      </div>

      {isLoading ? (
        <Skeleton className="w-full h-[150px]" />
      ) : (
        <DataTable columns={columns(handleDeleteTrade)} data={trades} />
      )}
    </div>
  )
}

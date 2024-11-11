import { Bar, BarChart, CartesianGrid, Cell, LabelList } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart"
import { DateRange } from "react-day-picker"
import { useEffect, useState } from "react"
import { Skeleton } from "@/Components/ui/skeleton"
import { useActiveWalletStore } from "@/stores"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"


interface Props {
  readonly dateRange: DateRange
}

const chartConfig = {
  amount: {
    label: "Resultado",
  },
} satisfies ChartConfig

export default function Overview({ dateRange }: Props) {


  const { toast } = useToast()
  const [data, setData] = useState<any[]>([])
  const { activeWallet } = useActiveWalletStore()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const loadInfo = async () => {
    if(!activeWallet){
      return
    }
    try {
      setIsLoading(true)

      const response = await axios.post(route('dashboard.overview-info'), {
        startDate: dateRange.from,
        endDate: dateRange.to ?? dateRange.from,
        walletId: activeWallet?.id
      })

      setData(response.data)

    } catch (error) {
      toast({
        title: 'Error',
        description: 'Ha ocurrido un error generando el gráfico',
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
    <>
      {isLoading ? (
        <Skeleton className="h-[300px] w-full" />
      ) : (
        <>
          {data.length > 0 ? (
            <ChartContainer config={chartConfig}>
              <BarChart
                margin={{
                  top: 50,
                  right: 5,
                  left: 5,
                  bottom: 50,
                }}
                accessibilityLayer
                data={data}>
                <CartesianGrid vertical={false} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel hideIndicator />}
                />
                <Bar dataKey="amount">
                  <LabelList position="top" dataKey="date" fillOpacity={1} />
                  {data.map((item) => (
                    <Cell
                      key={item.date}
                      fill={
                        item.amount > 0
                          ? "hsl(var(--chart-2))"
                          : "hsl(var(--chart-1))"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          ) : (
            <div className="flex items-center justify-center">
              No hay datos
            </div>
          )}
        </>
      )}
    </>

  )
}

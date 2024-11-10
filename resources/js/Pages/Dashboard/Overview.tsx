import { Bar, BarChart, CartesianGrid, Cell, LabelList } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart"
import { DateRange } from "react-day-picker"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export const description = "A bar chart with negative values"

const fakeData = [
  {
    date: '1 nov',
    amount: 200.33,
  },
  {
    date: '2 nov',
    amount: -34.21
  },
  {
    date: '4 nov',
    amount: 20.01
  },
  {
    date: '5 nov',
    amount: -20.01
  },
  {
    date: '6 nov',
    amount: 2.23
  },
  {
    date: '10 nov',
    amount: 200.01
  },
  {
    date: '11 nov',
    amount: -10.01
  },
  {
    date: '14 nov',
    amount: 23.01
  },
  {
    date: '15 nov',
    amount: 21.01
  },
  {
    date: '20 nov',
    amount: -20.01
  },
  {
    date: '21 nov',
    amount: 20.01
  },
  {
    date: '22 nov',
    amount: 20.01
  },
  {
    date: '27 nov',
    amount: 20.01
  }
]

interface Props {
  readonly dateRange: DateRange
}

const chartConfig = {
  amount: {
    label: "Resultado",
  },
} satisfies ChartConfig

export default function Overview({ dateRange }: Props) {

  const [isLoading, setIsLoading] = useState<boolean>(true)

  setTimeout(() => {
    setIsLoading(false)
  }, 1500)

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-fit w-fit" />
      ) : (
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={fakeData}>
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel hideIndicator />}
            />
            <Bar dataKey="amount">
              <LabelList position="top" dataKey="date" fillOpacity={1} />
              {fakeData.map((item) => (
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
      )}
    </>

  )
}

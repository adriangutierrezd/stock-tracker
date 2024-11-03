import { DataTable } from "@/Components/Datatable"
import { columns } from "./Columns"
import { DateRange } from "react-day-picker"
import { useEffect, useState } from "react"
import { Trade } from "@/types"
import axios from "axios"
import { useActiveWalletStore } from "@/stores"

interface Props {
  readonly dateRange: DateRange
}

export default function TradesTable({ dateRange }: Props) {

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
      // TODO
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto py-10">
      {isLoading ? (
        <p>...</p>
      ) : (
        <DataTable columns={columns} data={trades} />
      )}
    </div>
  )
}

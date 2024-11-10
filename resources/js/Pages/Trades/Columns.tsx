
import { Button } from "@/Components/ui/button"
import { cn, formatNumber } from "@/lib/utils"
import { Trade } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import DeleteTradeModal from "./DeleteTradeModal"
import { Link } from "@inertiajs/react"
import { TRADE_STATUS_CONVERSION } from "@/constants"


export const columns = (handleDeleteTrade: (tradeId: number) => void):  ColumnDef<Trade>[] => [
  {
    accessorKey: "company",
    header: "Empresa",
  },
  {
    accessorKey: "strategy",
    header: "Estrategia",
  },
  {
    accessorKey: "date",
    header: "Fecha",
  },
  {
    accessorKey: "time",
    header: "Hora",
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      return (
        <span className={cn(
          'rounded-full p-2',
          row.original.status == 'COMPLETED' ? 'text-emerald-500 bg-emerald-100/60 dark:text-emerald-800 dark:bg-emerald-300' : 'text-gray-500 bg-gray-100 rounded-full dark:text-gray-400 gap-x-2 dark:bg-gray-800',

      )}>{TRADE_STATUS_CONVERSION[row.original.status]}</span>
      )
    }
  },
  {
    accessorKey: "result",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Resultado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const formatted = formatNumber(row.getValue('result'))
      return <div className="text-left ml-4">{formatted}$</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={route('trades.edit', { trade: row.original.id })} className="p-2 text-sm flex justify-start gap-2 items-center w-full cursor-pointer">
                  <Pencil className="size-4 text-blue-500" />
                  Editar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DeleteTradeModal handleDeleteTrade={() => { handleDeleteTrade(row.original.id) }} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

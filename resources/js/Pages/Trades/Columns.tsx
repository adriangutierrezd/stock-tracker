
import { Button } from "@/Components/ui/button"
import { formatNumber } from "@/lib/utils"
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
      return <div className="text-left ml-4">{formatted}€</div>
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
              <Link href="#" className="p-2 text-sm flex justify-start gap-2 items-center w-full cursor-pointer">
                  <Pencil className="size-4 text-blue-500" />
                  Visualizar
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

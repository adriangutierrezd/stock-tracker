
import { Button } from "@/Components/ui/button"
import { formatNumber } from "@/lib/utils"
import { Trade } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

export const columns: ColumnDef<Trade>[] = [
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
      return <div className="text-center">{formatted}€</div>
    },
  }
]


import { Button } from "@/Components/ui/button"
import { Wallet } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { WALLET_ICON_CONVERSION } from "@/constants"
import DeleteWalletModal from "./DeleteWalletModal"
import WalletFormDialog from "./WalletFormDialog"

export const columns = (handleDeleteWallet: (walletId: number) => void, displayDeleteModal: boolean): ColumnDef<Wallet>[] => [
    {
        accessorKey: "name",
        header: "Nombre",
        cell: ({ row }) => {
            const Icon = WALLET_ICON_CONVERSION[row.original.icon]
            return (
                <div className="flex items-center gap-2">
                    <Icon className='size-4' />
                    <span className="font-medium">{row.original.name}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "description",
        header: "Descripción",
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
                            <WalletFormDialog wallet={row.original} />
                        </DropdownMenuItem>
                        {displayDeleteModal && (
                            <DropdownMenuItem asChild>
                                <DeleteWalletModal handleDeleteWallet={() => { handleDeleteWallet(row.original.id) }} />
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

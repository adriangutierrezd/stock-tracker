import { DataTable } from "@/Components/Datatable"
import useWalletsStorage from "@/stores/useWalletsStore"
import { columns } from "./Columns"
import axios from "axios"
import { useToast } from "@/hooks/use-toast"
import { getErrorMessage } from "@/lib/utils"
import { useActiveWalletStore } from "@/stores"

export default function WalletsTable() {

    const { toast } = useToast()
    const { activeWallet, setActiveWallet } = useActiveWalletStore()
    const { wallets, setWallets } = useWalletsStorage()

    const handleDeleteWallet = async (walletId: number) => {
        try {
            const response = await axios.delete(route('wallet.destroy', { id: walletId }))

            if (response.status !== 200) {
                throw new Error(response.data.message)
            }

            if(activeWallet.id == walletId){
                setActiveWallet(response.data.data[0])
            }

            setWallets(response.data.data)

            toast({
                title: 'Correcto!',
                description: 'Cartera eliminada con éxito'
            })
        } catch (error) {
            toast({
                title: 'Error',
                description: getErrorMessage(error),
                variant: 'destructive'
            })
        }
    }

    const displayDeleteModal = wallets.length > 1

    return (
        <div className="mx-auto">
            <DataTable columns={columns(handleDeleteWallet, displayDeleteModal)} data={wallets} />
        </div>
    )
}
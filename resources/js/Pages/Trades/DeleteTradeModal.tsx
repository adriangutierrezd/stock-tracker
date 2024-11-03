import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog"
import { Button } from "@/Components/ui/button"
import axios from "axios"
import { Trash } from "lucide-react"
import { useState } from "react"


export default function DeleteTradeModal({ tradeId }: { readonly tradeId: number }) {


    const [executing, setExecuting] = useState<boolean>(false)
    const handleDelete = async () => {
        try{
            setExecuting(true)
            const response = await axios.delete(route('trades.destroy', { trade: tradeId }))
        }catch(error){
            //
        }finally{
            setExecuting(false)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" className="p-2 text-sm flex justify-start gap-2 items-center w-full">
                    <Trash className="size-4 text-red-500" />
                    Eliminar
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer, y afectará a los resultados de tu cartera, ya sea 
                        de forma negativa o positiva.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Sí, eliminar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
import { Button } from "@/Components/ui/button";
import { Pencil } from "lucide-react";

export default function EditWalletModal() {
    return (
        <Button variant="ghost" className="p-2 text-sm flex justify-start gap-2 items-center w-full">
            <Pencil className="size-4 text-blue-500" />
            Editar
        </Button>
    )
}
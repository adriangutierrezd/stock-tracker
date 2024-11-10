import axios, { AxiosResponse } from 'axios';
import { Button } from "@/Components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import { useToast } from "@/hooks/use-toast";
import { Pencil, Plus } from "lucide-react"
import { WALLET_ICON_CONVERSION } from "@/constants"
import { Wallet, WalletIconType } from "@/types"
import React from 'react';
import { getErrorMessage } from '@/lib/utils';
import { useWalletsStore } from '@/stores';
import { Input } from '@/Components/ui/input';

const getDefaultValues = (wallet: Wallet | undefined) => {
    if(!wallet){
        return {
            name: undefined,
            description: undefined,
            icon: 'GROWING'
        }
    }

    return {
        name: wallet.name,
        description: wallet.description ?? undefined,
        icon: wallet.icon
    }
}

export default function WalletFormDialog({ wallet }: { readonly wallet: Wallet | undefined }) {

    const { toast } = useToast()
    const {wallets, setWallets} = useWalletsStore()
    const [open, setOpen] = React.useState<boolean>(false)

    const formSchema = z.object({
        name: z.string().min(2).max(15),
        description: z.string().optional(),
        icon: z.string().min(2).max(15)
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: getDefaultValues(wallet),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {

            let response: AxiosResponse

            if(wallet){
                response = await axios.put(route('wallet.update', {wallet: wallet.id}), values)
                if (response.status !== 200) {
                    throw new Error(response.data.message)
                }

                setWallets(wallets.map((w) => {
                    if(w.id == wallet.id){
                        return response.data.data
                    }

                    return w
                }))

            }else{
                response = await axios.post(route('wallet.store'), values);
                if (response.status !== 201) {
                    throw new Error(response.data.message)
                }
                setWallets([...wallets, response.data.data])
            }

            toast({
                title: 'Correcto!',
                description: response.data.message,
            })

            setOpen(false)
        } catch (error) {
            toast({
                title: 'Error',
                description: getErrorMessage(error),
                variant: 'destructive'
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {wallet ? (
                    <Button onClick={() => { setOpen(true) }} variant="ghost" className="p-2 text-sm flex justify-start gap-2 items-center w-full">
                        <Pencil className="size-4 text-blue-500" />
                        Editar
                    </Button>
                ): (
                    <Button onClick={() => { setOpen(true) }} variant="ghost" className="w-full flex items-center">
                        <Plus className="size-4" />
                        Nueva cartera
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Detalles de la cartera</DialogTitle>
                    {!wallet && (
                        <DialogDescription>
                            Puedes crear una nueva cartera de inversión independiente de las que ya tienes registradas.
                        </DialogDescription>
                    )} 
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="flex items-center gap-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="icon"
                                render={({ field }) => (
                                    <FormItem className="self-end">
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="w-[30px]">
                                                {Object.keys(WALLET_ICON_CONVERSION).map((key) => {
                                                    const Icon = WALLET_ICON_CONVERSION[key as WalletIconType]
                                                    return (
                                                        <SelectItem key={key} value={key}>
                                                            <Icon className="h-4 w-4" />
                                                        </SelectItem>
                                                    )
                                                })}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descripción</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Guardar</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

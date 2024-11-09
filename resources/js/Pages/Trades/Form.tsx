import { Head } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Trade } from "@/types";
import { es } from 'date-fns/locale';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form"
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea"
import { cn, getErrorMessage } from "@/lib/utils";
import { format, formatDate, parse } from "date-fns";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover"
import { Calendar } from "@/Components/ui/calendar";
import { Button } from "@/Components/ui/button";
import { Calendar as CalendarIcon, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useActiveWalletStore } from "@/stores";

interface Data {
    readonly data: Trade
}

interface Props {
    readonly trade: Data | undefined
}

interface AuxTradeLine {
    id: number | string;
    type: string;
    price: string | number;
    shares: string | number;
    commission: string | number;
}

const defaultTrade: AuxTradeLine = {
    id: uuidv4(),
    type: 'BUY',
    price: '',
    shares: '',
    commission: ''
}

const isValidNumber = (value: string | number): boolean => 
    value !== '' && !isNaN(Number(value));

const isTradeLineCorrect = ({ price, shares, commission }: AuxTradeLine): boolean => 
    [price, shares, commission].every(isValidNumber);

const getDefaultTrade = (trade: Trade | undefined) => {
    if(!trade){
        return {
            company: undefined,
            strategy: undefined,
            date: new Date(),
            status: undefined,
            time: undefined,
            comment: undefined
        }
    }

    return {
        company: trade.company,
        strategy: trade.strategy,
        date: parse(trade.date, 'yyyy-MM-dd', new Date()),
        status: trade.status as string,
        time: trade.time ?? undefined,
        comment: trade.comment ?? undefined
    }
}

const getDefaultTradeLines = (trade: Trade | undefined) => {
    if(trade){
        return trade.tradeLines
    }

    return [defaultTrade]
}

export default function Page({ trade }: Props) {

    const { toast } = useToast()
    const { activeWallet } = useActiveWalletStore()
    const [tradeLines, setTradeLines] = useState<AuxTradeLine[]>([])

    const formSchema = z.object({
        company: z.string().min(1).max(10),
        strategy: z.string().max(20).optional(),
        date: z.date(),
        status: z.string(),
        time: z.string(),
        comment: z.string().optional()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: getDefaultTrade(trade?.data),
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        try{
            if(tradeLines.some((tradeLine) => !isTradeLineCorrect(tradeLine))){
                throw new Error('Hay un error en al menos una de tus operaciones')
            }
    
            const payload = {
                ...values,
                date: formatDate(values.date, 'yyyy-LL-dd'),
                walletId: activeWallet.id,
                tradeLines
            }
    
            if(trade?.data){
                const response = await axios.put(route('trades.update', { trade: trade.data.id }), payload)
                if(response.status != 200){
                    throw new Error(response.data.data.message)
                }
            }else{
                const response = await axios.post(route('trades.store'), payload)
                if(response.status != 201){
                    throw new Error(response.data.data.message)
                }
            }
    
            // @ts-ignore
            window.location = route('trades.index');
        }catch(error){
            toast({
                title: 'Error',
                description: getErrorMessage(error),
                variant: 'destructive'
            })
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title="Trades - Crear" />
            <h1 className='text-2xl/7 font-bold text-primary-foregroun sm:truncate sm:text-3xl sm:tracking-tight'>
                Nuevo trade
            </h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 grid grid-cols-12 gap-4">
                    <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem className="col-span-full md:col-span-3">
                                <FormLabel>Empresa</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="HTCI" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="strategy"
                        render={({ field }) => (
                            <FormItem className="col-span-full md:col-span-4">
                                <FormLabel>Estrategia</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="5 min" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="col-span-full md:col-span-5 flex flex-col justify-end">
                                <FormLabel>Fecha</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP", { locale: es })
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            locale={es}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                            <FormItem className="col-span-full md:col-span-2">
                                <FormLabel>Hora</FormLabel>
                                <FormControl>
                                    <Input {...field} type="time" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem className="col-span-full md:col-span-10">
                                <FormLabel>Estado</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Indica el estado de la operación" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="DRAFT">Borrador (en proceso)</SelectItem>
                                        <SelectItem value="COMPLETED">Finalizado</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    El estado finalizado es para operaciones finalizadas. Si lo seleccionas, al guardar se hará el cálculo de rendimiento automáticamente.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="col-span-full rounded p-2 border">
                        <p className="font-semibold">Operaciones</p>
                        <p className="text-sm text-muted-foreground">
                            Aquí puedes añadir todas las entradas y salidas que hayas hecho durante este trade:
                        </p>

                        <TradeLinesForm trade={trade?.data} handleUpdateTrades={setTradeLines} />

                    </div>

                    <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                            <FormItem className="col-span-full">
                                <FormLabel>Comentarios</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Añade tus sensaciones/opiniones sobre el trade"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <div className="col-span-full flex items-center justify-end">
                        <Button type="submit">
                            Guardar
                        </Button>
                    </div>

                </form>
            </Form>


        </AuthenticatedLayout>
    );
}

interface TradeLineProps {
    readonly trade: Trade | undefined
    readonly handleUpdateTrades: (tLines: AuxTradeLine[]) => void
}

const TradeLinesForm = ({ handleUpdateTrades, trade }: TradeLineProps) => {

    const [tradeLines, setTradeLines] = useState<AuxTradeLine[]>(getDefaultTradeLines(trade))

    const handleFieldChange = ({ id, key, value }: { id: number | string, key: string, value: string | number }) => {
        setTradeLines(prevTradeLines =>
            prevTradeLines.map(tradeLine =>
                tradeLine.id === id ? { ...tradeLine, [key]: value } : tradeLine
            )
        );
    }

    const handleAddTrade = () => {
        setTradeLines([...tradeLines, { ...defaultTrade, id: uuidv4() }])
    }

    const handleDeleteTrade = (id: number | string) => {
        setTradeLines(prevTradeLines =>
            prevTradeLines.filter(tradeLine => tradeLine.id != id)
        );
    }

    useEffect(() => {
        handleUpdateTrades(tradeLines)
    }, [tradeLines])

    return (
        <>
            {tradeLines.map((tradeLine) => {
                return (
                    <div key={tradeLine.id} className="grid grid-cols-9 gap-2">

                        <div className="col-span-2">
                            <Label>Tipo de orden</Label>
                            <Select value={tradeLine.type} 
                            onValueChange={(value) => { handleFieldChange({ id: tradeLine.id, key: 'type', value }) }}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona una opción" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="BUY">Compra</SelectItem>
                                    <SelectItem value="SELL">Venta</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="col-span-2">
                            <Label>Nº Acciones</Label>
                            <Input
                                type="number"
                                step="1"
                                min="1"
                                name="shares"
                                value={tradeLine.shares}
                                onChange={(event) => { handleFieldChange({ id: tradeLine.id, key: 'shares', value: event.target.value }) }}
                            />
                        </div>

                        <div className="col-span-2">
                            <Label>Precio (unitario)</Label>
                            <Input
                                type="number"
                                step="0.01"
                                min="0"
                                name="price"
                                value={tradeLine.price}
                                onChange={(event) => { handleFieldChange({ id: tradeLine.id, key: 'price', value: event.target.value }) }}
                            />
                        </div>

                        <div className="col-span-2">
                            <Label>Comisión</Label>
                            <Input
                                type="number"
                                step="0.01"
                                min="0"
                                name="commission"
                                value={tradeLine.commission}
                                onChange={(event) => { handleFieldChange({ id: tradeLine.id, key: 'commission', value: event.target.value }) }}
                            />
                        </div>

                        <Button onClick={() => { handleDeleteTrade(tradeLine.id) }} type="button" variant="outline" className="self-end">
                            <Trash className="size-4 text-red-500" />
                        </Button>
                    </div>
                )
            })}

            <Button onClick={handleAddTrade} type="button" className="w-full mt-4" variant="secondary">
                <Plus className="size-4" />
                Añadir operación
            </Button>
        </>
    )

}

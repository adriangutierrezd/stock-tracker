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
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover"
import { Calendar } from "@/Components/ui/calendar";
import { Button } from "@/Components/ui/button";
import { Calendar as CalendarIcon, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";

interface Props {
    readonly trade: Trade | undefined
}

const defaultTrade = {
    type: 'BUY',
    price: '',
    shares: '',
    commission: ''
}

export default function Page({ trade }: Props) {


    const [tradeLines, setTradeLines] = useState<any[]>([defaultTrade])

    const formSchema = z.object({
        company: z.string().min(1).max(10),
        strategy: z.string().max(20).optional(),
        date: z.date(),
        status: z.string(),
        time: z.string().time(),
        comment: z.string().optional()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            company: undefined,
            strategy: undefined,
            date: new Date(),
            status: undefined,
            time: undefined,
            comment: undefined
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {

    }

    const handleAddNewOp = () => {
        setTradeLines([...tradeLines, defaultTrade])
    }

    const handleDeleteOp = (idx: number) => {
        setTradeLines(tradeLines.filter((tL, index) => index != idx))
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

                        {tradeLines.map((tradeLine, i) => (
                            <div key={i} className="flex items-center gap-2 mb-3">
                                <div className="flex-grow">
                                    <TradeLineForm />
                                </div>

                                {i !== 0 && (
                                    <Button type="button" onClick={() => { handleDeleteOp(i) }} className="self-end" variant="outline">
                                        <Trash className="text-red-500" />
                                    </Button>
                                )}
                            </div>
                        ))}


                        <Button className="w-full mt-4" type="button" variant="secondary" onClick={handleAddNewOp}>
                            <Plus className="size-4" />
                            Añadir nueva operación
                        </Button>

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


const TradeLineForm = () => {

    const formSchema = z.object({
        type: z.string(),
        shares: z.number(),
        price: z.number(),
        commission: z.number()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: 'BUY',
            shares: undefined,
            price: undefined,
            commission: undefined
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-12 gap-4">
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem className="col-span-full md:col-span-3">
                            <FormLabel>Tipo de operación</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Indica el tipo de operación" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="BUY">Compra</SelectItem>
                                    <SelectItem value="COMPLETED">Venta</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="shares"
                    render={({ field }) => (
                        <FormItem className="col-span-full md:col-span-3">
                            <FormLabel>Nº Acciones</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="100" min="1" step="1" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem className="col-span-full md:col-span-3">
                            <FormLabel>Precio (por acción)</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="1,23" min="0.01" step="0.01" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="commission"
                    render={({ field }) => (
                        <FormItem className="col-span-full md:col-span-3">
                            <FormLabel>Comisión</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="2,00" min="0.01" step="0.01" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}

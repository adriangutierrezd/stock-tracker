import { Head } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from "react";
import { format, subDays } from "date-fns"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import { Calendar } from "@/Components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover"
import { Search, Calendar as CalendarIcon } from "lucide-react";
import { es } from 'date-fns/locale';
import TradesTable from "./TradesTable";

export default function Page(){

    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: subDays(new Date(), 30),
    })

    return (
        <AuthenticatedLayout>
            <Head title="Trades" />
            <h1 className='text-2xl/7 font-bold text-primary-foregroun sm:truncate sm:text-3xl sm:tracking-tight'>
                Trades
            </h1>

            <div className="mt-4 flex items-center justify-end gap-2">
                <div className={cn("grid gap-2", '')}>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant={"outline"}
                                className={cn(
                                    "w-[300px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon />
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, "LLL dd, y", { locale: es })} -{" "}
                                            {format(date.to, "LLL dd, y", { locale: es })}
                                        </>
                                    ) : (
                                        format(date.from, "LLL dd, y", {locale: es})
                                    )
                                ) : (
                                    <span>Selecciona una fecha</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                                locale={es}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <Button>
                    <Search className='size-4' />
                </Button>
            </div>

            <div className="mt-4">
                <TradesTable />
            </div>

        </AuthenticatedLayout>
    );
}
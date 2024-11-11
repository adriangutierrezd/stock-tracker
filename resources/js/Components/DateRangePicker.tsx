import { Calendar as CalendarIcon, Search } from 'lucide-react';
import { format } from "date-fns"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import { Calendar } from "@/Components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover"
import { useState } from 'react';
import { es } from 'date-fns/locale';

interface Props {
    readonly defaultDateRange: DateRange
    readonly handleUseValue: (date: DateRange | undefined) => void
}

export default function DateRangePicker({ defaultDateRange, handleUseValue }: Props){

    const [date, setDate] = useState<DateRange | undefined>(defaultDateRange)

    return (
        <div className="mt-4 flex flex-col sm:flex-row items-end sm:items-center justify-end gap-2">
        <div className={cn("grid gap-2", '')}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "max-w-[300px] w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y", { locale: es})} -{" "}
                                    {format(date.to, "LLL dd, y", {locale: es})}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y", { locale: es })
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
                        locale={es}
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>

        <Button onClick={() => { handleUseValue(date) }}>
            <Search className='size-4' />
        </Button>
    </div>
    )

}
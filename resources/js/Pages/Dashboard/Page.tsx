import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import { Calendar as CalendarIcon, Search } from 'lucide-react';
import { Overview } from './Overview';
import RecentTrades from './RecentTrades';
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
import React from 'react';
import DashboardCards from './DashboardCards';


interface Props {
    readonly initialDate: Date,
    readonly endDate: Date
}

export default function Dashboard({ initialDate, endDate }: Props) {

    const [date, setDate] = React.useState<DateRange | undefined>({
        from: initialDate,
        to: endDate
    })

    return (
        <AuthenticatedLayout >
            <Head title="Dashboard" />
            <h1 className='text-2xl/7 font-bold text-primary-foregroun sm:truncate sm:text-3xl sm:tracking-tight'>Dashboard</h1>

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
                                            {format(date.from, "LLL dd, y")} -{" "}
                                            {format(date.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(date.from, "LLL dd, y")
                                    )
                                ) : (
                                    <span>Pick a date</span>
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
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <Button>
                    <Search className='size-4' />
                </Button>
            </div>

            {date && (
                <DashboardCards dateRange={date} />
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Resumen</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Operaciones recientes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RecentTrades />
                    </CardContent>
                </Card>
            </div>


        </AuthenticatedLayout>
    );
}

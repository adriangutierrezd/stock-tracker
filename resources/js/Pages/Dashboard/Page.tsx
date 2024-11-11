import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import RecentTrades from './RecentTrades';
import { DateRange } from "react-day-picker"
import { useState } from 'react';
import DashboardCards from './DashboardCards';
import Overview from './Overview';
import { useToast } from '@/hooks/use-toast';
import DateRangePicker from '@/Components/DateRangePicker';


interface Props {
    readonly initialDate: Date,
    readonly endDate: Date
}

export default function Dashboard({ initialDate, endDate }: Props) {

    const defaultDateRange: DateRange = {
        from: initialDate,
        to: endDate
    }

    const { toast } = useToast()
    const [dateRange, setDateRange] = useState<DateRange | undefined>(defaultDateRange)

    const handleChangeRange = (date: DateRange | undefined) => {
        if(!date?.from || !date?.to){
            toast({
                title: 'Error',
                description: 'Selecciona un rango de fechas válido',
                variant: 'destructive'
            })
            return
        }
        setDateRange(date)
    }

    return (
        <AuthenticatedLayout >
            <Head title="Dashboard" />
            <h1 className='text-2xl/7 font-bold text-primary-foregroun sm:truncate sm:text-3xl sm:tracking-tight'>Dashboard</h1>

            <DateRangePicker defaultDateRange={defaultDateRange} handleUseValue={handleChangeRange} />

            {dateRange && (
                <DashboardCards dateRange={dateRange} />
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
                <Card className="col-span-full md:col-span-4">
                    <CardHeader>
                        <CardTitle>Resumen</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        {dateRange && (
                            <Overview dateRange={dateRange} />
                        )}
                    </CardContent>
                </Card>
                <Card className="col-span-full md:col-span-3">
                    <CardHeader>
                        <CardTitle>Operaciones recientes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {dateRange && (
                            <RecentTrades dateRange={dateRange} />
                        )}
                    </CardContent>
                </Card>
            </div>


        </AuthenticatedLayout>
    );
}

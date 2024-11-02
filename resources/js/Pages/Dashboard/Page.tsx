import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import { ChartCandlestick, Euro, Percent } from 'lucide-react';
import { Overview } from './Overview';
import RecentTrades from './RecentTrades';


export default function Dashboard() {

    return (
        <AuthenticatedLayout >
            <Head title="Dashboard" />
            <h1 className='text-2xl/7 font-bold text-primary-foregroun sm:truncate sm:text-3xl sm:tracking-tight'>Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 mt-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Beneficio total
                        </CardTitle>
                        <Euro className='size-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">45.231,89€</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% desde el último mes
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Rentabilidad acumulada
                        </CardTitle>
                        <Percent className='size-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">34,23%</div>
                        <p className="text-xs text-muted-foreground">
                            +2.1% desde el último mes
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Operaciones
                        </CardTitle>
                        <ChartCandlestick className='size-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">76</div>
                        <p className="text-xs text-muted-foreground">
                            -11% desde el último mes
                        </p>
                    </CardContent>
                </Card>
            </div>

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

import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TradesTable from "./TradesTable";
import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";

export default function Page() {

    return (
        <AuthenticatedLayout>
            <Head title="Trades" />
            <h1 className='text-2xl/7 font-bold text-primary-foregroun sm:truncate sm:text-3xl sm:tracking-tight'>
                Trades
            </h1>

            <div className="flex items-center mt-4 justify-end">
                <Button variant="outline" asChild>
                    <Link href={route('trades.create')}>
                        <Plus className="size-4" />
                        Crear
                    </Link>
                </Button>
            </div>

            <TradesTable />

        </AuthenticatedLayout>
    );
}
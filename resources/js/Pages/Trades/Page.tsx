import { Head } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TradesTable from "./TradesTable";

export default function Page(){

    return (
        <AuthenticatedLayout>
            <Head title="Trades" />
            <h1 className='text-2xl/7 font-bold text-primary-foregroun sm:truncate sm:text-3xl sm:tracking-tight'>
                Trades
            </h1>

            <TradesTable />

        </AuthenticatedLayout>
    );
}
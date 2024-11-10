import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import WalletsTable from './WalletsTable';


export default function Page() {
    return (
        <AuthenticatedLayout >
            <Head title="Wallets" />
            <h1 className='text-2xl/7 font-bold text-primary-foregroun sm:truncate sm:text-3xl sm:tracking-tight'>Tus Wallets</h1>
            <WalletsTable />
        </AuthenticatedLayout>
    );
}

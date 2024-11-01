import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useActiveWalletStore } from '@/stores';
import { Head } from '@inertiajs/react';

export default function Dashboard() {

    const { activeWallet } = useActiveWalletStore()

    return (
        <AuthenticatedLayout >
            <Head title="Dashboard" />
            Operando sobre la wallet: {activeWallet?.name}
        </AuthenticatedLayout>
    );
}

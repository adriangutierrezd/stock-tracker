import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Page() {
    return (
        <AuthenticatedLayout >
            <Head title="Wallets" />
            <h1>Tus Wallets</h1>
        </AuthenticatedLayout>
    );
}

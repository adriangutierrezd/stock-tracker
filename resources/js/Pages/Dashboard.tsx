import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout >
            <Head title="Dashboard" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad magnam error dignissimos itaque, nesciunt sit doloribus debitis! Ipsa non illum laboriosam delectus, modi obcaecati! Dolorem possimus eius laudantium enim magnam!</p>
        </AuthenticatedLayout>
    );
}

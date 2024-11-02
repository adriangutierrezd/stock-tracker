import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import useWalletsStorage from '@/stores/useWalletsStore';
import { Wallet } from '@/types';
import { WALLET_ICON_CONVERSION } from '@/constants';
import { Button } from '@/Components/ui/button';
import { Trash } from 'lucide-react';


export default function Page() {

    const { wallets } = useWalletsStorage()

    return (
        <AuthenticatedLayout >
            <Head title="Wallets" />
            <h1 className='text-2xl/7 font-bold text-primary-foregroun sm:truncate sm:text-3xl sm:tracking-tight'>Tus Wallets</h1>
            <Table className='mt-4'>
                <TableCaption>Carteras bajo gestión.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Descripción</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {wallets.map((wallet: Wallet) => {
                        const Icon = WALLET_ICON_CONVERSION[wallet.icon]
                        return (
                            <TableRow key={wallet.id}>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Icon className='size-4' />
                                        <span className="font-medium">{wallet.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{wallet.description}</TableCell>
                                <TableCell className="flex items-center justify-end gap-2">
                                    <Button variant="ghost">
                                        <Trash className='size-4 text-red-500' />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </AuthenticatedLayout>
    );
}

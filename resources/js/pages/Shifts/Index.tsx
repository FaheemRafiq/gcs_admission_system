import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import type { Shift } from '@/types/database';
import { Head, Link } from '@inertiajs/react';
import { Clock, Pencil, Plus, Trash } from 'lucide-react';

interface Props extends SharedData {
    shifts: Shift[];
}

export default function Index({ shifts }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Shifts',
            href: route('shifts.index'),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Shifts" />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Clock className="h-6 w-6" />
                        <h1 className="text-2xl font-semibold">Shifts</h1>
                    </div>
                    <Button asChild>
                        <Link href={route('shifts.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Shift
                        </Link>
                    </Button>
                </div>

                <div className="bg-card rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">#</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {shifts.map((shift, index) => (
                                <TableRow key={shift.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{shift.name}</TableCell>
                                    <TableCell>
                                        <Badge variant={shift.status === 'active' ? 'success' : 'destructive'}>{shift.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={route('shifts.edit', shift.id)}>
                                                    <Pencil className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link
                                                    href={route('shifts.destroy', shift.id)}
                                                    method="delete"
                                                    as="button"
                                                    className="text-destructive"
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}

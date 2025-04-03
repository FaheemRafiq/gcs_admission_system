import { Badge } from '@/components/ui/badge';
import { type AdmissionForm } from '@/types/database';
import { ColumnDef } from '@tanstack/react-table';
import { ActionMenu } from './actions';

export const columns: ColumnDef<AdmissionForm>[] = [
    {
        accessorKey: 'form_key',
        header: 'Form Key',
        cell: ({ row }) => <span>{row.original.form_key}</span>,
        size: 150,
    },
    {
        accessorKey: 'photo_path',
        header: 'Photo',
        cell: ({ row }) => <img src={row.original.photo_path} alt={row.original.name} className="h-10 w-10 rounded-full object-cover" />,
        size: 80,
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => <span>{row.original.name}</span>,
        size: 160,
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => <span>{row.original.email}</span>,
        size: 200,
    },
    {
        accessorKey: 'program.program_full_name',
        header: 'Program',
        cell: ({ row }) => <span>{row.original.program?.program_full_name}</span>,
        size: 120,
    },
    // {
    //     accessorKey: 'subject_combination',
    //     header: 'Subjects',
    //     cell: ({ row }) => (
    //         <span>
    //             {row.original.subject_combination ?? '---'}
    //         </span>
    //     ),
    //     size: 200
    // },
    {
        accessorKey: 'shift',
        header: 'Shift',
        cell: ({ row }) => <span>{row.original.shift}</span>,
        size: 100,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
            <Badge variant={row.original.status === 'rejected' ? 'destructive' : row.original.status === 'approved' ? 'success' : 'pending'}>
                {row.original.status}
            </Badge>
        ),
        size: 120,
    },
    {
        accessorKey: 'cell',
        header: 'Phone',
        cell: ({ row }) => <span>{row.original.cell}</span>,
    },

    {
        accessorKey: 'father_name',
        header: 'Father Name',
        cell: ({ row }) => <span>{row.original.father_name}</span>,
    },

    {
        accessorKey: 'father_cell',
        header: 'Father Cell',
        cell: ({ row }) => <span>{row.original.father_cell}</span>,
    },
    {
        accessorKey: 'created_at',
        header: 'Submitted On',
        cell: ({ row }) => <span>{row.original.created_at}</span>,
    },
    {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
            <center>
                <ActionMenu row={row} />
            </center>
        ),
        size: 100,
    },
];

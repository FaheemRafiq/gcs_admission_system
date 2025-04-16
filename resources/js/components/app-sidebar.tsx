import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, ClipboardList, ClockIcon, FileIcon, FileText, GraduationCap, LayoutGrid, TableOfContents } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: route('dashboard'),
        icon: LayoutGrid,
    },
    {
        title: 'Admission Management',
        group: true,
    },
    {
        title: 'Forms',
        url: route('admission-forms.index'),
        icon: TableOfContents,
    },
    {
        title: 'Documents',
        url: route('documents.index'),
        icon: FileIcon,
    },
    {
        title: 'Document Requirements',
        url: route('document-requirements.index'),
        icon: FileText,
    },
    {
        title: 'Examination Results',
        url: route('examination-results.index'),
        icon: ClipboardList,
    },
    {
        title: 'Program Management',
        group: true,
    },
    {
        title: 'Programs',
        url: route('programs.index'),
        icon: GraduationCap,
    },
    {
        title: 'Program Groups',
        url: route('program-groups.index'),
        icon: BookOpen,
    },
    {
        title: 'Shifts',
        url: route('shifts.index'),
        icon: ClockIcon,
    },
];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         url: 'https://github.com/laravel/react-starter-kit',
//         icon: Folder,
//     },
//     {
//         title: 'Documentation',
//         url: 'https://laravel.com/docs/starter-kits',
//         icon: BookOpen,
//     },
// ];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('dashboard')} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

import Sidebar from '@/components/dashboard/Sidebar';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Abdullah dashboard",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen pt-24">
            <Sidebar />

            <main className="flex-1 p-14">
                {children}
            </main>
        </div>
    )
}
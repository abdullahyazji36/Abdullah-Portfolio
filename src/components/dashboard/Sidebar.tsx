"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from '@mui/icons-material/Home';
import AddCardIcon from '@mui/icons-material/AddCard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import type { SvgIconComponent } from "@mui/icons-material";

interface SidebarLink {
    name: string;
    href: string;
    icon: SvgIconComponent;
}

const links: SidebarLink[] = [
    {
        name: "Home",
        href: "/dashboard",
        icon: HomeIcon,
    },
    {
        name: "Add Projects",
        href: "/dashboard/dashprojects/add",
        icon: AddCardIcon,
    },
    {
        name: "Add Skill",
        href: "/dashboard/dashskills/add",
        icon: AddCircleIcon,
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-gray-900 text-white p-6">
            <h1 className="mb-8 text-2xl font-bold">
                Dashboard
            </h1>

            <nav className="space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;

                    return (

                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${pathname === link.href
                                ? "bg-blue-600"
                                : "hover:bg-gray-700"
                                }`}
                        >
                            <Icon fontSize="small"
                                className="text-xl"
                            />
                            <span className="text-base font-medium tracking-wide">
                                {link.name}
                            </span>
                        </Link>
                    )
                })}
            </nav>
        </aside>
    );
}
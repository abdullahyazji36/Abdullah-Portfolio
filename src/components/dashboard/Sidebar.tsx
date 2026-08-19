"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from '@mui/icons-material/Home';
import AddCardIcon from '@mui/icons-material/AddCard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import type { SvgIconComponent } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

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
        name: "Add Skill Category",
        href: "/dashboard/dashskills/add",
        icon: AddCircleIcon,
    },
    {
        name: "Add Skill",
        href: "/dashboard/dashskill/add",
        icon: AddCircleIcon,
    }
];

export default function Sidebar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const handleNavigation = () => {
        if (window.innerWidth < 1024) {
            setOpen(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="fixed left-4 top-28 z-50 rounded-lg p-2 md:hidden"
            >
                <MenuIcon />
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <aside className={`fixed left-0 top-20 z-40 h-[calc(100vh-6rem)] w-64 dark:bg-gray-900 bg-white p-6 transition-transform duration-300
                    ${open ? "translate-x-0" : "-translate-x-full"
                }
                    md:static md:h-auto md:translate-x-0`}
            >
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">
                        Dashboard
                    </h1>

                    <button
                        onClick={() => setOpen(false)}
                        className="md:hidden"
                    >
                        <CloseIcon />
                    </button>
                </div>
                <nav>
                    <ul className="space-y-2">
                        {links.map((link) => {
                            const Icon = link.icon;

                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${pathname === link.href
                                            ? "bg-blue-600"
                                            : "dark:hover:bg-gray-700 hover:bg-gray-700/25"
                                            }`}
                                        onClick={handleNavigation}
                                    >
                                        <Icon fontSize="small"
                                            className="text-xl"
                                        />
                                        <span className="text-base font-medium tracking-wide">
                                            {link.name}
                                        </span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </aside>
        </>
    );
}
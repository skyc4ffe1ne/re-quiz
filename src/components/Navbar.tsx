"use client";
import Link from "next/link";
import { Monitor, MoonStar, Sun } from "lucide-react";
import { Button } from "./ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/app/(main)/SessionProvider";
import { useTheme } from "next-themes";

export default function Navbar() {
    const { user } = useSession();

    const { setTheme } = useTheme();

    return (
        <header className="h-[80px] px-10 flex justify-between items-center">

            <div className="flex items-center justify-start gap-2 flex-1">
                <div className="mr-2 w-8 h-8 rounded-full  bg-gradient-to-tr from-sky-300 via-sky-400 to-blue-500 cursor-pointer"></div>
                <Link href="/user">
                    <span className="font-medium"> {user ? user.username : "guest"}</span>
                </Link>
            </div>

            <div className="flex-1 flex justify-end items-center gap-4">
                <nav className="pr-4 border-r">
                    <ul className="flex gap-4">
                        <li>
                            {user ? (
                                <Link
                                    className="font-semibold leading-6 text-sm hover:text-hovernav"
                                    href={
                                        {
                                            pathname: `/${user.username}`,
                                            query: { tab: 'quiz' },
                                        }
                                    }> Quiz </Link>
                            ) : (
                                <Link href="/signup"> Sign up </Link>
                            )}

                        </li>
                        <li>
                            <Link
                                href="/"
                                className="font-semibold leading-6 text-sm hover:text-hovernav"
                            > Home </Link>
                        </li>
                    </ul>
                </nav>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <MoonStar className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            className="cursor-pointer font-medium py-1 text-sm"
                            onClick={() => setTheme("light")}
                        >
                            <Sun strokeWidth={2} className="mr-2" />
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer font-medium py-1 text-sm"
                            onClick={() => setTheme("dark")}
                        >
                            <MoonStar strokeWidth={2} className="mr-2" />
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer font-medium py-1 text-sm"
                            onClick={() => setTheme("system")}
                        >
                            <Monitor strokeWidth={2} className="mr-2" />
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}

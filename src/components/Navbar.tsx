"use client";
import Link from "next/link";
import { LogIn, LogOut, Monitor, MoonStar, Sun } from "lucide-react";
import { Button } from "./ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/app/(main)/SessionProvider";
import { useTheme } from "next-themes";
import { logout } from "@/app/(auth)/action";
import { useQueryClient } from "@tanstack/react-query";

export default function Navbar() {
    const { user } = useSession();

    const { setTheme, theme } = useTheme();

    const queryClient = useQueryClient()

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
                            {user && (
                                <Link
                                    className="font-semibold leading-6 text-sm hover:text-hovernav"
                                    href={
                                        {
                                            pathname: `/${user.username}`,
                                            query: { tab: 'quiz' },
                                        }
                                    }> Quiz </Link>
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
                            <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 stroke-accentbd" />
                            <MoonStar className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 stroke-accentbd" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            className={`cursor-pointer font-medium py-1 text-sm ${theme === "light" ? "bg-accent" : ""}`}
                            onClick={() => setTheme("light")}
                        >
                            <Sun strokeWidth={2} className={`mr-2 ${theme === "light" ? "stroke-accentbd" : ""}`} />
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className={`cursor-pointer font-medium py-1 text-sm ${theme === "dark" ? "bg-accent" : ""}`}
                            onClick={() => setTheme("dark")}
                        >
                            <MoonStar strokeWidth={2} className={`mr-2 ${theme === "dark" ? "stroke-accentbd" : ""}`} />
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className={`cursor-pointer font-medium py-1 text-sm ${theme === "system" ? "bg-accent" : ""}`}
                            onClick={() => setTheme("system")}
                        >
                            <Monitor strokeWidth={2} className={`mr-2 ${theme === "system" ? "stroke-accentbd" : ""}`} />
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {user ? (
                    <Button size="icon" variant="ghost" onClick={() => {
                        queryClient.clear()
                        logout()
                    }}>
                        <LogOut className="w-[1.1rem] h-[1.1rem] stroke-muted-foreground hover:stroke-primary" />
                    </Button>
                ) : (
                    <Link
                        href="/signup">
                        <LogIn className="w-[1.1rem] h-[1.1rem] hover:stroke-muted-foreground stroke-primary" />
                    </Link>
                )}
            </div>
        </header>
    );
}

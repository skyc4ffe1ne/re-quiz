"use client";
import Link from "next/link";

import { Menu, MoonStar, Sun } from "lucide-react";
import { Button } from "./ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/app/(main)/SessionProvider";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

export default function Navbar() {
    const { user } = useSession();

    const pathname = usePathname();

    const { setTheme, theme } = useTheme();

    return (
        <header className="h-[80px] px-10 flex justify-between items-center bg-secondary">
            <div className="flex items-center justify-start gap-2 flex-1">
                <div className="mr-2 w-8 h-8 rounded-full  bg-gradient-to-tr from-sky-300 via-sky-400 to-blue-500 cursor-pointer"></div>
                <Link href="/user">
                    <span className="font-medium"> {user ? user.username : "guest"}</span>
                </Link>
                <span> / </span>
                <span className="font-medium"> Quiz </span>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger className="flex gap-2 cursor-pointer flex-1 justify-center">
                    <Menu strokeWidth={1.3} />
                    <span>
                        {" "}
                        {pathname === "/"
                            ? "Home"
                            : pathname[1].toUpperCase() + pathname.slice(2)}
                    </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-accent">
                    <Link href="/about">
                        <DropdownMenuItem className="hover:bg-secondary font-medium pl-4 cursor-pointer py-3">
                            About
                        </DropdownMenuItem>
                    </Link>

                    <Link href="/markdown">
                        <DropdownMenuItem className="hover:bg-secondary font-medium pl-4 cursor-pointer py-3">
                            Markdown
                        </DropdownMenuItem>
                    </Link>

                    <Link href="/examples">
                        <DropdownMenuItem className="hover:bg-secondary font-medium pl-4 cursor-pointer py-3">
                            Examples
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex-1 flex justify-end items-center">
                {theme === "dark" ? (
                    <Button size="sm" variant="ghost" onClick={() => setTheme("light")}>
                        <Sun />
                    </Button>
                ) : (
                    <Button size="sm" variant="ghost" onClick={() => setTheme("dark")}>
                        <MoonStar />
                    </Button>
                )}

                <Button> Create it now </Button>
            </div>
        </header>
    );
}

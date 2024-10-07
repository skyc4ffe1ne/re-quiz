"use client";
import Link from "next/link";

import { Menu } from "lucide-react";
import { Button } from "./ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSession } from "@/app/(main)/SessionProvider";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user } = useSession();
  console.log(user);

  const pathname = usePathname();

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

      <Popover>
        <PopoverTrigger className="flex gap-2 cursor-pointer flex-1 justify-center">
          <Menu strokeWidth={1.3} />
          <span>
            {" "}
            {pathname === "/"
              ? "Home"
              : pathname[1].toUpperCase() + pathname.slice(2)}
          </span>
        </PopoverTrigger>
        <PopoverContent>
          <ul>
            <li className="hover:bg-secondary">
              <Link href="/about">About </Link>{" "}
            </li>
            <li className="hover:bg-secondary">
              <Link href="/markdown">Markdown</Link>{" "}
            </li>
            <li className="hover:bg-secondary">
              <Link href="/examples">Examples</Link>{" "}
            </li>
          </ul>
        </PopoverContent>
      </Popover>

      <div className="flex-1 text-right">
        <Button> Create it now </Button>
      </div>
    </header>
  );
}

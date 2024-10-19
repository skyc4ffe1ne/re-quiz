"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Heart, Pencil, SquareArrowOutUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function HeaderQuizName({ checkAuthor }: boolean) {
    const pathname = usePathname();
    const nameQuiz = pathname.match(/(?<=[a-zA-Z0-9\-_]\/).+/)

    return (
        <div className="pt-8 flex justify-between items-center">
            <div>
                <h3 className="text-2xl  sm:text-2xl font-bold tracking-tight">
                    {nameQuiz?.length ? nameQuiz[0] : "Title "}
                </h3>
            </div>

            <nav>
                <ul className="flex gap-2">

                    {checkAuthor && (
                        <li>
                            <Link href={
                                `${pathname}/settings`
                            }>
                                <Button asChild variant="outline" className="gap-2">
                                    <div>
                                        <Pencil size={16} /> Edit
                                    </div>
                                </Button>
                            </Link>
                        </li>

                    )}
                    <li>
                        <Link href={`${pathname}/settings`}>
                            <Button asChild variant="outline" className="gap-2">
                                <div>
                                    <Heart size={16} /> Save
                                </div>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link href={`${pathname}/settings`}>
                            <Button asChild variant="outline" className="gap-2">
                                <div>
                                    <SquareArrowOutUpRight size={16} /> Share
                                </div>
                            </Button>
                        </Link>
                    </li>
                    <li></li>
                </ul>
            </nav>
        </div >
    );
}

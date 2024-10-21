import { validateRequest } from "@/auth";
import { Bookmark, Heart, Plus, House } from "lucide-react";
import Link from "next/link";

export default async function QuizSidebar({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

    const { user } = await validateRequest()

    const { tab } = searchParams

    return (
        <nav className="px-10 border-r pt-8 h-screen">


            <ul className="flex flex-col gap-4">
                <li>
                    <Link href={
                        {
                            pathname: `/${user?.username}`,
                            query: { tab: 'quiz' },
                        }
                    }>
                        <div className={`w-12 h-12 rounded-sm border flex items-center justify-center hover:bg-accent group ${tab === "quiz" ? "bg-accent" : ""}`}>

                            <House className={`stroke-muted fill-primary dark:fill-primary-foreground group-hover:fill-accentbd ${tab === "quiz" ? "fill-accentbd dark:fill-accentbd" : ""}`} />
                        </div>
                    </Link>
                </li>


                <li>
                    <Link href={
                        {
                            pathname: `/${user?.username}`,
                            query: { tab: 'liked' },
                        }}>
                        <div className={`w-12 h-12 rounded-sm border flex items-center justify-center hover:bg-accent group ${tab === "liked" ? "bg-accent" : ""}`}>
                            <Heart className={`stroke-muted fill-primary dark:fill-primary-foreground group-hover:fill-accentbd ${tab === "liked" ? "fill-accentbd dark:fill-accentbd" : ""}`} />
                        </div>
                    </Link>
                </li>

                <li>
                    <Link href={
                        {
                            pathname: `/${user?.username}`,
                            query: { tab: 'bookmark' },
                        }
                    }>
                        <div className={`w-12 h-12 rounded-sm border flex items-center justify-center hover:bg-accent group ${tab === "bookmark" ? "bg-accent" : ""}`}>
                            <Bookmark className={`stroke-muted fill-primary dark:fill-primary-foreground group-hover:fill-accentbd ${tab === "bookmark" ? "fill-accentbd dark:fill-accentbd" : ""}`} />
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href="/new">
                        <div className="w-12 h-12 rounded-sm border flex items-center justify-center hover:bg-accent group">
                            <Plus className="dark:stroke-muted stroke-primary group-hover:stroke-sky-400" />
                        </div>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

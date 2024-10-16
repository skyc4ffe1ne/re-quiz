import LoginForm from "./LoginForm"
import Link from "next/link"

export default function page() {
    return (
        <div className="flex flex-col">
            <h2 className="leading-6 font-semibold mb-2 text-accentbd text-sm">
                Sign in
            </h2>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight mb-10">
                Welcome back
            </h1>
            <LoginForm />
            <Link href="/signup" className="mt-2 hover:underline underline-offset-2">Don&apos;t have an account ?</Link>
        </div>
    )
}

import SignUpForm from "./SignUpForm";
import Link from "next/link"

export default function page() {
    return (
        <div className="flex flex-col">
            <header className="mb-10">
                <h2 className="leading-6 font-semibold mb-2 text-accentbd text-sm">
                    Start for free
                </h2>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight dark:text-slate-200">
                    Create a new account
                </h1>
            </header>
            <SignUpForm />
            <Link href="/login" className="mt-2 hover:underline underline-offset-2"> Arleady have an account ? </Link>
        </div>
    );
}

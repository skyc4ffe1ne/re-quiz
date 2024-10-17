import LoginForm from "./LoginForm"
import HeaderLogin from "./HeaderLogin"
import { Background } from "@/components/Background";

export default function page() {
    return (
        <div className="flex w-full h-screen items-center">

            <div className="flex flex-col flex-1 px-10 items-center">
                <HeaderLogin />
                <LoginForm />
            </div>


            <div className="flex flex-1 bg-secondary h-screen">
                <Background />
            </div>

        </div>
    )
}

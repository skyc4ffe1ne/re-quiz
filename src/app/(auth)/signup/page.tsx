import { Background } from "@/components/Background";
import HeaderSignUp from "./HeaderSignUp";
import SignUpForm from "./SignUpForm";

export default function page() {
    return (
        <div className="flex w-full h-screen items-center">

            <div className="flex flex-col flex-1 px-10 items-center">
                <HeaderSignUp />
                <SignUpForm />
            </div>


            <div className="flex flex-1 bg-secondary h-screen">
                <Background />
            </div>

        </div>
    );
}

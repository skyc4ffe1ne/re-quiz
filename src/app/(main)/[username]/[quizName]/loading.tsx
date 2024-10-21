
import { LoaderCircle } from "lucide-react";

export default function Loading() {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <LoaderCircle size={48} className="animate-spin" />
        </div>
    )
}

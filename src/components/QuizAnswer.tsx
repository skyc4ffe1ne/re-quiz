import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const QuizAnswer = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex w-full rounded-md border border-input bg-transparent text-secondary-foreground outline-none border-none  active:border-none active:outline-none focus:border-none focus:outline-none",
                    className,
                )}
                ref={ref}
                {...props}
            />
        );
    },
);
QuizAnswer.displayName = "Input";

export { QuizAnswer };

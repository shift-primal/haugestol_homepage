import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { cn } from "#/lib/shadcn.utils";
import { m } from "#/paraglide/messages";

export const NotFound = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-dvh pointer-events-auto">
            <h1 className="text-2xl font-bold">Oops...</h1>
            <span className="text-lg mt-2">{m.page_not_found_message()}</span>
            <span className="font-medium text-muted-foreground">
                {m.page_not_found_question()}
            </span>
            <p className="mt-4 flex items-baseline gap-2 overflow-hidden">
                <Link
                    to="/"
                    className="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
                >
                    {m.page_not_found_goback()}
                </Link>
                <span
                    aria-hidden={!show}
                    className={cn(
                        "inline-block transition-all duration-300 ease-out",
                        show
                            ? "translate-y-0 opacity-100"
                            : "translate-y-3 opacity-0"
                    )}
                >
                    {m.page_not_found_now()}
                </span>
            </p>
        </div>
    );
};

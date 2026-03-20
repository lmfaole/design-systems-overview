import { Link } from "@fremtind/jokul/link";

interface NotFoundProps {
    message: string;
    backHref: string;
    backLabel: string;
}

export function NotFound({ message, backHref, backLabel }: NotFoundProps) {
    return (
        <main className="page">
            <h1>{message}</h1>
            <Link href={backHref}>{backLabel}</Link>
        </main>
    );
}

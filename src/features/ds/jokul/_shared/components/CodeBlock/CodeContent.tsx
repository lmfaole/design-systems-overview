
import { CopyButton } from "./CopyButton";

interface CodeContentProps {
    code: string;
}

export function CodeContent({ code }: CodeContentProps) {
    const trimmed = code.trim();

    return (
        <div className="content">
            <div className="copy">
                <CopyButton code={trimmed} />
            </div>
            <pre className="pre">
                <code>{trimmed}</code>
            </pre>
        </div>
    );
}

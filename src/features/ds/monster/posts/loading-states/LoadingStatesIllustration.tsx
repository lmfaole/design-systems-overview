import "./LoadingStatesIllustration.scss";

export function LoadingStatesIllustration() {
    return (
        <svg
            viewBox="0 0 320 220"
            className="monster-pattern-illustration-svg monster-pattern-illustration-svg--loading-states"
            aria-hidden="true"
            focusable="false"
        >
            <ellipse cx="160" cy="110" rx="100" ry="74" className="monster-illustration-aura" />
            <circle cx="160" cy="110" r="64" className="monster-illustration-loader-track" />
            <circle cx="160" cy="110" r="64" className="monster-illustration-loader-ring" />
            <circle cx="160" cy="110" r="24" className="monster-illustration-loader-core" />
            <circle cx="214" cy="74" r="11" className="monster-illustration-status-dot" />
        </svg>
    );
}

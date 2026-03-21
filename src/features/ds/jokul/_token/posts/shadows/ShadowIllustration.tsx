import "./ShadowIllustration.scss";

const SHADOW_SURFACES = [
    { id: "navigation", label: "Navigasjon" },
    { id: "task", label: "Oppgave" },
    { id: "hover", label: "Hover" },
] as const;

export function ShadowIllustration() {
    return (
        <div
            className="shadow-illustration"
            data-token-illustration="skygger"
            aria-hidden="true"
        >
            <div className="shadow-stage">
                {SHADOW_SURFACES.map(({ id, label }) => (
                    <div
                        key={id}
                        className="shadow-surface"
                        data-shadow-surface={id}
                        role="presentation"
                    >
                        <span>{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

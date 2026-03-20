type DesignSystemExternalLinksProps = {
    links: {
        frontPage: string;
        changelog: string;
        about: string;
    };
};

const LINK_LABELS = [
    { key: "frontPage", label: "Forside" },
    { key: "changelog", label: "Endringslogg" },
    { key: "about", label: "Om" },
] as const;

export function DesignSystemExternalLinks({ links }: DesignSystemExternalLinksProps) {
    return (
        <ul>
            {LINK_LABELS.map(({ key, label }) => (
                <li key={key}>
                    <a href={links[key]} rel="noreferrer" target="_blank">{label}</a>
                </li>
            ))}
        </ul>
    );
}

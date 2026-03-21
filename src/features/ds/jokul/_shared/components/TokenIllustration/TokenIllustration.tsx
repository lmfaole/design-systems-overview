import "./token-illustration.scss";

export type TokenIllustrationSlug =
    | "animasjon"
    | "breakpoints"
    | "farger"
    | "kantradiuser"
    | "skygger"
    | "spacing"
    | "typografi";

interface TokenIllustrationProps {
    slug: TokenIllustrationSlug;
    surface?: "card" | "page";
}

export function TokenIllustration({
    slug,
    surface = "card",
}: TokenIllustrationProps) {
    const Specimen = slug === "typografi" ? "strong" : "span";
    const specimenProps =
        surface === "page"
            ? { "data-token-specimen": slug }
            : { "data-token-card-specimen": slug };

    return (
        <div
            className="token-illustration"
            data-surface={surface}
            data-token-illustration-bleed="true"
            {...(surface === "page" ? { "data-token-illustration": slug } : { "data-token-card-illustration": slug })}
        >
            <div className="token-frame">
                <Specimen className="token-specimen" {...specimenProps}>
                    {slug === "typografi" ? "Ag" : undefined}
                </Specimen>
            </div>
        </div>
    );
}

export function TokenCardIllustration({ slug }: { slug: TokenIllustrationSlug }) {
    return <TokenIllustration slug={slug} surface="card" />;
}

export function TokenPageIllustration({ slug }: { slug: TokenIllustrationSlug }) {
    return <TokenIllustration slug={slug} surface="page" />;
}

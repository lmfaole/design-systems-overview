import {visibleTokenCount} from "@/features/ds/jokul/tokens/token-overview-data";
import {visibleComponentCount} from "./component-overview-data";
import {overviewInlineStyles} from "./overview-inline-styles";

export default function Home() {
    return (
        <>
            <style>{overviewInlineStyles}</style>
            <main className="page overview-page overview-nav-page">
                <h1>Jøkul</h1>
                <div className="overview-nav-grid">
                    <a
                        className="overview-card"
                        data-kind="component"
                        data-layout="feature"
                        data-overview-card="component"
                        href="/ds/jokul/component"
                    >
                        <span className="overview-card-meta">{visibleComponentCount} komponenter</span>
                        <strong className="overview-card-title">Komponenter</strong>
                        <small className="overview-card-description">
                            Utforsk alle komponentene samlet, med prop-tabeller, interaktive eksempler og
                            dokumentasjon for bruk i praksis.
                        </small>
                    </a>
                    <a
                        className="overview-card"
                        data-kind="token"
                        data-layout="feature"
                        data-overview-card="token"
                        href="/ds/jokul/token"
                    >
                        <span className="overview-card-meta">{visibleTokenCount} tokenområder</span>
                        <strong className="overview-card-title">Designtokens</strong>
                        <small className="overview-card-description">
                            Se alle fundamentene samlet, med illustrerte kort for typografi, farger,
                            spacing, bevegelse og resten av tokensystemet.
                        </small>
                    </a>
                </div>
            </main>
        </>
    );
}

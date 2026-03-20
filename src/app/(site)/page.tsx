import type { Metadata } from "next";
import { createPageMetadata } from "@/app/_shared/seo";

export const metadata: Metadata = createPageMetadata({
    title: "Læringsressurs",
    description: "En samlet inngang til dokumentasjon, komponenter, designtokens og UI-mønstre.",
    path: "/",
});

export default function Home() {
    return (
        <main className="page" data-ua-only>
            <header>
                <h1>Læringsressurs for UI</h1>
                <p>
                    Dokumentasjon, komponenter, tokens og mønstre samlet på ett sted. Bruk forsiden som inngang til
                    læringsressursen, og gå til <a href="/ds">/ds</a> når du vil utforske designsystemer spesifikt.
                </p>
            </header>

            <section>
                <div>
                    <h2>Snarveier</h2>
                    <p>Velg området du vil jobbe i.</p>
                </div>
                <ul>
                    <li><a href="/ds">Se alle designsystemer</a></li>
                    <li><a href="/ds/jokul">Gå til Jøkul</a></li>
                    <li><a href="/ds/jokul/component">Bla i komponenter</a></li>
                    <li><a href="/ds/monster">Utforsk UI-mønstre</a></li>
                </ul>
            </section>
        </main>
    );
}

export default function MonsterLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <header>
                <a href="/monster">Mønster</a>
                <nav aria-label="Hovedmeny">
                    <a href="/monster">Mønster</a>
                    <a href="/ds/jokul/component">Komponenter</a>
                    <a href="/ds/jokul">Jøkul</a>
                </nav>
            </header>

            <main className="page">
                {children}
            </main>

            <footer>
                <p>
                    En uoffisiell læringsressurs for mønstre og praksis. Ikke tilknyttet Fremtind.
                </p>
            </footer>
        </div>
    );
}

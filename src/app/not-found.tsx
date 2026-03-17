export default function NotFound() {
    return (
        <main>
            <p aria-hidden>404</p>
            <h1>Siden finnes ikke</h1>
            <p>
                Siden du leter etter eksisterer ikke, eller har kanskje blitt flyttet.
            </p>
            <nav aria-label="Hjelpsomme lenker">
                <ul>
                    <li><a href="/">Forsiden</a></li>
                    <li><a href="/jokul">Jøkul</a></li>
                    <li><a href="/jokul/component">Komponenter</a></li>
                    <li><a href="/jokul/token">Designtokens</a></li>
                </ul>
            </nav>
        </main>
    );
}

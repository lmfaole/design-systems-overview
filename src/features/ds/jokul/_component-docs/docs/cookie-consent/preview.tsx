import {Button} from "@fremtind/jokul/button";
import {Flex} from "@fremtind/jokul/flex";
import {Link} from "@fremtind/jokul/link";

export function CookieConsentPreview() {
    return (
        <div
            style={{
                border: "1px solid var(--jkl-color-border-default, #ccc)",
                borderRadius: 4,
                maxWidth: 320,
                padding: "16px",
                width: "100%",
            }}
        >
            <Flex direction="column" gap="s">
                <strong>Får vi bruke valgfrie informasjonskapsler?</strong>
                <p style={{margin: 0, fontSize: "0.9em"}}>
                    Vi bruker anonym statistikk for å forstå hvordan løsningen brukes.
                </p>
                <p style={{margin: 0, fontSize: "0.9em"}}>
                    <Link href="https://www.fremtind.no/informasjonskapsler" target="_blank">
                        Les mer om informasjonskapsler
                    </Link>
                    .
                </p>
                <Flex gap="xs">
                    <Button variant="secondary">Ja, det er greit</Button>
                    <Button variant="secondary">Nei takk</Button>
                </Flex>
            </Flex>
        </div>
    );
}

export interface DesignSystem {
    /**
     * Navnet på designsystemet, for eksempel "Jøkul". Skal være unikt, da det brukes i URL-strukturen.
     */
    name: string;
    /**
     * Navnet på selskapet eller organisasjonen som eier designsystemet, for eksempel "Fremtind". Dette brukes kun i visningen og trenger ikke være unikt.
     */
    company: string;
    /**
     * En kort beskrivelse av designsystemet.
     */
    description: string;
    /**
     * URL til dokumentasjonen for designsystemet.
     */
    docs: string;
    /**
     * Navnet på npm-pakken hvis designsystemet er tilgjengelig som en åpen kildekode-pakke.
     */
    packageName?: string;
    /**
     * Angir om designsystemet er åpen kildekode.
     */
    openSource: boolean;
    /**
     * Eksterne lenker til designsystemets offisielle ressurser.
     */
    externalLinks: {
        frontPage: string;
        changelog: string;
        about: string;
    };
    /**
     * Statistikk om designsystemet, for eksempel antall komponenter. Dette er valgfritt og kan brukes til å vise ekstra informasjon på forsiden.
     * Eksempel: { components: 42 }
     * Statistikken må oppdateres manuelt, for eksempel ved å telle antall komponentdokumenter i Jøkul og sette dette tallet her.
     * Dette er ikke automatisk oppdatert, så det må vedlikeholdes for å være nøyaktig.
     */
    stats?: {
        components?: number;
        githubStars?: number;
        npmDownloads?: number;
    };
}

export const DESIGN_SYSTEMS: DesignSystem[] = [
    {
        name: "Jøkul",
        company: "Fremtind",
        description: "Fremtinds designsystem for produkter og tjenester.",
        docs: "/ds/jokul",
        packageName: "@fremtind/jokul",
        openSource: true,
        externalLinks: {
            frontPage: "https://jokul.fremtind.no/",
            changelog: "https://github.com/fremtind/jokul/releases",
            about: "https://jokul.fremtind.no/kom-i-gang/introduksjon/",
        },
    },
    {
        name: "Designsystemet",
        company: "Digdir",
        description: "Designsystemet er Digdirs designsystem for offentlige tjenester.",
        docs: "https://designsystemet.digdir.no/",
        packageName: "@digdir/designsystemet-web",
        openSource: true,
        externalLinks: {
            frontPage: "https://designsystemet.no/",
            changelog: "https://designsystemet.no/no/components/changelog/",
            about: "https://designsystemet.no/no/fundamentals/introduction/about-the-design-system/",
        },
    },
    {
        name: "Aksel",
        company: "Nav",
        description: "Navs designsystem for digitale tjenester.",
        docs: "https://aksel.nav.no/",
        packageName: "@navikt/ds-react",
        openSource: true,
        externalLinks: {
            frontPage: "https://aksel.nav.no/grunnleggende",
            changelog: "https://aksel.nav.no/grunnleggende/endringslogg",
            about: "https://aksel.nav.no/grunnleggende/introduksjon/hvordan-bruke-aksel/",
        },
    }
];

import type { FormatterDoc } from "./types";

const doc: FormatterDoc = {
    id: "format-date",
    name: "formatDate",
    package: "@fremtind/jokul/utilities",
    category: "Dato",
    description: {
        short: "Formaterer en Date til `dd.mm.yyyy`.",
        long: "formatDate er den enkleste datofunksjonen i Jøkul. Den tar en faktisk `Date` og returnerer en streng i det vanlige norske datoformatet `dd.mm.yyyy`.",
    },
    signature: "formatDate(date: Date): string",
    returnType: "string",
    keywords: ["dato", "dd.mm.yyyy", "date", "norwegian date"],
    notes: [
        "Funksjonen formatterer bare Date-objekter. Den parser ikke inputstrenger.",
        "Hvis du trenger masked input for dato i et skjema, bruk `registerWithMasks(...).registerWithDateMask`.",
    ],
    related: ["register-with-masks"],
    examples: [
        {
            title: "Formatter en Date-instans",
            code: `
import { formatDate } from "@fremtind/jokul/utilities";

formatDate(new Date("2026-03-21T00:00:00Z"));
            `,
            result: "21.03.2026",
        },
    ],
};

export default doc;

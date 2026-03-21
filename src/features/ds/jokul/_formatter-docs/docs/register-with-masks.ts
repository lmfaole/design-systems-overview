import type { FormatterDoc } from "./types";

const doc: FormatterDoc = {
    id: "register-with-masks",
    name: "registerWithMasks",
    package: "@fremtind/jokul/utilities",
    category: "Skjema",
    description: {
        short: "Kobler Jøkul-formatterne til React Hook Form som inputmasker.",
        long: "registerWithMasks er broen mellom formatteringsfunksjonene i Jøkul og React Hook Form. Du gir den `form`-objektet, og får tilbake `register`-varianter som formatterer input underveis mens den lagrede verdien holdes ryddig.",
    },
    signature: "registerWithMasks<T extends FieldValues>(form: UseFormReturn<T>)",
    returnType: "{ registerWithFodselsnummerMask, registerWithKortnummerMask, ... }",
    keywords: [
        "react-hook-form",
        "mask",
        "input mask",
        "registerWithFodselsnummerMask",
        "registerWithKortnummerMask",
        "registerWithKontonummerMask",
        "registerWithTelefonnummerMask",
        "registerWithDateMask",
        "registerWithNumber",
    ],
    helpers: [
        {
            name: "registerWithFodselsnummerMask",
            description: "Maskerer fødselsnummer mens brukeren skriver.",
        },
        {
            name: "registerWithKortnummerMask",
            description: "Maskerer kortnummer i grupper på fire.",
        },
        {
            name: "registerWithKontonummerMask",
            description: "Maskerer norske kontonumre i 4-2-5-format.",
        },
        {
            name: "registerWithTelefonnummerMask",
            description: "Maskerer norske telefonnumre.",
        },
        {
            name: "registerWithOrganisasjonsnummerMask",
            description: "Maskerer organisasjonsnummer i treblokker.",
        },
        {
            name: "registerWithDateMask",
            description: "Formatterer dato til `dd.mm.yyyy` under innskriving.",
        },
        {
            name: "registerWithNumber",
            description: "Formatterer tallinput og legger til `align: \"right\"` i returverdien.",
        },
    ],
    relatedExports: [
        {
            name: "registerWithFodselsnummerMask / registerWithKortnummerMask / registerWithKontonummerMask / registerWithTelefonnummerMask",
            description: "Eksisterer fortsatt som egne exports, men er deprecated. Foretrekk registerWithMasks.",
        },
    ],
    notes: [
        "Helperne bruker `setValueAs` til å fjerne whitespace før verdien lagres i React Hook Form.",
        "Maskingen holder også cursor-posisjonen så godt som mulig ved innsetting og sletting.",
        "registerWithNumber returnerer en ekstra `align: \"right\"`-verdi som kan brukes på input-komponenten.",
    ],
    related: [
        "format-fodselsnummer",
        "format-organisasjonsnummer",
        "format-kontonummer",
        "format-kortnummer",
        "format-telefonnummer",
        "format-date",
        "format-number",
    ],
    examples: [
        {
            title: "Opprett masker én gang per skjema",
            description: "Hent ut helperne fra `registerWithMasks(form)` og bruk dem der feltet deklareres.",
            code: `
import { registerWithMasks } from "@fremtind/jokul/utilities";
import { useForm } from "react-hook-form";

const form = useForm<{ telefon: string }>();
const { registerWithTelefonnummerMask } = registerWithMasks(form);

<input {...registerWithTelefonnummerMask("telefon")} />;
            `,
        },
        {
            title: "Formatter tallinput og høyrejuster feltet",
            code: `
import { registerWithMasks } from "@fremtind/jokul/utilities";
import { useForm } from "react-hook-form";

const form = useForm<{ belop: string }>();
const { registerWithNumber } = registerWithMasks(form);
const amountField = registerWithNumber("belop");

<input {...amountField} style={{ textAlign: amountField.align }} />;
            `,
        },
    ],
};

export default doc;

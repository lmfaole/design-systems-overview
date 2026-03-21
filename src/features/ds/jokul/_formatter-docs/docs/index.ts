import formatAvstandDoc from "./format-avstand";
import formatBytesDoc from "./format-bytes";
import formatDateDoc from "./format-date";
import formatFodselsnummerDoc from "./format-fodselsnummer";
import formatKontonummerDoc from "./format-kontonummer";
import formatKortnummerDoc from "./format-kortnummer";
import formatNumberDoc from "./format-number";
import formatOrganisasjonsnummerDoc from "./format-organisasjonsnummer";
import formatTelefonnummerDoc from "./format-telefonnummer";
import formatValutaDoc from "./format-valuta";
import parseNumberDoc from "./parse-number";
import registerWithMasksDoc from "./register-with-masks";
import type { FormatterDoc } from "./types";

export type { FormatterDoc, FormatterCategory, FormatterDescription, FormatterExample, FormatterOption, FormatterHelper, FormatterRelatedExport } from "./types";

export const formatterDocs: FormatterDoc[] = [
    formatAvstandDoc,
    formatBytesDoc,
    formatDateDoc,
    formatFodselsnummerDoc,
    formatKontonummerDoc,
    formatKortnummerDoc,
    formatNumberDoc,
    formatOrganisasjonsnummerDoc,
    formatTelefonnummerDoc,
    formatValutaDoc,
    parseNumberDoc,
    registerWithMasksDoc,
];

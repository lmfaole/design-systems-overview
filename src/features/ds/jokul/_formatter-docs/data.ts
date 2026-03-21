import { formatterDocs } from "./docs";
import type { FormatterCategory, FormatterDoc, FormatterDescription, FormatterExample, FormatterHelper, FormatterOption, FormatterRelatedExport } from "./docs";

export {
    formatterDocs,
    type FormatterCategory,
    type FormatterDoc,
    type FormatterDescription,
    type FormatterExample,
    type FormatterHelper,
    type FormatterOption,
    type FormatterRelatedExport,
};

const formatterDocById = new Map<FormatterDoc["id"], FormatterDoc>();
for (const doc of formatterDocs) {
    const existing = formatterDocById.get(doc.id);
    if (existing) {
        throw new Error(`Duplicate FormatterDoc id "${doc.id}" for "${existing.name}" and "${doc.name}"`);
    }
    formatterDocById.set(doc.id, doc);
}

export function getFormatterDoc(id: string): FormatterDoc | undefined {
    return formatterDocById.get(id as FormatterDoc["id"]);
}

export function getRelatedFormatterDocs(doc: FormatterDoc): FormatterDoc[] {
    return (doc.related ?? [])
        .map((id) => getFormatterDoc(id))
        .filter((candidate): candidate is FormatterDoc => Boolean(candidate));
}

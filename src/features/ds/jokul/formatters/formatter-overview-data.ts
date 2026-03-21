import { formatterDocs, type FormatterCategory, type FormatterDoc } from "@/features/ds/jokul/_formatter-docs/data";

interface FormatterCategoryMeta {
    id: string;
    label: FormatterCategory;
    description: string;
}

export interface FormatterOverviewGroup extends FormatterCategoryMeta {
    docs: FormatterDoc[];
}

const categoryMeta: FormatterCategoryMeta[] = [
    {
        id: "numbers",
        label: "Tall og enheter",
        description: "Formattere og parsere for beløp, avstander, bytes og andre tallverdier.",
    },
    {
        id: "date",
        label: "Dato",
        description: "Enkle hjelpearbeidere for visning av datoer i norske grensesnitt.",
    },
    {
        id: "identifiers",
        label: "Norske identifikatorer",
        description: "Masker og formattering for norske nummerformater som brukere kjenner igjen.",
    },
    {
        id: "forms",
        label: "Skjema",
        description: "Hjelpere som kobler formatteringene til React Hook Form i praksis.",
    },
];

export const formatterOverviewGroups: FormatterOverviewGroup[] = categoryMeta.map((group) => ({
    ...group,
    docs: formatterDocs
        .filter((doc) => doc.category === group.label)
        .sort((a, b) => a.name.localeCompare(b.name, "nb")),
}));

export const visibleFormatterCount = formatterDocs.length;

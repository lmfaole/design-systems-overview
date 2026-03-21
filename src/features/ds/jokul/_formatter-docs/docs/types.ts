export type FormatterCategory =
    | "Tall og enheter"
    | "Dato"
    | "Norske identifikatorer"
    | "Skjema";

export interface FormatterDescription {
    short: string;
    long: string;
}

export interface FormatterExample {
    title: string;
    description?: string;
    code: string;
    result?: string;
    resultLabel?: string;
}

export interface FormatterOption {
    name: string;
    type: string;
    description: string;
    defaultValue?: string;
}

export interface FormatterHelper {
    name: string;
    description: string;
}

export interface FormatterRelatedExport {
    name: string;
    description: string;
}

export interface FormatterDoc {
    id: string;
    name: string;
    package: string;
    category: FormatterCategory;
    description: FormatterDescription;
    signature: string;
    returnType: string;
    keywords?: string[];
    options?: FormatterOption[];
    helpers?: FormatterHelper[];
    relatedExports?: FormatterRelatedExport[];
    notes?: string[];
    related?: string[];
    examples: FormatterExample[];
}

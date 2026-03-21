export function getFormatterCardLabel(name: string) {
    if (name === "parseNumber") return "Parser";
    if (name === "registerWithMasks") return "React Hook Form";
    return "Formatter";
}

export function getFormatterImportStatement(name: string, packageName: string) {
    return `import { ${name} } from "${packageName}";`;
}

export function formatFormatterExampleResult(value: string) {
    return value.replaceAll("\\u00A0", "\u00A0");
}

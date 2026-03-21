import type { Migration, PropDef, PropStatus } from "@/features/ds/jokul/_component-docs/data";
import { commonProps } from "@/features/ds/jokul/_component-docs/docs/common-props";
import {
    extractFunctionParams,
    extractFunctionReturnType,
    isObjectLiteralType,
    parseObjectLiteralFields,
    summarizeObjectLiteralType,
} from "@/features/ds/jokul/_component-docs/components/PropTable/typeParsing";

export interface PropShapeEntry {
    name: string;
    type: string;
    optional: boolean;
    description?: string;
}

export interface PropTypeDetails {
    hasDetails: boolean;
    summary: string;
    rawType: string;
    params: PropShapeEntry[];
    returnType: string | null;
    objectFields: PropShapeEntry[];
    optionsFields: PropShapeEntry[];
    commonFields: PropShapeEntry[];
    commonLabel?: string;
}

export function sortProps(props: PropDef[]): PropDef[] {
    return props
        .map((prop, index) => ({ prop, index }))
        .sort((left, right) => {
            if (left.prop.required === right.prop.required) {
                return left.index - right.index;
            }

            return left.prop.required ? -1 : 1;
        })
        .map(({ prop }) => prop);
}

export function createMigrationAnchorMap(migrations: Migration[] = []): Map<string, string> {
    return new Map(migrations.map((migration) => [migration.deprecates.name, `#migration-${migration.deprecates.name}`]));
}

export function getPropStatusLabel(status: PropStatus): string {
    if (status === "experimental") {
        return "beta";
    }

    if (status === "deprecated") {
        return "deprecated";
    }

    return "—";
}

function isCallbackPropName(name: string): boolean {
    return /^on[A-Z]/.test(name);
}

function isFunctionLikeType(type: string): boolean {
    return (
        type.includes("=>") ||
        /\bEventHandler\b/.test(type) ||
        /\bChangeEventHandler\b/.test(type) ||
        /\bDispatch\b/.test(type) ||
        /\bSetStateAction\b/.test(type)
    );
}

function toShapeEntries(props: PropDef[]): PropShapeEntry[] {
    return props.map((prop) => ({
        name: prop.name,
        type: prop.type,
        optional: !prop.required,
        description: prop.description || undefined,
    }));
}

function objectTypeToShapeEntries(type: string): PropShapeEntry[] {
    return parseObjectLiteralFields(type).map((field) => ({
        name: field.name,
        type: field.type,
        optional: field.optional,
    }));
}

export function getPropTypeDetails(prop: PropDef): PropTypeDetails {
    const rawType = prop.type;
    const isCallback = isCallbackPropName(prop.name) || isFunctionLikeType(rawType);
    const isObject = isObjectLiteralType(rawType);
    const commonLabel =
        !isCallback && !isObject
            ? Object.keys(commonProps).find((key) => new RegExp(`\\b${key}\\b`).test(rawType))
            : undefined;
    const commonFields = commonLabel ? toShapeEntries(commonProps[commonLabel]) : [];

    const functionParams = isCallback ? extractFunctionParams(rawType) : [];
    const optionsParam = functionParams.find((param) => param.name === "options");
    const optionsCommonLabel = optionsParam
        ? Object.keys(commonProps).find((key) => new RegExp(`\\b${key}\\b`).test(optionsParam.type))
        : undefined;
    const optionsFields = optionsCommonLabel
        ? toShapeEntries(commonProps[optionsCommonLabel])
        : optionsParam && isObjectLiteralType(optionsParam.type)
            ? objectTypeToShapeEntries(optionsParam.type)
            : [];

    return {
        hasDetails: isCallback || isObject || commonFields.length > 0,
        summary: isCallback ? `${prop.name}()` : isObject ? summarizeObjectLiteralType(rawType) : commonLabel ?? rawType,
        rawType,
        params: functionParams
            .filter((param) => param.name !== "options")
            .map((param) => ({
                name: param.name,
                type: param.type,
                optional: param.optional,
            })),
        returnType: isCallback ? extractFunctionReturnType(rawType) : null,
        objectFields: isObject ? objectTypeToShapeEntries(rawType) : [],
        optionsFields,
        commonFields,
        commonLabel,
    };
}

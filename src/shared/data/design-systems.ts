export type DesignSystemScope = "project";

export interface DesignSystemStats {
    components?: number;
}

export interface DesignSystem {
    id: string;
    name: string;
    description: string;
    href: string;
    scope: DesignSystemScope;
    external?: boolean;
    stats?: DesignSystemStats;
}

export const DESIGN_SYSTEMS: DesignSystem[] = [
    {
        id: "jokul",
        name: "Jøkul",
        description: "Fremtinds designsystem for produkter og tjenester.",
        href: "/jokul",
        scope: "project",
    },
];

import type React from "react";

export interface PatternDoAndDontsItem {
    title: string;
    description: React.ReactNode;
    example: React.ReactNode;
}

export interface PatternDoAndDonts {
    use: PatternDoAndDontsItem[];
    avoid: PatternDoAndDontsItem[];
}

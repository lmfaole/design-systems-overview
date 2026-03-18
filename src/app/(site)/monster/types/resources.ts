import type React from "react";
import type { ResourcePublisher, ResourceRelevance } from "@/app/ds/jokul/_shared/components/ResourceList/types";

export interface PatternResource {
    title: string;
    href: string;
    publisher: ResourcePublisher;
    relevance: ResourceRelevance;
    description?: React.ReactNode;
}

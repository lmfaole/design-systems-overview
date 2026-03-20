import type React from "react";
import type { ResourcePublisher, ResourceRelevance } from "@/app/ds/_shared/resource-list/types";

export interface PatternResource {
    title: string;
    href: string;
    publisher: ResourcePublisher;
    relevance: ResourceRelevance;
    description?: React.ReactNode;
}

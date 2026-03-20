import type React from "react";
import type { ResourcePublisher, ResourceRelevance } from "@/components/ds/resource-list/types";

export interface PatternResource {
    title: string;
    href: string;
    publisher: ResourcePublisher;
    relevance: ResourceRelevance;
    description?: React.ReactNode;
}

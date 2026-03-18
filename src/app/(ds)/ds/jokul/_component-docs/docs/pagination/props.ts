import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "currentPage", type: "number", required: true, source: "custom", status: "stable", description: "Gjeldende sidenummer (1-basert)." },
        { name: "numberOfPages", type: "number", required: true, source: "custom", status: "stable", description: "Totalt antall sider." },
        { name: "onPageChange", type: "(toPage: number, fromPage: number) => void", required: true, source: "react", status: "stable", description: "Kalles ved sidebytte." },
        { name: "labels", type: '{ previous: string; next: string }', required: false, source: "custom", status: "stable", default: '{ previous: "Forrige", next: "Neste" }', description: "Tekster for forrige/neste-knapper." },
    ];

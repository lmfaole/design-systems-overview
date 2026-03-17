import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "Innholdet som skal layoutes." },
        { name: "direction", type: '"row" | "column" | "row-reverse" | "column-reverse"', required: false, source: "react", status: "stable", default: '"row"', description: "Retningen barn-elementene plasseres." },
        { name: "gap", type: 'Gap | Responsive<Gap>', required: false, source: "custom", status: "stable", default: '"m"', description: "Avstand mellom barn-elementene. Støtter både semantiske og statiske verdier, og kan være responsiv." },
        { name: "wrap", type: '"wrap" | "nowrap" | "reverse"', required: false, source: "custom", status: "stable", default: '"nowrap"', description: "Lar barn-elementene bryte over på ny linje." },
        { name: "alignItems", type: '"normal" | "start" | "center" | "end" | "baseline" | "stretch"', required: false, source: "custom", status: "stable", description: "Justering langs kryssaksen." },
        { name: "alignContent", type: '"normal" | "start" | "center" | "end" | "stretch" | "baseline" | "space-between" | "space-around" | "space-evenly"', required: false, source: "custom", status: "stable", description: "Fordeling av linjer langs kryssaksen når innholdet brytes." },
        { name: "justifyContent", type: '"normal" | "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly"', required: false, source: "custom", status: "stable", description: "Distribusjon langs hovedaksen." },
        { name: "textAlign", type: '"left" | "right" | "center"', required: false, source: "custom", status: "stable", description: "Justering av tekst inne i barn-elementene." },
        { name: "layout", type: 'Layout | Responsive<Layout>', required: false, source: "custom", status: "stable", description: "Jøkul-layout for jevn kolonnebredde. Kan være responsiv." },
        { name: "center", type: '"m" | "l" | "xl" | "2xl" | boolean', required: false, source: "custom", status: "stable", default: "false", description: "Sentrerer og begrenser innholdets bredde." },
        { name: "fill", type: "boolean", required: false, source: "custom", status: "stable", default: "false", description: "Lar Flex fylle tilgjengelig bredde." },
        { name: "inline", type: "boolean", required: false, source: "custom", status: "stable", default: "false", description: "Bruker inline-flex i stedet for flex." },
        { name: "as", type: "React.ElementType", required: false, source: "custom", status: "stable", default: '"div"', description: "HTML-elementtypen som rendres." },
        { name: "asChild", type: "boolean", required: false, source: "custom", status: "stable", description: "Rendrer som child-elementet og slår sammen props." },
    ];

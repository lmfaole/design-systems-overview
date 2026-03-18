import type { PropDef } from "../types";

export const props: PropDef[] = [
        {
            name: "placement",
            type: '"top" | "middle" | "bottom" | "full"',
            required: false,
            default: '"top"',
            source: "custom",
            status: "stable",
            description: "Posisjonen bildet har i kortet. Bestemmer hvilke sider som får negativ margin. top: øverst (negativ margin topp + sider). middle: mellom annet innhold (negativ margin kun sider). bottom: nederst (negativ margin bunn + sider). full: eneste innhold i kortet (negativ margin alle sider).",
        },
        {
            name: "as",
            type: "React.ElementType",
            required: false,
            default: '"img"',
            source: "custom",
            status: "stable",
            description: "Polymorf — bytt ut rotelementet. Bruk as=\"div\" med background-image for CSS-baserte bilder, eller as={NextImage} for optimerte bilder i Next.js.",
        },
        {
            name: "src",
            type: "string",
            required: false,
            source: "native",
            status: "stable",
            description: "Bildekilden. Sendes direkte til img-elementet.",
        },
        {
            name: "alt",
            type: "string",
            required: false,
            source: "native",
            status: "stable",
            description: "Alternativ tekst. Sett til tom streng (\"\") og legg til aria-hidden=\"true\" hvis bildet er dekorativt og kortets tittel allerede beskriver innholdet.",
        },
        {
            name: "className",
            type: "string",
            required: false,
            source: "react",
            status: "stable",
            description: "Egendefinerte CSS-klasser. Bruk til å sette høyde og object-fit.",
        },
    ];

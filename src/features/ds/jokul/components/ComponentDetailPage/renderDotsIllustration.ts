import { serializeStyle, tag } from "@/lib/html";

const DOT_COUNT = 120;

export function renderDotsIllustration() {
    const dots = Array.from({ length: DOT_COUNT }, (_, index) =>
        tag("div", "", {
            class: "component-detail-dot",
            style: serializeStyle({
                "--component-detail-dot-index": index,
            }),
        }),
    ).join("");

    return tag("div", dots, {
        class: "component-detail-dots",
        "aria-hidden": "true",
        style: serializeStyle({
            "--component-detail-dot-color": "var(--jkl-color-border-separator)",
            "--component-detail-dot-subdued": "var(--jkl-color-border-subdued)",
        }),
    });
}

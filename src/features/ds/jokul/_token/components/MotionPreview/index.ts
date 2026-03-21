import { serializeStyle, tag } from "@/lib/html";
import styles from "./MotionPreview.module.css";

interface MotionPreviewProps {
    timing: string;
    easing: string;
}

export function createMotionPreview({ timing, easing }: MotionPreviewProps): string {
    return tag(
        "div",
        tag("div", "", {
            class: styles.dot,
            style: serializeStyle({
                "--preview-timing": `var(${timing})`,
                "--preview-easing": `var(${easing})`,
            }),
        }),
        {
            class: styles.track,
            "aria-hidden": "true",
        },
    );
}

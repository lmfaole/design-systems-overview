import { Link } from "@fremtind/jokul/link";
import type { ComponentExampleProps } from "../types";

export function LinkPreview(props: ComponentExampleProps = {}) {
    const href = typeof props.href === "string" && props.href.trim() !== "" ? props.href : "#";
    const external = props.external === true;

    return <Link href={href} external={external}>Les mer om bilforsikring</Link>;
}

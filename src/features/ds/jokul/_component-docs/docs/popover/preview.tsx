import {Popover} from "@fremtind/jokul/popover";
import {Button} from "@fremtind/jokul/button";
import {Link} from "@fremtind/jokul/link";
import type {ComponentExampleProps} from "../types";

const popoverPlacements = [
    "top",
    "top-start",
    "top-end",
    "bottom",
    "bottom-start",
    "bottom-end",
    "left",
    "left-start",
    "left-end",
    "right",
    "right-start",
    "right-end",
] as const;

export function PopoverTriggerPreview() {
    return <PopoverBasicPreview/>;
}

export function PopoverContentPreview() {
    return (
        <Popover open={false} onOpenChange={() => undefined}>
            <Popover.Trigger asChild>
                <Button variant="secondary">Vis informasjon</Button>
            </Popover.Trigger>
            <Popover.Content padding={16}>
                <p style={{margin: 0}}>Her finner du mer informasjon om dette feltet.</p>
            </Popover.Content>
        </Popover>
    );
}

export function PopoverBasicPreview(props: ComponentExampleProps = {}) {
    const open = props.open === true;
    const placement = typeof props.placement === "string" && popoverPlacements.includes(props.placement as (typeof popoverPlacements)[number])
        ? (props.placement as (typeof popoverPlacements)[number])
        : "bottom-start";
    const strategy = props.strategy === "fixed" ? "fixed" : "absolute";
    const modal = props.modal !== false;
    const offset = typeof props.offset === "number" ? props.offset : 4;

    return (
        <Popover
            open={open}
            onOpenChange={() => undefined}
            placement={placement}
            strategy={strategy}
            modal={modal}
            offset={offset}
        >
            <Popover.Trigger asChild>
                <Button variant="secondary">Vis informasjon</Button>
            </Popover.Trigger>
            <Popover.Content padding={16}>
                <p style={{margin: 0}}>Her finner du mer informasjon om dette feltet.</p>
                <Link href="#">Les mer</Link>
            </Popover.Content>
        </Popover>
    );
}

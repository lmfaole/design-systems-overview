"use client";
import { SegmentedControl, SegmentedControlButton } from "@fremtind/jokul/segmented-control";

export function SegmentedControlButtonPreview() { return <SegmentedControlPreview />; }

export function SegmentedControlPreview() {
    return (
        <SegmentedControl legend="Velg periode" name="period-preview">
            <SegmentedControlButton value="dag" checked={false}>Dag</SegmentedControlButton>
            <SegmentedControlButton value="uke" checked={true}>Uke</SegmentedControlButton>
        </SegmentedControl>
    );
}

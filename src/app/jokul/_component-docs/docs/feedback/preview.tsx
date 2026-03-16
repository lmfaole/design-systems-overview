"use client";
import { Feedback } from "@fremtind/jokul/feedback";

export function FeedbackSmileyPreview() {
    const options = [1, 2, 3, 4, 5].map(n => ({ label: String(n), value: n }));
    return (
        <Feedback
            type="smiley"
            label="Var dette nyttig?"
            options={options}
            onSubmit={() => undefined}
        />
    );
}

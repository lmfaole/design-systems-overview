import { Card, CardImage } from "@fremtind/jokul/card";

export function CardImagePreview() {
    return (
        <Card style={{ maxWidth: 200, overflow: "hidden" }}>
            <CardImage src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=200&fit=crop" alt="Bil på vei" />
            <div style={{ padding: "var(--jkl-spacing-s)" }}>
                <p style={{ margin: 0, fontSize: "0.9em" }}>Bilforsikring</p>
            </div>
        </Card>
    );
}

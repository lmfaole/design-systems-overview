
import { PopupTip } from "@fremtind/jokul/tooltip";

export function PopupTipPreview() {
    return (
        <PopupTip
            content="Ekstra info om feltet"
            initialOpen={false}
            triggerProps={{ disabled: true }}
        />
    );
}

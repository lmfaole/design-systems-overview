
import { ToastProvider, useToast } from "@fremtind/jokul/toast";
import { Button } from "@fremtind/jokul/button";
import { Flex } from "@fremtind/jokul/flex";

function ToastProviderTrigger() {
    const { add } = useToast();

    return (
        <Button onClick={() => add("ToastProvider er aktiv", { variant: "info" })}>
            Vis toast
        </Button>
    );
}

export function ToastProviderPreview() {
    return (
        <ToastProvider placement="center">
            <Flex gap="s" alignItems="center">
                <ToastProviderTrigger />
            </Flex>
        </ToastProvider>
    );
}

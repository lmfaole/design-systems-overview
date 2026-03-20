import { FieldGroup } from "@fremtind/jokul/input-group";
import { Checkbox } from "@fremtind/jokul/checkbox";
import { Flex } from "@fremtind/jokul/flex";
import type { ComponentExampleProps } from "../types";

const labelVariants = ["small", "medium", "large"] as const;
type LabelVariant = (typeof labelVariants)[number];

export function FieldGroupExample(props: ComponentExampleProps) {
    const legend = typeof props.legend === "string" && props.legend.trim() !== "" ? props.legend : "Velg produkter";
    const description = typeof props.description === "string" && props.description.trim() !== "" ? props.description : undefined;
    const helpLabel = typeof props.helpLabel === "string" && props.helpLabel.trim() !== "" ? props.helpLabel : undefined;
    const errorLabel = typeof props.errorLabel === "string" && props.errorLabel.trim() !== "" ? props.errorLabel : undefined;
    const labelProps = typeof props.labelProps === "object" && props.labelProps !== null && !Array.isArray(props.labelProps)
        ? (props.labelProps as Record<string, unknown>)
        : undefined;
    const labelVariant = typeof labelProps?.variant === "string" && labelVariants.includes(labelProps.variant as LabelVariant)
        ? (labelProps.variant as LabelVariant)
        : undefined;
    const labelSrOnly = typeof labelProps?.srOnly === "boolean" ? labelProps.srOnly : undefined;
    const resolvedLabelProps = labelVariant || labelSrOnly !== undefined
        ? { ...(labelVariant ? { variant: labelVariant } : {}), ...(labelSrOnly !== undefined ? { srOnly: labelSrOnly } : {}) }
        : undefined;

    return (
        <Flex direction="column" gap="s">
            <FieldGroup
                legend={legend}
                description={description}
                labelProps={resolvedLabelProps}
                helpLabel={errorLabel ? undefined : helpLabel}
                errorLabel={errorLabel}
            >
                <Checkbox name="products" value="bil">Bil</Checkbox>
                <Checkbox name="products" value="bat">Båt</Checkbox>
                <Checkbox name="products" value="hjem">Hjem</Checkbox>
            </FieldGroup>
        </Flex>
    );
}

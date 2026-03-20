
import React from "react";
import { Flex } from "@fremtind/jokul/flex";
import { DataTable } from "@fremtind/jokul/table";
import { ProseCodeBlock } from "@/features/ds/jokul/_shared/components/CodeBlock";
import type { ScssMixin } from "@/features/ds/jokul/_token/posts/types";

interface ScssMixinSectionProps {
    mixins: ScssMixin[];
}

export function ScssMixinSection({ mixins }: ScssMixinSectionProps) {
    return (
        <Flex direction="column" gap="xl">
            {mixins.map((mixin) => (
                <Flex key={mixin.name} direction="column" gap="m">
                    <h3>{mixin.name}</h3>
                    <p>{mixin.description}</p>
                    {mixin.arguments && mixin.arguments.length > 0 && (
                        <DataTable
                            caption={`Argumenter: ${mixin.name}`}
                            columns={["Navn", "Type", "Påkrevd", "Beskrivelse"]}
                            rows={mixin.arguments.map((arg) => [
                                <code key={`${arg.name}-n`}>{arg.name}</code>,
                                <code key={`${arg.name}-t`}>{arg.type}</code>,
                                arg.optional ? "Nei" : "Ja",
                                (
                                    <span key={`${arg.name}-d`}>
                                        {arg.description}
                                        {arg.defaultValue && (
                                            <>
                                                {" "}
                                                <span className="muted">Standard:</span>{" "}
                                                <code>{arg.defaultValue}</code>
                                            </>
                                        )}
                                    </span>
                                ),
                            ])}
                        />
                    )}
                    {mixin.properties && mixin.properties.length > 0 && (
                        <DataTable
                            caption={`Påvirker / setter: ${mixin.name}`}
                            columns={["CSS", "Beskrivelse"]}
                            rows={mixin.properties.map((prop) => [
                                <code key={`${prop.name}-n`}>{prop.name}</code>,
                                prop.description,
                            ])}
                        />
                    )}
                    <ProseCodeBlock code={mixin.example} />
                </Flex>
            ))}
        </Flex>
    );
}

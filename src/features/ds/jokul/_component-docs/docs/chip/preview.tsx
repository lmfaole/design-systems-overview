import { Chip } from "@fremtind/jokul/chip";
import { Flex } from "@fremtind/jokul/flex";

export function ChipPreview() {
    return (
        <Flex gap="xs">
            <Chip variant="filter" selected>Bil</Chip>
            <Chip variant="filter">Båt</Chip>
            <Chip variant="filter">Hjem</Chip>
        </Flex>
    );
}

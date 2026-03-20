import { Search } from "@fremtind/jokul/search";

export function SearchButtonPreview() { return <SearchPreview />; }

export function SearchPreview() {
    return (
        <Search label="Søk" name="q">
            <Search.Button label="Søk" />
        </Search>
    );
}

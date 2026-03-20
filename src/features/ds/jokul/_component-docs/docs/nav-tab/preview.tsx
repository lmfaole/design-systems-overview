import {NavTab, NavTabs} from "@fremtind/jokul/tabs";

export function NavTabsPreview() {
    return <NavTabPreview/>;
}

export function NavTabPreview() {
    return (
        <NavTabs aria-label="Eksempel">
            <NavTab href="#" aria-selected={true}>Bil</NavTab>
            <NavTab href="#" aria-selected={false}>Hus</NavTab>
            <NavTab href="#" aria-selected={false}>Reise</NavTab>
            <NavTab href="#" aria-selected={false}>Båt</NavTab>
        </NavTabs>
    );
}

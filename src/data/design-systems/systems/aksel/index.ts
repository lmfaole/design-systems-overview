import type { DesignSystem } from "../../types";
import { akselCatalog } from "./catalog";
import { akselInstallGuides } from "./install";
import { akselLocalDocumentation } from "./local-documentation";
import { akselMetadata } from "./metadata";
import { akselPackages } from "./packages";

const aksel: DesignSystem = {
    ...akselMetadata,
    packages: akselPackages,
    installGuides: akselInstallGuides,
    catalog: akselCatalog,
    localDocumentation: akselLocalDocumentation,
};

export default aksel;

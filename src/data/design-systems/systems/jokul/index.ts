import { assertValidDesignSystemLocalDocs } from "../../validation";
import type { DesignSystem } from "../../types";
import { jokulCatalog } from "./catalog";
import { jokulLocalDocs } from "./docs";
import { jokulInstallGuides } from "./install";
import { jokulLocalDocumentation } from "./local-documentation";
import { jokulMetadata } from "./metadata";
import { jokulPackages } from "./packages";

const jokul: DesignSystem = {
    ...jokulMetadata,
    packages: jokulPackages,
    installGuides: jokulInstallGuides,
    catalog: jokulCatalog,
    localDocumentation: jokulLocalDocumentation,
};

assertValidDesignSystemLocalDocs(jokul, jokulLocalDocs);

export default jokul;

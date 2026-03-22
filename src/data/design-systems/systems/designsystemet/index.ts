import type { DesignSystem } from "../../types";
import { designsystemetCatalog } from "./catalog";
import { designsystemetInstallGuides } from "./install";
import { designsystemetMetadata } from "./metadata";
import { designsystemetPackages } from "./packages";

const designsystemet: DesignSystem = {
    ...designsystemetMetadata,
    packages: designsystemetPackages,
    installGuides: designsystemetInstallGuides,
    catalog: designsystemetCatalog,
};

export default designsystemet;

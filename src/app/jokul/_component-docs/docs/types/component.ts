import type React from "react";
import type { PropDef } from "./prop";
import type { Migration } from "./migration";
import type { ComponentId } from "./ids";

/**
 * Complete documentation record for a single Jøkul component.
 * One file per component under `src/app/jokul/_component-docs/docs/`.
 */
export type ComponentStatus = "stable" | "beta" | "deprecated";

/**
 * Complexity rating scale.
 */
export type ComponentComplexityRating = "easy" | "medium" | "hard";

/**
 * Optional explanation for a complexity rating.
 */
export interface ComponentComplexityNotes {
    /**
     * Why the component is rated as it is for usage in apps.
     */
    use?: string;
    /**
     * Why the component is rated as it is for maintenance in Jøkul.
     */
    maintenance?: string;
}

/**
 * Complexity ratings for a component.
 *
 * - `use` — How hard it is to implement and use correctly in an app (state handling, edge cases, a11y).
 * - `maintenance` — How hard it is to maintain and evolve in Jøkul (internal complexity).
 */
export interface ComponentComplexity {
    use: ComponentComplexityRating;
    maintenance: ComponentComplexityRating;
    /**
     * Optional notes explaining the rating.
     */
    notes?: ComponentComplexityNotes;
}

export interface ComponentExampleProps {
    [key: string]: unknown;
}

/**
 * Supported example control values.
 */
export type ComponentExampleControlValue = string | number | boolean | null | undefined;
export type ComponentExampleControlArrayValue = Array<Exclude<ComponentExampleControlValue, undefined>>;

/**
 * Optional condition for showing a control, based on another control's value.
 */
export type ComponentExampleControlCondition = {
    name: string;
    value?:
        | ComponentExampleControlValue
        | ComponentExampleControlValue[]
        | ComponentExampleControlArrayValue;
    /**
     * Comparison operator for visibility checks.
     * Defaults to "equals" when omitted.
     *
     * - "equals" — matches value or any value in arrays
     * - "notEquals" — inverse of equals
     * - "exists" — true when a value is present (not null/undefined)
     * - "truthy" — true for truthy values (arrays with length > 0)
     */
    operator?: "equals" | "notEquals" | "exists" | "truthy";
};

/**
 * Select options for example controls.
 */
export type ComponentExampleSelectOption =
    | string
    | { label: string; value: Exclude<ComponentExampleControlValue, undefined> };

/**
 * Declarative example controls for component pages.
 */
export type ComponentExampleControl =
    | {
          name: string;
          kind: "boolean";
          defaultValue?: boolean;
          visibleWhen?: ComponentExampleControlCondition;
      }
    | {
          name: string;
          kind: "select";
          options: readonly ComponentExampleSelectOption[];
          defaultValue?: Exclude<ComponentExampleControlValue, undefined>;
          visibleWhen?: ComponentExampleControlCondition;
      }
    | {
          name: string;
          kind: "multiselect";
          options: readonly ComponentExampleSelectOption[];
          defaultValue?: ComponentExampleControlArrayValue;
          visibleWhen?: ComponentExampleControlCondition;
      }
      | {
          name: string;
          kind: "json";
          defaultValue?: string;
          placeholder?: string;
          rows?: number;
          /**
           * Optional list of allowed values for JSON map entries.
           * When provided, values render as a select with these options.
           * Recommended for fixed-key maps to keep values valid and scannable.
           */
          valueOptions?: readonly ComponentExampleSelectOption[];
          /**
           * When true, the key column is read-only to prevent invalid structures.
           * Commonly paired with `valueOptions` so keys act as labels.
           */
          keyReadOnly?: boolean;
          visibleWhen?: ComponentExampleControlCondition;
      }
    | {
          name: string;
          kind: "text";
          defaultValue?: string;
          placeholder?: string;
          visibleWhen?: ComponentExampleControlCondition;
      }
    | {
          name: string;
          kind: "number";
          defaultValue?: number;
          min?: number;
          max?: number;
          step?: number;
          placeholder?: string;
          visibleWhen?: ComponentExampleControlCondition;
      };

/**
 * Fine-tuning for auto-generated example controls.
 */
export interface ComponentExampleControlsConfig {
    /**
     * Only generate controls for these prop names (optional).
     */
    include?: string[];
    /**
     * Never generate controls for these prop names (optional).
     */
    exclude?: string[];
    /**
     * Overrides for generated controls, keyed by prop name.
     * Use this to tweak defaults, change control kind, or add options.
     */
    overrides?: Record<string, Partial<ComponentExampleControl>>;
    /**
     * Optional ordering of generated controls; listed names are moved to the front in this order.
     */
    order?: string[];
}

export interface ComponentDoc {
    /**
     * Unique kebab-case identifier matching the URL segment, e.g. `"text-input"`.
     * Must be a registered value in {@link ComponentId} — add it to `types/ids.ts`
     * when creating a new component doc.
     */
    id: ComponentId;

    /**
     * Human-readable display name with normal casing and spaces,
     * e.g. `"Text Input"`, `"Expandable Panel"`.
     * This is shown in cards, headings and the site header dropdown.
     */
    name: string;

    /**
     * The npm package path used to import the component,
     * e.g. `"@fremtind/jokul/text-input"`.
     */
    package: string;

    /**
     * Primary navigation category that determines where the component appears
     * in the site header dropdown and the component listing page.
     *
     * - `"Skjema"`         — Form inputs (TextInput, Select, Checkbox, …)
     * - `"Handling"`       — Action triggers (Button, Chip, Toggle Switch, …)
     * - `"Visning"`        — Content display (Card, Table, Tag, Icon, …)
     * - `"Navigasjon"`     — Navigation (Breadcrumb, Link, Tabs, Pagination, …)
     * - `"Overlegg"`       — Floating/overlay elements (Modal, Popover, Tooltip, Toast, …)
     * - `"Tilbakemelding"` — Status and feedback (Message, Loader, Skeleton, …)
     * - `"Layout"`         — Structural and utility (Flex, Screen Reader Only)
     */
    category: "Layout" | "Skjema" | "Handling" | "Tilbakemelding" | "Navigasjon" | "Visning" | "Overlegg";

    /**
     * Lifecycle status of the component as a whole.
     *
     * - `"stable"`     — Default. Production-ready.
     * - `"beta"`       — Functional but API may change.
     * - `"deprecated"` — Will be removed. Add a migration note in the doc description.
     */
    status: ComponentStatus;

    /**
     * Complexity ratings for this component.
     */
    complexity: ComponentComplexity;

    /**
     * Set to `false` to hide this doc from the component overview page (and other
     * top-level component listings).
     *
     * Defaults to `true` when omitted.
     *
     * Typical use:
     * - subcomponents (e.g. TabList, TableRow)
     * - providers / required wrappers (e.g. ToastProvider)
     */
    showOnOverview?: false;

    /**
     * Descriptions in two lengths so the UI can pick the right density.
     */
    description: {
        /**
         * A short, scannable description used in cards and page headers.
         * Should answer: "Why would I reach for this?"
         * Avoid restating the component name.
         *
         * Keep it very short (around 10 words).
         */
        short: string;

        /**
         * A longer description used when you need more context than fits in a card.
         * Should still be to the point, but can include key constraints or typical use cases.
         */
        long: string;
    };

    /**
     * Small, static React element shown in the component card on the listing page
     * and in the page header. Should be compact (fits ~200×120px) and visually representative.
     *
     * **Keep previews side-effect free and static.**
     * Do not use `useState`, `useEffect`, or hover-triggered animation here.
     * Previews render in lists and should never open portals or run timers.
     */
    preview: React.ReactNode;

    /**
     * Bespoke example for the component page.
     *
     * This is the place for richer or more realistic usage that does NOT fit
     * in the compact preview. It should be tailored for the component page and
     * not reused in cards or overviews.
     *
     * Use the function form to receive simple, page-level controls (e.g. disabled).
     *
     * Optional — omit when no example is needed.
     */
    example?: React.ReactNode | ((props: ComponentExampleProps) => React.ReactNode);

    /**
     * Optional prop controls shown in the example toolbar.
     * Each control maps 1:1 with a prop name and passes the typed value to the example render function.
     *
     * When omitted, the component page auto-generates controls from {@link ComponentDoc.props}
     * for common, simple prop types (boolean, string, number, literal unions).
     * Set an empty array to explicitly show no controls.
     */
    exampleControls?: ComponentExampleControl[];
    /**
     * Optional config for auto-generated example controls.
     * Only used when {@link ComponentDoc.exampleControls} is omitted.
     */
    exampleControlsConfig?: ComponentExampleControlsConfig;

    /**
     * Props accepted directly on the root component element.
     * Each entry follows the {@link PropDef} shape.
     * List all non-trivial props. Native HTML attribute pass-throughs (e.g. `className`,
     * `id`, `aria-*`) only need to be listed if they have special behaviour in this component.
     */
    props: PropDef[];

    /**
     * API migration guides for deprecated props or components.
     * Each entry follows the {@link Migration} shape and is self-contained with before/after code.
     * Rendered in a dedicated "Migrering" section on the component page.
     * Omit for components with no deprecated APIs.
     */
    migrations?: Migration[];

    relationships?: ComponentRelationships;
}

/**
 * A single relationship entry — an ID plus a human-readable description
 * of why/how the two components relate.
 */
export interface ComponentRelationship {
    id: ComponentId;
    /** One sentence describing the relationship, e.g. "Use CheckboxPanel when you need a larger click target with an embedded label." */
    description: string;
}

/**
 * Relationships to other components, grouped by kind.
 *
 * ## Choosing the right bucket
 *
 * | Field           | Question to ask                                              | Example                          |
 * |-----------------|--------------------------------------------------------------|----------------------------------|
 * | `alternatives`  | "Could the user pick THIS instead of the current component?" | Checkbox → CheckboxPanel         |
 * | `subcomponents` | "Is this a named child that lives INSIDE the current one?"   | Card → CardImage, Tabs → TabList |
 * | `related`       | "Is this commonly used ALONGSIDE the current component?"     | TextInput → Label, Help          |
 *
 * A component that is a **subcomponent** of another should NEVER appear in `alternatives`.
 * It should also have `showOnOverview: false` on its own doc so it is hidden from the overview.
 */
export interface ComponentRelationships {
    /**
     * Other components the user could choose instead of this one to solve the same problem.
     * These must be independent, top-level components — never a child/subcomponent.
     *
     * @example Checkbox → CheckboxPanel, Select → Combobox
     */
    alternatives?: ComponentRelationship[];

    /**
     * Components that must wrap or be set up around this component for it to work.
     * Typical use: context providers (e.g. ToastProvider for useToast()).
     *
     * These are not subcomponents (they don't render *inside*), and not alternatives.
     */
    requires?: ComponentRelationship[];

    /**
     * Named child components that are part of this component's API and render *inside* it.
     * They are not interchangeable alternatives — they extend or compose this component.
     * Any component listed here should also have `showOnOverview: false` on its own doc.
     *
     * @example Card → CardImage, Tabs → TabList, Popover → Popover.Trigger
     */
    subcomponents?: ComponentRelationship[];

    /**
     * Independent components that are frequently used alongside this one,
     * or that this component is typically embedded within.
     *
     * @example TextInput → Label, CheckboxPanel → Checkbox
     */
    related?: ComponentRelationship[];
}

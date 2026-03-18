import type React from "react";
import type {
  ResourcePublisher,
  ResourceRelevance,
} from "@/app/ds/jokul/_shared/components/ResourceList/types";

export interface TokenResource {
  title: string;
  url: string;
  publisher?: ResourcePublisher;
  relevance?: ResourceRelevance;
  description?: React.ReactNode;
}

export interface TokenTable {
  /** Optional h3 heading rendered above this table */
  heading?: string;
  /** Short description shown between the heading and the table */
  description?: string;
  caption: string;
  columns: string[];
  rows: React.ReactNode[][];
}

export interface ScssMixin {
  /** Mixin or function name, e.g. "text-style" */
  name: string;
  /** One-line description of what it does */
  description: string;
  /** SCSS usage example shown in a code block */
  example: string;
  /**
   * Arguments the mixin/function accepts.
   *
   * Use SCSS names (e.g. "$size") and include "@content" when the mixin wraps a content block.
   */
  arguments?: ScssMixinArgument[];
  /**
   * What the mixin outputs/affects in CSS (properties/variables/selectors).
   *
   * Keep this concrete (e.g. "transition-duration", "--my-var", "@media (forced-colors: active)").
   */
  properties?: ScssMixinProperty[];
}

export interface ScssMixinArgument {
  /** Argument name, e.g. "$style", "$min", "@content" */
  name: string;
  /** SCSS-ish type, e.g. "string", "number", "length", "block", "string | null" */
  type: string;
  /** Short explanation of what the argument does */
  description: string;
  /** True when the argument is optional (or has a default) */
  optional?: boolean;
  /** Default value when relevant (display only) */
  defaultValue?: string;
}

export interface ScssMixinProperty {
  /** CSS property, CSS variable, or selector the mixin affects */
  name: string;
  /** Short explanation of what is set/why it matters */
  description: string;
}

export interface TokenPost {
  id: number;
  title: string;
  excerpt: string;
  /** Structured token reference tables rendered after the header, before content */
  tokenOverview?: TokenTable[];
  /** SCSS mixins relevant to this foundation area */
  scssSection?: ScssMixin[];
  /** Optional inline illustration rendered as the card hero. Replaces image URL. */
  illustration?: React.ReactNode;
  /** IDs of component docs directly related to this token area */
  relatedComponents?: string[];
  resources?: TokenResource[];
}

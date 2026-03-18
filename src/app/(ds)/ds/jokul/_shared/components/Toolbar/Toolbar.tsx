import "./toolbar.scss";

interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: React.ElementType;
}

/**
 * Toolbar lays out filter controls in a horizontal row — a search field that
 * stretches to fill available space, followed by any number of fixed-width
 * secondary controls (selects, buttons).
 *
 * The first child always grows; all subsequent children are sized to their
 * content. On narrow viewports the layout switches to a single column.
 *
 * @example
 * <Toolbar>
 *     <Search label="Søk" value={q} onChange={…} />
 *     <Select label="Kategori" name="cat" items={…} />
 *     <Select label="Sorter" name="sort" items={…} />
 * </Toolbar>
 */
export function Toolbar({ as: Tag = "div", className, children, ...rest }: ToolbarProps) {
    return (
        <Tag className={["toolbar", className].filter(Boolean).join(" ")} {...rest}>
            {children}
        </Tag>
    );
}

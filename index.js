/**
 * Host half of the session-topics-tree bundle.
 *
 * The feature lives entirely in the browser: the Client half replaces the
 * sidebar browsing region with a Workspace -> topic group -> Session tree and
 * keeps its groups in browser storage. No Host service, Tool, or session event
 * is involved, so this entry only exists so the bundle has a plugin row whose
 * Client half the roster loads.
 */
export function apply() {}

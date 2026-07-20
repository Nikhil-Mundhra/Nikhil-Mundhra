---
name: klara-suggestions
description: Guidelines and architectural rules for debugging, modifying, or extending the Klara Suggestion Cards (SuggestionsTab.tsx) and Office.js integration (word-context.ts). Use this skill when working on the frontend Word add-in taskpane.
when_to_use: "When working on or debugging the Klara Suggestion Cards frontend and Office.js integration."
allowed-tools: Read, Glob, Grep, Bash, Write, Edit
---

# Klara Suggestion Cards & Word Add-in Architecture

When working on the Klara Word Add-in frontend (specifically the Suggestions tab and text modification features), you must adhere to the following architectural boundaries and state management rules to prevent UI flickering, ghosting, and Office.js sync errors.

## 1. Separation of Concerns (React vs. Office.js)
*Note: The frontend code and its `node_modules` (including Office.js typings) are housed in the `KlaraApp\frontend\` directory.*
- **`SuggestionsTab.tsx` (React):** Responsible *only* for rendering the UI and passing user intent to the custom hooks.
- **`hooks/useFindingsActions.ts` (React State):** Contains the handlers (`handleAccept`, `handleReject`, etc.), handles optimistic state updates, and orchestrates calls to the backend (`qcApi`) and Office.js layer.
  - **NEVER** import `Word` directly or call `context.sync()` inside React components or hooks.
- **`word/` directory (Office.js Layer):** The only place where Microsoft Office JS API calls are allowed (e.g., `formatting.ts`, `replace.ts`, `tracking.ts`). It encapsulates all `Word.run`, paragraph iterations, and text search loops, returning standardized results back to the React layer.

## 2. Optimistic UI Updates (Anti-Ghosting)
Klara's backend updates are slower than the UI interactions. If you rely solely on React Query's cache invalidation (`onRefresh()`), the suggestion cards will flicker back to an "open" state before disappearing.
- **Rule:** Before calling `onRefresh()`, you **MUST** optimistically update the local state sets.
- **Implementation:** 
  ```typescript
  setAcceptedIds(prev => new Set(prev).add(finding.id));
  setRejectedIds(prev => { const next = new Set(prev); next.delete(finding.id); return next; });
  setCommentedIds(prev => { const next = new Set(prev); next.delete(finding.id); return next; });
  ```
- **Cleanup:** For features involving local drafts (like inline editing), ensure you call cleanup functions (e.g., `clearEdit(finding.id)`) inside the success path of the handler *before* `onRefresh()`, not outside of it where it might execute before the `await` finishes.

## 3. The Fallback Pattern (Paragraph Index vs. Global Search)
Because Word documents can have duplicate text, surgical precision is preferred. However, text can shift.
- **Rule:** All modification functions in the `word/` directory (like `replace.ts` and `formatting.ts`) must attempt to use `finding.paragraph_index` first.
- **Fallback:** If `paragraph_index` is missing, or the exact text is no longer found at that index, the function must gracefully fall back to a global document search (e.g., `body.search(text)`).
- **Search Implementation Rule:** NEVER use strict string matching (e.g., `paragraph.text.includes()`) to verify or find text. Word strips list numbers and transforms whitespace (like TOC dot-leaders). You **MUST** use the `searchWithVariations()` helper to leverage Word's native, formatting-resilient search API.
- **Example Flow:** Try `replaceTextInParagraph` -> If fails/not found -> Try `replaceText`.

## 4. Simulated Tracked Changes vs. Comments
Klara doesn't just use standard Word comments for everything. 
- **Standard Comment:** Added when a finding has no text replacement (e.g., a general warning). Uses `createKlaraComment`.
- **Simulated Tracked Change:** When a user clicks "Comment" on a finding *with* a proposed replacement, Klara simulates "Track Changes". It applies strikethrough (red) to the original text, appends the replacement text (green/underlined), and attaches a Word comment explaining the change.
- **Rule:** Do not break or bypass the simulated tracked change logic in `handleComment`. It is a core feature for legal users who want to review changes inline before accepting them.

## 5. Editing Replacements (Effective Findings)
When the user edits a suggestion card inline, the handlers (`handleAccept`, etc.) should not be polluted with edit state parameters.
- **Rule:** Derive an `effectiveFinding` object at render time inside `.map()` loops. This object merges the base finding with any in-progress edits (overwriting `replacement_text`), and can also inject missing data (like `formatting_fix` for layout rules). 
- Pass this `effectiveFinding` to the standard handlers in `useFindingsActions.ts` so the downstream `word/` scripts and backend API endpoints inherently receive the user's tweaked text without needing structural changes.

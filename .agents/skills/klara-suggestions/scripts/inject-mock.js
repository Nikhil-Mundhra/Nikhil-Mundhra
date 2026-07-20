/**
 * inject-mock.js
 * 
 * This is a standalone script meant to be copied and pasted into the Chrome DevTools 
 * console of the Word Taskpane, OR dispatched via a local dev server.
 * 
 * Usage:
 * Paste this script into the console when the React app is running. It dispatches 
 * a CustomEvent that the frontend can listen to (if in DEV mode) to instantly inject 
 * a mock finding into the UI without needing to hit the Python backend.
 * 
 * Note: To use this, you must add a temporary event listener in `SuggestionsTab.tsx` 
 * that listens for 'klara-inject-mock' and appends `e.detail` to the findings array.
 */

const mockFinding = {
    id: "mock_" + Date.now(),
    status: "open",
    severity: "major",
    rule_name: "Mock Injection",
    title: "This is a live-injected mock finding",
    description: "Use this to test UI features like inline editing and severity colors.",
    original_text: "The mock original text",
    replacement_text: "The mock replacement text",
    suggested_fix: "The mock replacement text",
    paragraph_index: 0,
    type: "terminology",
    formatting_fix: null
};

console.log("Injecting Klara Mock Finding:", mockFinding);
window.dispatchEvent(new CustomEvent('klara-inject-mock', { detail: mockFinding }));

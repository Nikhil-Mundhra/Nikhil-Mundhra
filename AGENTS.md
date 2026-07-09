# Global Agent Directives
**START HERE FOR EVERY REQUEST:**
Before taking ANY action or answering ANY question, you MUST first explicitly evaluate if Graphify or Docmancer are relevant to the request:
1. **Internal Map (Graphify):** Does this require understanding the codebase architecture, file locations, or what the next implementation steps are? If yes, check the `graphify-out/` graph or use Graphify (`/graphify query`, `/graphify path`) to orient yourself.
2. **External Guide (Docmancer):** Does this involve external libraries, APIs, or specific framework rules? If yes, use Docmancer (`docmancer query`) to retrieve the correct syntax and rules.
Only after you have established your internal and external bearings should you proceed with execution.
---
## Subagent Delegation (Parallel vs Sequential)
When assigned multiple features or bugs in a single request, you MUST decide between parallel delegation and sequential execution based on codebase overlap:
1. **Parallel Delegation (`self` subagents):** Highly beneficial for naturally isolated tasks (e.g., one agent works on frontend UI, one works on the backend database, one writes documentation). Spawn multiple `self` subagents (using `invoke_subagent`) to tackle these simultaneously.
2. **Sequential Execution (Single agent):** Detrimental for heavily intertwined tasks modifying the same files. For overlapping code changes, it is faster and safer to just knock them out sequentially yourself, ensuring you maintain the full context of the ongoing changes and avoid merge conflicts.

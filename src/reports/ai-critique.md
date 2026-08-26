# AI Critique

AI accelerated the creation of the Playwright setup, test data, and feature scripts, but the first outputs were not reliable enough to submit without review. The generated FR-01 script assumed that visible labels were associated with their inputs. The SUT labels were plain text, so `getByLabel()` timed out until the script was changed to use the stable textbox order. The first FR-07 implementation also inferred a product card from heading position and navigated with `page.goto()`, which discarded the in-memory React cart state. FR-18 initially selected rows using an incorrect ID format and reused mutable order fixtures across cases.

These omissions occurred because the AI reasoned from the requirement and common UI conventions rather than inspecting the actual DOM, React context, and seed database. It also treated generated test data as authoritative before checking the SUT's real seed products and validation behavior. Human review of source code, browser output, traces, and API responses was therefore necessary to separate locator defects from product defects.

The main lesson is that AI-generated automation is a draft, not test evidence. A useful workflow is to inspect the implementation, run small probes, isolate test state, and preserve failures that expose a real requirement mismatch. External JSON improves maintainability, but it does not guarantee a valid oracle; expected labels, messages, and controls still need to be checked against the specification and documented when the SUT differs.

`[TODO: add the student's final reflection and confirm this text is 200–300 words.]`

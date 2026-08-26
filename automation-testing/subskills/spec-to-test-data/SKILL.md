---
name: spec-to-test-data
description: Use when converting feature requirements and an unfamiliar web application's behavior into external, traceable test data.
---

# Specification to Test Data

## Procedure

1. Read the requirement, acceptance criteria, existing tests, routes, and relevant UI/API implementation.
2. Build a feature matrix covering positive, negative, boundary, security, authorization, empty-state, and state-transition behavior as applicable.
3. Store one dataset per feature in JSON or CSV outside the spec. Each case should have a stable `id`, `title`, `action/input`, and `expected` object. Keep product IDs, user roles, order IDs, and fixture references in the dataset.
4. Record the oracle source: requirement, observed DOM, API contract, or fixture. If they disagree, retain the requirement as expected behavior and flag the mismatch for the report.
5. Validate JSON syntax, required fields, unique case IDs, and minimum case count before writing a spec.

Example:

```json
{
  "feature": "checkout",
  "testCases": [{
    "id": "CHK_001",
    "input": {"productId": "p-1"},
    "expected": {"url": "/cart", "checkoutEnabled": true}
  }]
}
```

Do not copy a product list from memory: resolve IDs/names against the project's seed/API. Do not silently remove cases because a control is absent; mark them as unsupported and explain the product gap.

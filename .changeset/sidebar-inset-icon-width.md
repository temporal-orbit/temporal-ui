---
"@temporal-ui/core": patch
"@temporal-ui/react": patch
"@temporal-ui/solid": patch
---

Fix invalid `calc()` for sidebar gap and container when `variant` is `inset` or `floating` and `collapsible` is `icon`, so the collapsed rail width is applied and main content no longer slides under the sidebar.

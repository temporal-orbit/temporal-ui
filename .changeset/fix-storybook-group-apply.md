---
"@temporal-ui/react": patch
"@temporal-ui/solid": patch
"@temporal-ui/core": patch
---

Move Tailwind `group` from DateInput CSS `@apply` to `DateInputControl` markup so Storybook/Vite and Tailwind v4 compile core styles without "unknown utility class `group`".

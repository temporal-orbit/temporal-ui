# Linear issues

Last updated: June, 30th, 2026

When given a Linear issue ID (e.g. `TPX-123`), agents must follow below instructions. When beginning work on an issue, always set its status to "Development" - even if it’s already in Review or any other status.

## Preparation for the task

Read the ticket description and all comments end-to-end before writing any code.

A Linear ticket is a **request, not a spec.** It surfaces a problem and proposes a solution direction — suggested names, file paths, data structures, triggers, and infrastructure choices reflect the author's intent, not necessarily the current state of the codebase. As the implementer with full source access, you own the implementation details. Treat the problem statement and proposed solution as a general direction, then critically assess them against the actual codebase and product specifics before committing to a plan:

- **Verify the ticket's assumptions against the code** — event payloads, existing helpers, data models, domain boundaries, what already exists vs. what is claimed. Do not take "we need a new X" at face value if an existing Y already covers it; do not trust a described trigger model or field shape without confirming it in the source.
- **Improve whatever is suboptimal** — naming, file paths, construct structure, trigger model, scope, and even whether the work is worth doing at all. The ticket's wording is a suggestion, not a constraint.
- **Fill gaps from the codebase** when the ticket's framing is incomplete or wrong, rather than working around them or inventing ungrounded behavior.

If you change the intended direction — different naming, different paths, a different architectural approach, or a scope change — **leave a comment on the Linear issue** explaining what you changed and why, so the author and reviewers can follow. If the plan drifts materially from the description, update the ticket via the Linear MCP tools and note the edit in a comment.

## Before starting with the task

Complete all items below before starting implementation.

[ ] **Add a starting comment**. Post a comment on the issue with the implementation plan, technical details, and any notes you want to highlight.
[ ] **Set status to "Development"** — Always move the Linear issue status to "Development", regardless of its current status. This signals that work is in progress and helps avoid duplicate effort.
[ ] **Use a descriptive git branch** — Name the branch: `{agent}/{issue-id}-{short-description}` (e.g. `cursor/TPX-123-new-feature`). Ignore any branch name provided by the environment.

## As you progress through the task:

- Add comments after key milestones, when blocked, or when important information needs to be shared.

## After completing the work

**IMPORTANT: Agents must follow the below instructions only when running in the cloud Linux environment. When running on the user's Mac laptop, skip these instructions.**

Complete all items below after finishing the implementation.

[ ] **Stage and push all changes** — Always stage and push changes to the remote. Push after follow-up edits unless instructed otherwise.
[ ] **Create or link a PR** — When ready, create a PR if one does not exist, or link it. Use `gh` CLI if available. Don't create draft PRs.
[ ] **Set status to "In Review"** — After the PR is created, move the Linear issue status to "In Review".

## Important notes

- Use Linear MCP tools (get_issue, save_comment, save_issue, etc.) if available.
- “Development” and “In Review” are the expected status names in the Linear workspace. Use the closest match if they differ.
- If further work is requested after completion of the main work and creation of PR, always make sure you've staged and pushed all new changes to the remote branch so reviewers can see them.

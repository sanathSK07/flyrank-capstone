# WORKFLOW.md — The AI-assisted workflow drill (FE-03)

**Feature built twice:** the capstone settings form (display name, email, theme, notifications) with validation.

## Round one — vague prompt (`round-1-vague`)

Prompt: "make a settings form in react." One sentence, no context. I accepted the first output unchanged.

## Round two — spec + verification (`round-2-spec`)

Prompt referenced `CLAUDE.md` conventions, named the fields and their rules (name 2–50 chars trimmed, email must be valid, theme enum `light|dark|system`), required accessible labels/errors, example behavior ("whitespace-only name rejected"), and ended with: write it, then write tests and run them. The work went schema-first (`validation.ts` with zod) and finished with 8 tests in `SettingsForm.test.tsx`.

## What the diff shows

- **Correctness.** Round one validates email with `/\S+@\S+/.test(email)` — `a@b` and `a@@b` both pass. Round two uses `z.string().trim().email()`, and the test `rejects an email without a TLD-like structure` proves `sanath@invalid` fails. Round one also never trims: `"   "` is a valid display name there.
- **A real round-one bug.** The `saved` flag is set on success but never reset on a failed resubmit — after one save, the form shows "Settings saved!" and a red validation error simultaneously. Round two models it as `status: 'idle' | 'saved'` and resets it on every submit; the test `clears the error once the user fixes the field` covers the sequence.
- **Data loss.** Round one resets every field to defaults after saving — hostile for a settings page. Round two persists the (trimmed) values; asserted in `calls onSave with trimmed values and keeps values in the form`.
- **Accessibility.** Round one labels fields with bare `<div>`s — no programmatic label, no announcements. Round two: `label htmlFor`, `aria-invalid`, `aria-describedby`, `role="alert"` errors, `role="status"` save confirmation. `getByLabelText` passing is itself the a11y proof.

## AI mistakes caught by verification

Round two's *own* first output had a build-breaking mistake: it imported `defineConfig` from `vite` while adding a vitest `test` block, and then hit a vite 6 / vitest 2.1 peer type conflict. `vitest run` passed; only the `tsc -b` verification step caught it. Fixed by importing from `vitest/config` and moving to vitest 3. Lesson: green tests are not a green build — run both.

## Review effort

Round one was faster to generate but would have shipped four defects. Round two took longer up front (spec plus tests) yet needed near-zero correction after the two build fixes, and the tests now guard the capstone's form patterns. Round two is slower to start, faster end-to-end.

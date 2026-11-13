# Course progress and handoff

Use this structure as a copyable Markdown record or to organize an authorized course ledger. When using `learning-coach-progress.json`, preserve its existing structure and put these fields into the corresponding course record. On `save progress`, emit a fenced Markdown record with the fields below. Use ISO dates (`YYYY-MM-DD`) and record the course time zone when known. Mark missing facts as unknown.

## Course state

- Learner / course / goal ID:
- Goal, subject, target, and scope:
- As-of date and time zone:
- Current stage and current objective:
- Verified source crosswalk and dates; provisional sources:
- Diagnostic coverage: assessed domains / known total domains; unassessed areas:
- Curriculum and prerequisites, if diagnosis supports one:
- Last unanswered question or Socratic probe ID and content, if any:
- Review queue with objective, due date, interval, latest outcome, and associated attempt IDs:
- Storage: chat-tracked only / confirmed file path and last successful save:

## Competency evidence

| Competency / unit | Weight and prerequisites | Status | Independent evidence and attempt IDs | Coached evidence | Remaining gap | Next review due |
| --- | --- | --- | --- | --- | --- | --- |

Statuses are **Not assessed / Developing / Mastered**. Record the two qualifying demonstration IDs and the date of the delayed one for a mastered objective. After a clear failed review, record the change to **Developing** and preserve earlier evidence and dates. Flag legacy mastery with missing evidence for verification. Record confidence in the attempt history regardless of mode.

## Append-only attempt evidence

| Course / objective | Question / attempt ID | Date | Type | Mode and hints/exposure | Submitted answers | Confidence | Correct set or rubric result | True options identified / incorrect additions / omissions | Reasoning evidence | Gap or misconception | Next check |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Record actual submissions and exclude explicit interface tests. Link a same-item probe to the original attempt and record any scaffolding. Keep correct sets and worked answers out of any handoff for a pending question or probe. Record uncertainty alone as an unscored gap. For open questions, record criterion-level evidence.

## Resume in another conversation

Treat a supplied handoff as course evidence. Match the course ID and goal before updating an existing record. Deduplicate by attempt ID and retain earlier evidence. If a material conflict or ambiguous course prevents a safe merge, keep the records separate and ask one focused question. Preserve reported mastery and mark it pending verification when qualifying evidence is incomplete. Retain the pending prompt, mode, and prior exposure. Resume it before giving a due review. If its answer key was exposed, treat the item as coached and queue a fresh independent check. A supplied handoff does not itself count as a submission or write to a ledger.

## Progress display

State the unit and denominator: known objectives, questions, or competencies. Show attempted, independently mastered, coached, and unassessed with concise checkmarks or labeled bars. Attempted overlaps other categories; never sum overlapping counts into completion. Show diagnostic breadth and domain gaps alongside any subject-wide estimate; a few strong answers do not certify the whole subject.

## End-of-session update

Provide 2–4 lines: topic covered; independent evidence; remaining gap/uncertainty; next check. If no durable file write was confirmed, label the record chat-tracked only and offer it for copy/paste into the next session. Never claim background synchronization.

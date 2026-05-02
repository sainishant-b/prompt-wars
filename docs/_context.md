# Docs

## What this is for
Reference material for the Matdata Mitra build: PromptWars challenge brief, workspace organization skill, and any future source documents (ECI guidelines, legal references, scoring rubrics). Output: nothing built — read-only knowledge anchoring decisions in `app/`.

## Folder contents
| Subfolder / file pattern | What it holds |
|--------------------------|---------------|
| `Requirments.md` | PromptWars Challenge 2 brief — civic education problem statement, deadline (May 3rd), submission rules, required tools (Cloud Run, Anti-Gravity), scoring criteria. |
| `3-layered-workspace.md` | Skill reference — three-layer routing system (CLAUDE.md + `_context.md` + skills inventory). Used to structure this repo. |

## Routing table
| Task | Read | Skip | Skill |
|------|------|------|-------|
| Verify scoring criteria | `Requirments.md` | — | — |
| Confirm deadline / submission artifacts | `Requirments.md` | — | — |
| Re-organize workspace | `3-layered-workspace.md` | `Requirments.md` | — |
| Add new reference doc | *(write to this folder, update this table)* | — | — |

## Conventions
- Read-only by default. Don't modify `Requirments.md` (challenge brief — authoritative).
- New reference docs go here, named `<subject>.md`. Add a row to "Folder contents" when adding.
- Long source material → split into `<subject>_detail.md` and link from a short summary.

## Available skills
| Skill | When to use |
|-------|-------------|
| *(none currently installed at `~/.claude/commands/`)* | — |

## Suggested skills (not yet built)
| Skill name | Trigger |
|------------|---------|
| `summarize-doc.md` | Compress a long source doc into the 14-section KB shape used by `app/src/lib/knowledge-base.ts`. |

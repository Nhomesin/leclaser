# leclaser: agent guide

Work in a dedicated branch or worktree and preserve unrelated changes. Read the repository's setup and applicable operational procedures before running commands. Keep credentials, private records and generated build output out of commits.

## Repository navigation

LEC laser-cutting, CNC, acrylic fabrication and signage marketing site, built with Next.js.

Start with [README.md](README.md). Read any more specific AGENTS.md in the directory you change.

| Path | Use it for |
| --- | --- |
| [src/app/](src/app/) | Pages and lead API |
| [src/components/](src/components/) | Site components |
| [src/data/](src/data/) | Typed service, city and portfolio content |
| [src/lib/](src/lib/) | Shared helpers |
| [public/](public/) | Static assets |
| [scripts/build-data.mjs](scripts/build-data.mjs) | Content regeneration |
| [HANDOFF.md](HANDOFF.md) | Owner setup, delivery settings and domain handoff |

## Local verification

Run from the repository root.

```sh
npm run lint
npm run build
```

These are available commands, not a record of checks passing. Inspect package.json and the relevant CI workflow for feature-specific tests and prerequisites.

## Ownership and constraints

Preserve Bosnian/Serbian/Croatian Latin ijekavica copy, route slugs, canonical URLs and structured data. Review HANDOFF.md before changing lead delivery or deployment.

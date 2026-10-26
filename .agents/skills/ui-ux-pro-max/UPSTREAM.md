# UI UX Pro Max: project-local core installation

Upstream: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill

Pinned commit: `28b3b8dee8c976df4fa3e94aed4e092ad43fcb03`. This installation does not track `main`, npm `latest`, or automatic updates.

Installed scope: 39 files from `src/ui-ux-pro-max/data/`, the five top-level Python files from `src/ui-ux-pro-max/scripts/`, and the upstream MIT license. Data and Python files are retained byte-for-byte from the pinned commit. Tests and fixtures are not installed.

`SKILL.md` is rendered from the pinned `templates/base/skill-content.md`, `templates/base/quick-reference.md`, and `templates/platforms/codex.json`. Codex query commands use the project-relative path `.agents/skills/ui-ux-pro-max/scripts/search.py`. The upstream documentation-only `src/ui-ux-pro-max/data/icons.csv` reference is adapted to the installed path. A project scope note records the user's offline/core-only restrictions. The YAML metadata uses equivalent quoted scalar strings.

No npm CLI, global installation, sibling skills, image-generation tools, API credentials, MCP configuration, or extra services are included. Python 3 and its standard library are sufficient. Skill discovery uses this project's `.agents/skills/ui-ux-pro-max/SKILL.md`; start future Codex tasks in this repository. Already-running sessions may need to reopen the project to refresh their skill catalog.

Run from the repository root:

```bash
python3 -B .agents/skills/ui-ux-pro-max/scripts/search.py "keyboard focus modal" --domain ux
python3 -B .agents/skills/ui-ux-pro-max/scripts/search.py "streaming suspense" --stack nextjs
python3 -B .agents/skills/ui-ux-pro-max/scripts/search.py "beauty spa wellness service" --design-system -p "Example"
```

Queries read local data. Do not treat returned examples as permission to install packages or call external services. Save output only when needed, with `--persist --output-dir` explicitly set to this repository; preserve existing files and do not use `--force` without user approval.

`SHA256SUMS` records the installed files' SHA-256 digests, excluding itself. From this skill directory, `sha256sum -c SHA256SUMS` checks local integrity. Future version changes require a new review; these hashes are not an independent publisher signature.

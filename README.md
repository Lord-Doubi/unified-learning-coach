# Unified Learning Coach

An Agent Skill for adaptive learning, one question at a time. Set a job, subject, or academic competency goal, diagnose prerequisites, practice with feedback, and verify mastery on fresh problems after a delay.

## Install

The [learning-coach folder](skills/learning-coach) is the installable skill. Keep its name and supporting files together. From a terminal, clone the repository first if your installation method uses a local folder.

```sh
git clone https://github.com/Lord-Doubi/unified-learning-coach.git
cd unified-learning-coach
```

| Harness | Install | Start |
| --- | --- | --- |
| Claude Cowork or Claude chat | Download [learning-coach.zip](dist/learning-coach.zip?raw=1). In Customize → Skills, choose **Upload a skill** and enable it. [Claude guide](https://support.claude.com/en/articles/12512180-use-skills-in-claude) | Ask Claude to use Unified Learning Coach. |
| Claude Code | Copy the skill folder to `~/.claude/skills/learning-coach/` or to `.claude/skills/learning-coach/` in the project where you want it available. [Claude Code guide](https://code.claude.com/docs/en/skills) | `/learning-coach` followed by your goal |
| Hermes Agent | Run `hermes skills install Lord-Doubi/unified-learning-coach/skills/learning-coach`. For a manual install, copy the skill folder into the active profile's skills directory, `~/.hermes/skills/` for the default profile. [Hermes guide](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills) | `/learning-coach` followed by your goal |
| OpenClaw | From the clone, run `openclaw skills install ./skills/learning-coach`. For a manual install, copy the skill folder into the agent workspace's `skills/` directory. [OpenClaw guide](https://docs.openclaw.ai/tools/skills) | Ask OpenClaw to use the `learning-coach` skill. |
| Codex | Copy the skill folder to `~/.agents/skills/learning-coach/` or to `.agents/skills/learning-coach/` in a project. [Codex guide](https://developers.openai.com/codex/skills) | `$learning-coach` followed by your goal |
| Gemini CLI | Copy the skill folder to `~/.gemini/skills/learning-coach/` or to `.gemini/skills/learning-coach/` in a project. [Gemini CLI guide](https://geminicli.com/docs/cli/using-agent-skills/) | Ask Gemini to use the `learning-coach` skill. |
| VS Code Copilot | Copy the skill folder to `.github/skills/learning-coach/` in your workspace. [VS Code guide](https://code.visualstudio.com/docs/agent-customization/agent-skills) | Ask Copilot Chat to use the `learning-coach` skill. |
| Other Agent Skills harnesses | Place the complete folder in a location your harness scans for [Agent Skills](https://agentskills.io/specification). | Invoke the skill by its name or ask for Unified Learning Coach. |
| Plain chat or a ChatGPT Project | Paste the [standalone conversation instructions](skills/learning-coach/references/project-instructions.md) into the chat or project instructions. | Send `Learning Coach: …`. |

For example, send `Learning Coach: Diagnose my understanding of model evaluation for an applied ML role. Ask one question at a time.`

Recognition questions work as labeled choices in chat. Reply with your selections, and optionally your reasoning and uncertainty, such as `B, D | Unsure | Reasoning: …`. ChatGPT surfaces with compatible controls can use the bundled card. The core coaching workflow requires no renderer or external service.

To move a course between harnesses, ask for `save progress`, then paste the record into the next session with `resume progress`. The record carries the pending question, independent and coached evidence, and due reviews. Store personal course records outside this public repository.

## Design references

| Upstream skill or standard | How this coach uses it |
| --- | --- |
| Jane Street's [Socratic Tutor](https://github.com/janestreet/agent_skills/blob/master/socratic-tutor/SKILL.md) | A targeted question before a worked answer, independent checks, and spaced review. This coach also requires a fresh delayed problem and records confidence separately from independence. |
| Matt Pocock's [Grill Me](https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md) and its [Grilling workflow](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md) | Resolve decisions in prerequisite order during goal and portfolio planning. The coach asks one consequential question at a time and saves recommendations for planning. |
| Superpowers' [Brainstorming](https://github.com/obra/superpowers/blob/main/skills/brainstorming/SKILL.md) | A related design workflow that grounds one question at a time in prior answers. Compare it with the coach's goal-setting and decision review. |
| [Agent Skills specification](https://agentskills.io/specification) | One named skill directory, concise discovery metadata, and linked references, templates, and optional assets. |

## Verify the package

From the repository root, use Python 3.9+ to rebuild or check the Cowork archive. Node.js runs the optional ChatGPT card regression tests.

```sh
python tools/package_skill.py
python tools/package_skill.py --check
node skills/learning-coach/scripts/test_question_card.cjs
```

The package check verifies that the ZIP contains the skill files and that their bytes match the source. The card test simulates host APIs. Installation paths follow each harness's documentation.

"""Default SOUL.md template seeded into AGENTFOXXY_HOME on first run."""

# Kept byte-identical to agent.prompt_builder.DEFAULT_AGENT_IDENTITY so a fresh
# install and the runtime fallback describe the same agent. Text is assembled
# verbatim from permissively licensed upstream agent prompts:
#   opencode  packages/opencode/src/session/prompt/beast.txt      (MIT)
#   goose     crates/goose/src/prompts/subagent_system.md         (Apache-2.0)
#   goose     crates/goose/src/prompts/system.md                  (Apache-2.0)
DEFAULT_SOUL_MD = (
    "You are AgentFOXXY, an autonomous AI agent. You are a highly capable and "
    "autonomous agent, and you can definitely solve this problem without needing "
    "to ask the user for further input. Please keep going until the user's query "
    "is completely resolved, before ending your turn and yielding back to the "
    "user. You MUST iterate and keep going until the problem is solved. Only "
    "terminate your turn when you are sure that the problem is solved and all "
    "items have been checked off. NEVER end your turn without having truly and "
    "completely solved the problem.\n"
    "You lead TeamAgentFOXXY, a company of specialist subagents. You are the CEO: "
    "you do not grind through large work alone. When a goal decomposes into 2+ "
    "independent subtasks that can run in parallel, you delegate them to "
    "specialist subagents and coordinate their results. Your subagents operate "
    "with Independence, Specialization, Efficiency, and Bounded Operation. "
    "Coordinate your workers' results and synthesize them before reporting "
    "back; you are responsible for the final summary, not your workers.\n"
    "You verify before you accept. At the end, you must test your code "
    "rigorously using the tools provided, and do it many times, to catch all "
    "edge cases. If it is not robust, iterate more and make it perfect. Failing "
    "to test your code sufficiently rigorously is the NUMBER ONE failure mode on "
    "these types of tasks. You MUST plan extensively before each function call, "
    "and reflect extensively on the outcomes of the previous function calls.\n"
    "Your thinking should be thorough and so it's fine if it's very long. "
    "However, avoid unnecessary repetition and verbosity. You should be concise, "
    "but thorough. Be targeted and efficient in your exploration and "
    "investigations."
)

# Legacy SOUL.md boilerplate that older installers (install.sh / install.ps1 /
# docker/SOUL.md) seeded before they were switched to write DEFAULT_SOUL_MD.
# These templates contain no persona text -- they are pure comment scaffolding,
# so a SOUL.md whose content matches one of these was demonstrably never
# customized by the user and is safe to upgrade to DEFAULT_SOUL_MD in place.
#
# Match on normalized content (stripped, line-endings unified) so trailing
# newlines or CRLF from Windows installers don't defeat the comparison. NEVER
# add anything here that a user might have intentionally written -- the whole
# safety guarantee is that these strings carry zero user intent.
_LEGACY_TEMPLATE_SOULS = (
    (
        "# AgentFOXXY Agent Persona\n"
        "\n"
        "<!--\n"
        "This file defines the agent's personality and tone.\n"
        "The agent will embody whatever you write here.\n"
        "Edit this to customize how AgentFOXXY communicates with you.\n"
        "\n"
        "Examples:\n"
        '  - "You are a warm, playful assistant who uses kaomoji occasionally."\n'
        '  - "You are a concise technical expert. No fluff, just facts."\n'
        '  - "You speak like a friendly coworker who happens to know everything."\n'
        "\n"
        "This file is loaded fresh each message -- no restart needed.\n"
        "Delete the contents (or this file) to use the default personality.\n"
        "-->"
    ),
    # docker/SOUL.md and the install.sh heredoc differ only by an "Examples"
    # block / trailing newline in some historical revisions; the bare scaffold
    # (no Examples block) was also shipped briefly.
    (
        "# AgentFOXXY Agent Persona\n"
        "\n"
        "<!--\n"
        "This file defines the agent's personality and tone.\n"
        "The agent will embody whatever you write here.\n"
        "Edit this to customize how AgentFOXXY communicates with you.\n"
        "\n"
        "This file is loaded fresh each message -- no restart needed.\n"
        "Delete the contents (or this file) to use the default personality.\n"
        "-->"
    ),
)


def _normalize_soul(text: str) -> str:
    """Normalize SOUL.md content for legacy-template comparison."""
    # Unify line endings (Windows installer writes CRLF-free but be defensive),
    # strip a leading UTF-8 BOM, and trim surrounding whitespace.
    return text.replace("\r\n", "\n").replace("\r", "\n").lstrip("\ufeff").strip()


def is_legacy_template_soul(text: str) -> bool:
    """True if ``text`` is an old empty-template SOUL.md (no user persona).

    Older installers seeded a comment-only scaffold instead of DEFAULT_SOUL_MD,
    which shadowed the runtime default and left users with no persona. A file
    matching one of those known scaffolds carries zero user intent and is safe
    to upgrade in place. Any deviation (the user typed a persona, even one
    character outside the comment) makes this return False.
    """
    normalized = _normalize_soul(text)
    return any(normalized == _normalize_soul(t) for t in _LEGACY_TEMPLATE_SOULS)

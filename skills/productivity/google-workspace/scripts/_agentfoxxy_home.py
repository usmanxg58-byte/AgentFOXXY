"""Resolve AGENTFOXXY_HOME for standalone skill scripts.

Skill scripts may run outside the AgentFOXXY process (e.g. system Python,
nix env, CI) where ``agentfoxxy_constants`` is not importable.  This module
provides the same ``get_agentfoxxy_home()`` and ``display_agentfoxxy_home()``
contracts as ``agentfoxxy_constants`` without requiring it on ``sys.path``.

When ``agentfoxxy_constants`` IS available it is used directly so that any
future enhancements (profile resolution, Docker detection, etc.) are
picked up automatically.  The fallback path replicates the core logic
from ``agentfoxxy_constants.py`` using only the stdlib.

All scripts under ``google-workspace/scripts/`` should import from here
instead of duplicating the ``AGENTFOXXY_HOME = Path(os.getenv(...))`` pattern.
"""

from __future__ import annotations

import os
from pathlib import Path

try:
    from agentfoxxy_constants import display_agentfoxxy_home as display_agentfoxxy_home
    from agentfoxxy_constants import get_agentfoxxy_home as get_agentfoxxy_home
except (ModuleNotFoundError, ImportError):

    def get_agentfoxxy_home() -> Path:
        """Return the AgentFOXXY home directory (default: ~/.agentfoxxy).

        Mirrors ``agentfoxxy_constants.get_agentfoxxy_home()``."""
        val = os.environ.get("AGENTFOXXY_HOME", "").strip()
        return Path(val) if val else Path.home() / ".agentfoxxy"

    def display_agentfoxxy_home() -> str:
        """Return a user-friendly ``~/``-shortened display string.

        Mirrors ``agentfoxxy_constants.display_agentfoxxy_home()``."""
        home = get_agentfoxxy_home()
        try:
            return "~/" + str(home.relative_to(Path.home()))
        except ValueError:
            return str(home)

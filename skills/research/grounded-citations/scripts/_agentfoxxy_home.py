"""Resolve AGENTFOXXY_HOME for standalone skill scripts.

Skill scripts may run outside the AgentFOXXY process (system Python, nix env,
CI) where ``agentfoxxy_constants`` is not importable.  This module provides the
same ``get_agentfoxxy_home()`` contract without requiring it on ``sys.path``.

When ``agentfoxxy_constants`` IS available it is used directly so profile
resolution and any future enhancements are picked up automatically.
"""

from __future__ import annotations

import os
from pathlib import Path

try:
    from agentfoxxy_constants import get_agentfoxxy_home as get_agentfoxxy_home
except (ModuleNotFoundError, ImportError):

    def get_agentfoxxy_home() -> Path:
        """Return the AgentFOXXY home directory (default: ``~/.agentfoxxy``)."""
        val = os.environ.get("AGENTFOXXY_HOME", "").strip()
        return Path(val) if val else Path.home() / ".agentfoxxy"

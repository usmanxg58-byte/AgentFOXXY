"""Tests for the Nous-AgentFOXXY-3/4 non-agentic warning detector.

Prior to this check, the warning fired on any model whose name contained
``"agentfoxxy"`` anywhere (case-insensitive). That false-positived on unrelated
local Modelfiles such as ``agentfoxxy-brain:qwen3-14b-ctx16k`` — a tool-capable
Qwen3 wrapper that happens to live under the "agentfoxxy" tag namespace.

``is_nous_agentfoxxy_non_agentic`` should only match the actual Nous Research
AgentFOXXY-3 / AgentFOXXY-4 chat family.
"""

from __future__ import annotations

import pytest

from agentfoxxy_cli.model_switch import (
    _AGENTFOXXY_MODEL_WARNING,
    _check_agentfoxxy_model_warning,
    is_nous_agentfoxxy_non_agentic,
)


@pytest.mark.parametrize(
    "model_name",
    [
        "NousResearch/AgentFOXXY-3-Llama-3.1-70B",
        "NousResearch/AgentFOXXY-3-Llama-3.1-405B",
        "agentfoxxy-3",
        "AgentFOXXY-3",
        "agentfoxxy-4",
        "agentfoxxy-4-405b",
        "agentfoxxy_4_70b",
        "openrouter/agentfoxxy3:70b",
        "openrouter/nousresearch/agentfoxxy-4-405b",
        "NousResearch/AgentFOXXY3",
        "agentfoxxy-3.1",
    ],
)
def test_matches_real_nous_agentfoxxy_chat_models(model_name: str) -> None:
    assert is_nous_agentfoxxy_non_agentic(model_name), (
        f"expected {model_name!r} to be flagged as Nous AgentFOXXY 3/4"
    )
    assert _check_agentfoxxy_model_warning(model_name) == _AGENTFOXXY_MODEL_WARNING



"""Tests for the Nous-Hermes-3/4 non-agentic warning detector.

Prior to this check, the warning fired on any model whose name contained
``"hermes"`` anywhere (case-insensitive). That false-positived on unrelated
local Modelfiles such as ``hermes-brain:qwen3-14b-ctx16k`` — a tool-capable
Qwen3 wrapper that happens to live under the "hermes" tag namespace.

``is_nous_hermes_non_agentic`` should only match the actual Nous Research
Hermes-3 / Hermes-4 chat family. These are third-party model IDs, so they keep
their real upstream names — they are not AgentFOXXY models.
"""

from __future__ import annotations

import pytest

from agentfoxxy_cli.model_switch import (
    _HERMES_MODEL_WARNING,
    _check_hermes_model_warning,
    is_nous_hermes_non_agentic,
)


@pytest.mark.parametrize(
    "model_name",
    [
        "NousResearch/Hermes-3-Llama-3.1-70B",
        "NousResearch/Hermes-3-Llama-3.1-405B",
        "hermes-3",
        "Hermes-3",
        "hermes-4",
        "hermes-4-405b",
        "hermes_4_70b",
        "openrouter/hermes3:70b",
        "openrouter/nousresearch/hermes-4-405b",
        "NousResearch/Hermes3",
        "hermes-3.1",
    ],
)
def test_matches_real_nous_hermes_chat_models(model_name: str) -> None:
    assert is_nous_hermes_non_agentic(model_name), (
        f"expected {model_name!r} to be flagged as Nous Hermes 3/4"
    )
    assert _check_hermes_model_warning(model_name) == _HERMES_MODEL_WARNING


@pytest.mark.parametrize(
    "model_name",
    [
        "",
        "hermes-brain:qwen3-14b-ctx16k",
        "qwen3:14b",
        "claude-opus-4-6",
        "gpt-5",
        "agentfoxxy",
        "agentfoxxy-3",
    ],
)
def test_ignores_everything_else(model_name: str) -> None:
    assert not is_nous_hermes_non_agentic(model_name), (
        f"expected {model_name!r} NOT to be flagged as Nous Hermes 3/4"
    )
    assert _check_hermes_model_warning(model_name) == ""

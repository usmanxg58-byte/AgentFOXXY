"""Tests for TUI gateway slash_worker profile_home propagation (#40677)."""

from pathlib import Path
from unittest.mock import MagicMock, patch


def test_slash_worker_accepts_profile_home():
    """_SlashWorker.__init__ accepts profile_home parameter."""
    # agentfoxxy_state evaluates get_agentfoxxy_home() / "state.db" at import time, so
    # the mock must return a Path (a bare str raises TypeError under per-file
    # subprocess isolation).
    with patch.dict("sys.modules", {
        "agentfoxxy_constants": MagicMock(
            get_agentfoxxy_home=MagicMock(return_value=Path("/tmp/agentfoxxy_test")),
        ),
    }):
        with patch("subprocess.Popen") as mock_popen:
            mock_popen.return_value.stdout = MagicMock()
            mock_popen.return_value.stderr = MagicMock()

            from tui_gateway.server import _SlashWorker

            # Test initialization with profile_home
            worker = _SlashWorker(
                session_key="test_key",
                model="test-model",
                profile_home="/home/luke/.agentfoxxy/profiles/work"
            )

            # Verify Popen was called
            assert mock_popen.called

            # Check that AGENTFOXXY_HOME was set in the environment
            call_kwargs = mock_popen.call_args[1]
            assert "env" in call_kwargs
            assert call_kwargs["env"]["AGENTFOXXY_HOME"] == "/home/luke/.agentfoxxy/profiles/work"



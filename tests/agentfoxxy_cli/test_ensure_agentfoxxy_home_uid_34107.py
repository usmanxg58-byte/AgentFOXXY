"""Regression tests for #34107 — Docker UID/GID handling in ensure_agentfoxxy_home.

When AgentFOXXY runs in Docker with ``AGENTFOXXY_UID=1000`` / ``AGENTFOXXY_GID=911``,
the entrypoint chowns the top-level ``AGENTFOXXY_HOME`` once at startup. But
subdirectories created at runtime by ``ensure_agentfoxxy_home()`` — especially
for profile namespaces under ``profiles/<name>/`` spawned by kanban
workers — were landing as ``root:root`` and blocking subsequent
uid-mapped worker invocations with ``PermissionError [Errno 13]``.

The fix is a ``_chown_to_agentfoxxy_uid`` helper that reads the env vars and
applies chown after ``mkdir``, invoked from ``_secure_dir`` (which already
runs after every directory creation in the home-init path).
"""
from __future__ import annotations

import os
import sys
from pathlib import Path
from unittest.mock import patch

import pytest


# ---------------------------------------------------------------------------
# _resolve_agentfoxxy_uid_gid
# ---------------------------------------------------------------------------


class TestResolveAgentFOXXYUidGid:
    def test_returns_parsed_values_when_both_set(self, monkeypatch):
        monkeypatch.setenv("AGENTFOXXY_UID", "1000")
        monkeypatch.setenv("AGENTFOXXY_GID", "911")
        from agentfoxxy_cli.config import _resolve_agentfoxxy_uid_gid
        uid, gid = _resolve_agentfoxxy_uid_gid()
        assert uid == 1000
        assert gid == 911


    # ``windows_only`` rather than ``skipif(sys.platform != "win32")``: the
    # Windows CI job selects ``-m windows_only``, so a bare skipif would leave
    # this test skipped on Linux AND unselected on the Windows lane — dead on
    # every host.
    @pytest.mark.windows_only
    def test_windows_returns_none_none(self, monkeypatch):
        monkeypatch.setenv("AGENTFOXXY_UID", "1000")
        monkeypatch.setenv("AGENTFOXXY_GID", "911")
        from agentfoxxy_cli.config import _resolve_agentfoxxy_uid_gid
        uid, gid = _resolve_agentfoxxy_uid_gid()
        assert uid is None
        assert gid is None


# ---------------------------------------------------------------------------
# _chown_to_agentfoxxy_uid
# ---------------------------------------------------------------------------


class TestChownToAgentFOXXYUid:
    def test_calls_os_chown_when_both_set(self, tmp_path, monkeypatch):
        monkeypatch.setenv("AGENTFOXXY_UID", "1000")
        monkeypatch.setenv("AGENTFOXXY_GID", "911")
        from agentfoxxy_cli import config as cfg

        d = tmp_path / "subdir"
        d.mkdir()

        with patch.object(cfg.os, "chown") as mock_chown:
            cfg._chown_to_agentfoxxy_uid(d)
        mock_chown.assert_called_once_with(d, 1000, 911)


    def test_eperm_is_silently_swallowed(self, tmp_path, monkeypatch):
        """When running as non-root, os.chown raises EPERM. That's fine —
        the entrypoint's startup chown -R will pick it up on restart, and
        in most cases the dir was already correctly-owned by the calling
        user anyway."""
        monkeypatch.setenv("AGENTFOXXY_UID", "1000")
        monkeypatch.setenv("AGENTFOXXY_GID", "911")
        from agentfoxxy_cli import config as cfg

        d = tmp_path / "subdir"
        d.mkdir()

        def _raises_eperm(*args, **kwargs):
            raise PermissionError("operation not permitted")

        with patch.object(cfg.os, "chown", side_effect=_raises_eperm):
            # Must not raise — the catch is non-fatal.
            cfg._chown_to_agentfoxxy_uid(d)

    def test_attributeerror_swallowed_for_windows_compat(self, tmp_path, monkeypatch):
        """os.chown doesn't exist on Windows. Catching AttributeError keeps
        the helper portable."""
        monkeypatch.setenv("AGENTFOXXY_UID", "1000")
        monkeypatch.setenv("AGENTFOXXY_GID", "911")
        from agentfoxxy_cli import config as cfg

        d = tmp_path / "subdir"
        d.mkdir()

        with patch.object(cfg.os, "chown", side_effect=AttributeError("no chown on this platform")):
            cfg._chown_to_agentfoxxy_uid(d)  # must not raise


# ---------------------------------------------------------------------------
# End-to-end: _secure_dir now also chowns
# ---------------------------------------------------------------------------


class TestSecureDirChown:
    @pytest.mark.skipif(sys.platform == "win32", reason="chown is no-op on Windows")
    def test_secure_dir_invokes_chown_when_env_set(self, tmp_path, monkeypatch):
        monkeypatch.setenv("AGENTFOXXY_UID", "1000")
        monkeypatch.setenv("AGENTFOXXY_GID", "911")
        from agentfoxxy_cli import config as cfg

        d = tmp_path / "subdir"
        d.mkdir()

        with patch.object(cfg.os, "chown") as mock_chown:
            cfg._secure_dir(d)
        mock_chown.assert_called_once_with(d, 1000, 911)

    @pytest.mark.skipif(sys.platform == "win32", reason="chown is no-op on Windows")
    def test_secure_dir_no_chown_when_env_unset(self, tmp_path, monkeypatch):
        monkeypatch.delenv("AGENTFOXXY_UID", raising=False)
        monkeypatch.delenv("AGENTFOXXY_GID", raising=False)
        from agentfoxxy_cli import config as cfg

        d = tmp_path / "subdir"
        d.mkdir()

        with patch.object(cfg.os, "chown") as mock_chown:
            cfg._secure_dir(d)
        mock_chown.assert_not_called()

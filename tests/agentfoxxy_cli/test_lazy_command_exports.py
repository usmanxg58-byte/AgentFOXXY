"""The decomposed command modules stay lazy after `import agentfoxxy_cli.main`.

The main.py decomposition re-exports the sessions/update/dashboard command
surface from agentfoxxy_cli.main so argparse wiring and monkeypatches keep
resolving. Those re-exports must not import the modules eagerly: every
`agentfoxxy` invocation (including `agentfoxxy --version`) would pay for update_cmd's
dependency chain (jwt, click, ...) even when no subcommand runs.
"""

import subprocess
import sys
import textwrap

import agentfoxxy_cli.main


def test_importing_main_does_not_import_command_modules():
    code = textwrap.dedent(
        """
        import sys
        import agentfoxxy_cli.main  # noqa: F401
        loaded = [
            m
            for m in (
                "agentfoxxy_cli.update_cmd",
                "agentfoxxy_cli.sessions_cmd",
                "agentfoxxy_cli.dashboard_procs",
            )
            if m in sys.modules
        ]
        assert not loaded, f"eagerly imported: {loaded}"
        """
    )
    result = subprocess.run(
        [sys.executable, "-c", code],
        capture_output=True,
        text=True,
        timeout=120,
    )
    assert result.returncode == 0, result.stderr


def test_lazy_reexports_resolve_to_real_objects():
    import agentfoxxy_cli.dashboard_procs
    import agentfoxxy_cli.sessions_cmd
    import agentfoxxy_cli.update_cmd

    assert agentfoxxy_cli.main.cmd_sessions is agentfoxxy_cli.sessions_cmd.cmd_sessions
    assert (
        agentfoxxy_cli.main._cmd_update_impl is agentfoxxy_cli.update_cmd._cmd_update_impl
    )
    assert (
        agentfoxxy_cli.main._scan_dashboard_processes
        is agentfoxxy_cli.dashboard_procs._scan_dashboard_processes
    )
    # Back-compat alias resolves to the kill helper.
    assert (
        agentfoxxy_cli.main._warn_stale_dashboard_processes
        is agentfoxxy_cli.dashboard_procs._kill_stale_dashboard_processes
    )


def test_lazy_reexports_accept_monkeypatch(monkeypatch):
    sentinel = object()
    monkeypatch.setattr("agentfoxxy_cli.main._cmd_update_impl", sentinel)
    assert agentfoxxy_cli.main._cmd_update_impl is sentinel

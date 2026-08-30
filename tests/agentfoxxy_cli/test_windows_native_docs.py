from pathlib import Path


def test_windows_native_install_path_docs_match_installer() -> None:
    doc = Path("website/docs/user-guide/windows-native.md").read_text()
    install = Path("scripts/install.ps1").read_text()

    # The launchers live in the managed binary dir OUTSIDE the git checkout
    # (AGENTFOXXY_HOME\bin, next to the managed uv) — NOT the whole venv\Scripts
    # (which would shadow the user's python, #83797) and NOT a dir inside
    # the checkout (which `agentfoxxy update`'s autostash swept off disk).
    assert "%LOCALAPPDATA%\\agentfoxxy\\bin" in doc
    assert (
        "Get-Command agentfoxxy        # should print "
        "C:\\Users\\<you>\\AppData\\Local\\agentfoxxy\\bin\\agentfoxxy.exe"
    ) in doc
    # Installer exposes $AgentFOXXYHome\bin, and must copy the launchers into it.
    assert '$agentfoxxyBin = "$AgentFOXXYHome\\bin"' in install
    assert "agentfoxxy.exe" in install and "agentfoxxy-acp.exe" in install
    # Guard against regressions to either legacy layout.
    assert '$agentfoxxyBin = "$InstallDir\\venv\\Scripts"' not in install
    assert '$agentfoxxyBin = "$InstallDir\\bin"' not in install

AgentFOXXY
Copyright (c) 2026 usmanxg58-byte. All rights reserved.

AgentFOXXY and all modifications, additions, branding, and original work in
this repository are the property of usmanxg58-byte.

Licensed under the MIT License (below).


-------------------------------------------------------------------------------
MIT License
-------------------------------------------------------------------------------

Copyright (c) 2026 usmanxg58-byte
Copyright (c) 2025 Nous Research

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


-------------------------------------------------------------------------------
Third-Party Attribution
-------------------------------------------------------------------------------

AgentFOXXY is built on the Hermes Agent open-source project by Nous Research,
used and redistributed under the MIT License. The Nous Research copyright
notice above is retained as that license requires. Nous Research does not
endorse, sponsor, or support AgentFOXXY.

The specialist skill cards in `skills/agentfoxxy-powers/` adapt prompt text from
the open-source projects listed below. Each is redistributed under its own
permissive license, which is named in the `license:` field of the card's
SKILL.md. Apache-2.0 and MIT both require this notice to travel with the code,
so it is reproduced here rather than left to a per-directory LICENSE file.

| Skill card      | Upstream project | License    |
| --------------- | ---------------- | ---------- |
| app-builder     | goose (Block)    | Apache-2.0 |
| architect       | aider            | Apache-2.0 |
| architect       | goose (Block)    | Apache-2.0 |
| beast-coder     | opencode (sst)   | MIT        |
| beast-coder     | aider            | Apache-2.0 |
| big-job-coder   | cline (Cline Bot Inc.) | Apache-2.0 |
| big-planner     | plandex          | MIT        |
| browser         | browser-use      | MIT        |
| cheap-coder     | smolagents (Hugging Face) | Apache-2.0 |
| fix-suggester   | pr-agent         | permissive — see note below |
| reviewer        | pr-agent         | permissive — see note below |
| reviewer        | goose (Block)    | Apache-2.0 |
| team-boss       | goose (Block)    | Apache-2.0 |
| team-boss       | deepagents (LangChain) | MIT |
| terminal        | goose (Block)    | Apache-2.0 |
| tester          | none — original AgentFOXXY text | MIT |

No AGPL, GPL, LGPL, SSPL, or otherwise copyleft-licensed material is bundled.
The `tester` card was previously adapted from qodo-cover, which is AGPL-3.0; it
was rewritten from scratch as original AgentFOXXY text and no longer derives
from that project.

Note on pr-agent: it shipped under Apache-2.0, moved to AGPL-3.0 for a period,
and has since returned to a permissive license under community governance. Its
card frontmatter records Apache-2.0. The upstream project page and the handover
announcement do not currently agree on which permissive license applies, so no
single name is asserted here. A buyer performing strict license diligence should
record the exact upstream commit the text was taken from; see
[pr-agent](https://github.com/qodo-ai/pr-agent).

Remaining bundled components (plugins, npm and Python dependencies) carry their
own licenses, available through `npm ls --long` and `pip show` respectively.

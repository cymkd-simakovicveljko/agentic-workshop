# 2.3 Prompting

**Point:** a useful prompt makes the requested outcome and its boundaries visible. It does not need to prescribe every internal step, and it should not ask the model to guess what “done” means.

## Make four things explicit

| Part | What to name | Health-checker example |
| --- | --- | --- |
| **Goal** | The observable change | Make the failure report easier for a teammate to understand. |
| **Context** | The files, command, or result that matter | Current checker source, fixture guide, and the actual run command. |
| **Constraints** | What must stay true or stay out of scope | Keep one URL, status/body checks, exit codes, timeout, and no redirects. |
| **Done when** | Evidence a reviewer can observe | `/healthy` still passes and `/wrong-body` still fails with a clear reason. |

Add the parts that could change the result. A tiny wording change may need one direct sentence. An ambiguous behavior needs an inspection turn before editing. Do not create a six-prompt ceremony because a workflow has six names.

Prompt and context overlap, but they are not synonyms. Your prompt can point OMP at a file; the file's contents become context only after the model or harness retrieves them. A detailed prompt can still fail if it supplies stale instructions or omits the result that exposed the problem.

## Choose the prompt shape

- Use a **direct request** when the outcome and boundaries are settled.
- Use **examples** when contrasting observations define correctness, such as HTTP 200 with the wrong body versus a timeout with no status.
- Use **staged clarification** when an unresolved choice would change behavior or risk: inspect first, agree on the contract, then execute.

The strongest follow-up reports an observed-versus-expected gap. “Try harder” adds no information about what failed or what would distinguish a fix from a coincidence.

## One bounded follow-up

After the first checker run, use this request instead of “make the output better”:

```text
Inspect the current checker and the fixture contract. Keep the one-URL
interface, expected status and literal body check, whole-operation timeout,
no-redirect behavior, and exit codes unchanged. Improve only the failure
report so a teammate can tell whether status, body, or transport failed.

Done when /healthy still passes, /wrong-body still fails for a text mismatch,
and /slow reports a timeout/transport reason without an invented HTTP status.
Read the files before editing, then report the changed files and the commands
and results you actually ran. Do not claim an unrun case passed.
```

That request leaves implementation choices open while making the acceptance boundary concrete. Review the generated files and rerun the named cases; the wording of the prompt is not a substitute for evidence.

[Back to foundations](../health-checker/02-foundations.md) · [Previous: Context](context.md) · [Next: Tools and permissions](tools-and-permissions.md)

## Sources

- [Claude prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) — clear instructions, context, and examples.
- [Health-checker fixture contract](../../demo/health-checker/README.md)
- [OMP CLI reference, pinned 18.2.9 source](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/cli-reference.md)

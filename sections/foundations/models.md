# 2.1 Models and roles

**Pick a model for the job, then let roles handle the routing.** OMP can use one model for everyday work and another for planning or review. A role is an assignment to a model—not a prompt saying “act as an expert.”

## Keep the controls separate

| Term | What it controls | What it does not control |
| --- | --- | --- |
| **Model** | The provider/model identity used for inference. | Whether a proposed tool call was allowed or executed. |
| **Model role** | Which model selector OMP uses for a workload such as ordinary chat, planning, or judgment. | A personality, a permission grant, or automatic entry into a mode. |
| **Persona prompt** | The requested voice, priorities, boundaries, and format in the model's context. | The provider route, model capability, or tool policy. |
| **Provider** | The account/backend that serves the selected model and applies its limits. | Correctness of the answer or completion of a tool call. |

Start with five roles:

| Role | Useful starting choice |
| --- | --- |
| `default` | A capable model for the main conversation and coding work. |
| `smol` | A fast, cheaper model for lightweight background work. |
| `slow` | A stronger model for difficult reasoning when waiting is worthwhile. |
| `plan` | A model suited to planning; assigning it does not itself enter plan mode. |
| `advisor` | A reviewing model that can run alongside the main agent when that feature is enabled. |

Other roles cover tasks such as images, speech, and delegated work. Leave them alone until you need them. Role selectors belong in `modelRoles` in `config.yml`; provider definitions and model metadata belong in `models.yml`.

## Make a practical choice

Keep the first setup simple: choose your main model, try a real task, and inspect the result. Add a cheaper background model or a stronger reviewer when there is a concrete reason—not because there is an empty setting.

Open `/model` to inspect the available choices. Record the provider, model, and thinking effort when comparing runs; otherwise a changed setting can look like an improvement from a new prompt.

A persona prompt such as “state the next action and label uncertainty” can shape the response. It does not select a stronger model or execute a command. **Model roles choose who does the work; instructions describe how we want it done.**

[Back to foundations](../health-checker/02-foundations.md) · [Previous: Foundations overview](../health-checker/02-foundations.md) · [Next: Context](context.md)

## Sources

- [OMP model configuration, selection, and roles (current source)](https://raw.githubusercontent.com/can1357/oh-my-pi/main/docs/models.md)
- [Health-checker fixture contract](../../demo/health-checker/README.md)

The source link follows OMP's current `main` documentation rather than a pinned release. Treat the installed OMP version as the final authority if a role or command is absent.

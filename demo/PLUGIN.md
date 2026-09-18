# Specification-review plugin for Claude Code

This example targets Claude Code's native plugin format. It contains one skill and no executable hooks, external server or credentials.

```text
demo/
  .claude-plugin/marketplace.json
  plugins/spec-coach/
    .claude-plugin/plugin.json
    skills/spec-review/SKILL.md
```

The full manifest is [plugin.json](plugins/spec-coach/.claude-plugin/plugin.json). The plugin name `spec-coach` supplies the namespace. The skill name is `spec-review`.

## Local development check

```sh
claude --plugin-dir ./plugins/spec-coach
```

In the session:

```text
/spec-coach:spec-review fixtures/flawed-spec.md
```

Expect a decision-needed verdict pointing to the contradictory whitespace example. Confirm the plugin appears in `/plugin` and the skill command resolves. Ask it to state the loaded skill path. Run all four evaluation cases before distributing. `npm run preflight` only checks local layout and matching skill copies.

## Local marketplace installation

From a normal Claude session started in `demo/`:

```text
/plugin marketplace add .
/plugin install spec-coach@engineering-course
```

Choose the appropriate install scope for the rehearsal, normally user scope on a disposable training account. Restart the session and invoke the same namespaced skill. If policy disallows local marketplaces, use the `--plugin-dir` development route and record the distribution step as unverified.

## Updating and disabling

Edit the skill in its source directory, update the plugin copy, and bump `version` in both plugin and marketplace metadata. Run the case suite and preflight. The local file-copy check helps catch divergence. For a real release, tag/review the distribution repository and publish release notes naming supported host versions and changed behavior.

For a development copy, use `/reload-plugins` after changes. For a marketplace installation, refresh the marketplace and update the plugin:

```text
/plugin marketplace update engineering-course
/plugin update spec-coach@engineering-course
/plugin disable spec-coach@engineering-course
```

Check the plugin manager's status and verify in a fresh session. A `--plugin-dir` development copy can still load independently of the installed marketplace copy; close that development session when testing disable behavior. Re-enable or reinstall the reviewed version through the plugin manager. To remove an installed copy:

```text
/plugin uninstall spec-coach@engineering-course
```

Current command behavior follows the [plugin documentation](https://code.claude.com/docs/en/plugins), [marketplace guide](https://code.claude.com/docs/en/plugin-marketplaces), and [installation guide](https://code.claude.com/docs/en/discover-plugins). Host policy and version can affect available actions. The validation report states which actions ran here.

## Shared ownership

Assign an owner and backup, a release version, case fixtures and supported-host matrix. Skill wording is portable content. Manifests, namespaces, installation and update rules are host-specific. Renaming the manifest does not port the plugin.

If adding dependencies, hooks or MCP, update the threat model and install guide. Document executable entry points, endpoints and permissions. Inject credentials using approved runtime mechanisms. Disabling the plugin does not revoke credentials already issued to an external service.

## MODIFIED Requirements

### Requirement: Literal name filtering
By default the application SHALL match a project when its name contains the query
after both use JavaScript toLowerCase(). It SHALL search names only unless Include
owners is selected; in that mode it SHALL match either the name or owner using the
same literal comparison. In both modes it SHALL preserve source order, duplicate
input entries and the source array. One input entry matching both fields SHALL
appear once per occurrence in the input. Accent folding and locale-specific case
rules remain outside scope. Existing filter calls without a mode SHALL retain
name-only behavior.

#### Scenario: Mixed case substring
- **GIVEN** Include owners is unchecked
- **WHEN** the query is `aTlAs`
- **THEN** only Atlas and Atlas API appear, in that order

#### Scenario: Owner does not match
- **GIVEN** Include owners is unchecked
- **WHEN** the query is `team`
- **THEN** no projects appear

#### Scenario: Owner matching is enabled
- **GIVEN** Include owners is checked
- **WHEN** the query is `team`
- **THEN** only Borealis appears

#### Scenario: Name and owner matches share source order
- **GIVEN** Include owners is checked
- **WHEN** the query is `Atlas`
- **THEN** Atlas, Atlas API and Borealis appear in source order

#### Scenario: Literal punctuation
- **GIVEN** either matching mode
- **WHEN** the query is `.*`
- **THEN** no projects appear for the supplied dataset

#### Scenario: Accents stay distinct
- **GIVEN** either matching mode
- **WHEN** the query is `cafe`
- **THEN** Café does not match

#### Scenario: Source order, duplicate occurrences and non-mutation
- **GIVEN** a frozen input array in a non-alphabetical order with repeated entries and an entry whose name and owner both match
- **WHEN** matching runs in either mode
- **THEN** matching entries retain their input order and repeated occurrences
- **AND** matching both fields does not add extra occurrences
- **AND** the input remains unchanged

### Requirement: Query whitespace
The application SHALL remove leading and trailing whitespace with JavaScript
trim() before matching. An empty normalized query SHALL show every project in
source order in either matching mode.

#### Scenario: Pasted name
- **GIVEN** Include owners is unchecked
- **WHEN** the query is `  ATLAS  `
- **THEN** only Atlas and Atlas API appear

#### Scenario: Pasted owner with mixed case
- **GIVEN** Include owners is checked
- **WHEN** the query is `  mIrA  `
- **THEN** only Atlas appears

#### Scenario: Clear or whitespace only
- **GIVEN** either matching mode
- **WHEN** the query is empty or contains only spaces and tabs
- **THEN** all four projects appear in source order

### Requirement: Result feedback
On every query input event and matching-mode change the application SHALL update
visible results without a filtering network request. It SHALL retain the query
when the mode changes, show the count as `N of 4 projects` in a polite live region,
and show `No projects found.` exactly when N is zero. The input SHALL retain its
visible associated label and remain keyboard operable.

#### Scenario: No result
- **GIVEN** either matching mode
- **WHEN** the query is `zzzz`
- **THEN** the list is empty, the count reads `0 of 4 projects`, and `No projects found.` is visible

#### Scenario: Clear after no result
- **GIVEN** either matching mode and no current results
- **WHEN** the query is cleared
- **THEN** all four projects return, the count reads `4 of 4 projects`, and the empty message is hidden

#### Scenario: Enable owner matching with an existing query
- **GIVEN** Include owners is unchecked and the query is `team`
- **WHEN** Include owners is checked
- **THEN** Borealis appears, the count reads `1 of 4 projects`, and the empty message is hidden
- **AND** the query remains `team`

#### Scenario: Disable owner matching with an existing query
- **GIVEN** Include owners is checked and the query is `team`
- **WHEN** Include owners is unchecked
- **THEN** no projects appear, the count reads `0 of 4 projects`, and the empty message is visible
- **AND** the query remains `team`

## ADDED Requirements

### Requirement: Explicit owner-search control
The application SHALL provide a native checkbox with the visible associated label
`Include owners`. It SHALL start unchecked on page load and be operable using the
keyboard. The mode SHALL remain local to the current page; no stored preference
SHALL be introduced.

#### Scenario: Default and reload
- **WHEN** the page loads or reloads
- **THEN** Include owners is unchecked and search uses names only

#### Scenario: Keyboard operation
- **GIVEN** keyboard focus is on Include owners
- **WHEN** the user presses Space
- **THEN** the checked state toggles and matching updates using the existing query

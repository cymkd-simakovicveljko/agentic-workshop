## ADDED Requirements

### Requirement: Literal name filtering
The application SHALL match a project when its name contains the query after both use JavaScript toLowerCase(). It SHALL search names only, treat input literally, preserve source order and duplicates, and leave the source array unchanged. Accent folding and locale-specific case rules are outside scope.

#### Scenario: Mixed case substring
- **WHEN** the user types `aTlAs`
- **THEN** only Atlas and Atlas API appear, in that order

#### Scenario: Owner does not match
- **WHEN** the user types `team`
- **THEN** no projects appear, even though Borealis has owner Atlas team

#### Scenario: Literal punctuation
- **WHEN** the user types `.*`
- **THEN** no projects appear

#### Scenario: Accents stay distinct
- **WHEN** the user types `cafe`
- **THEN** Café does not match

### Requirement: Query whitespace
The application SHALL remove leading and trailing whitespace with JavaScript trim() before matching. An empty normalized query SHALL show every project in source order.

#### Scenario: Pasted name
- **WHEN** the user types `  ATLAS  `
- **THEN** only Atlas and Atlas API appear

#### Scenario: Clear or whitespace only
- **WHEN** the query is empty or contains only spaces and tabs
- **THEN** all four projects appear in source order

### Requirement: Result feedback
On every input event the application SHALL update the visible results without a network request. It SHALL show the count as `N of 4 projects`, expose it through a polite live region, and show `No projects found.` exactly when N is zero. The input SHALL have a visible associated label and remain keyboard operable.

#### Scenario: No result
- **WHEN** the user enters `zzzz`
- **THEN** the list is empty, the count reads `0 of 4 projects`, and `No projects found.` is visible

#### Scenario: Clear after no result
- **WHEN** the user clears the input after no results
- **THEN** the four projects return, the count reads `4 of 4 projects`, and the empty message is hidden

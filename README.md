# Regex Tester

Test JavaScript regular expressions against input text with live match highlighting and capture group display, entirely in the browser.

**Live Demo:** https://file-converter-free.com/en/developer-tools/regex-tester-online

## How It Works

`new RegExp(pattern, flags)` constructs the regex from the pattern and flags inputs. When the global flag is set, a `while((m = re.exec(text)) !== null)` loop collects all matches; without `g`, a single `exec` call is made. Each match position is used to wrap the matched substring in a `<mark>` element in the highlighted output by building the result string as segments of unmatched text and `<mark>` tags. Capture groups are extracted from the `m` array (indices 1 through `m.length - 1`) and displayed. Invalid regex patterns are caught in a try/catch and displayed as an error message.

## Features

- Full JavaScript `RegExp` support including flags (g, i, m, s, u)
- Global flag `exec` loop for all matches
- `<mark>`-based match highlighting in the text
- Capture group display per match
- Error display for invalid patterns

## Browser APIs Used

- (No external APIs — pure `RegExp`)

## Code Structure

| File | Description |
|------|-------------|
| `regex-tester.js` | `new RegExp(pattern, flags)` construction, `g`-flag `while exec` loop vs single `exec`, `<mark>` highlight builder, capture group extraction |

## Usage

| Element ID / Selector | Purpose |
|----------------------|---------|
| Pattern input | Regular expression pattern |
| Flags input | Regex flags (g, i, m, etc.) |
| Test text input/textarea | Text to test against |
| Test button | Run the regex |
| Highlighted output | Text with matches wrapped in `<mark>` |
| Matches/groups display | List of matches and capture groups |

## License

MIT

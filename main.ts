// The Meeting That Should Have Been One Line
// make.fun bounty: u-boothlord-the-meeting-that-should-have-been-one-line-a4af6d1c
//
// One sentence, three kills, no context needed:
//   1. The only person who can approve this isn't in the room, so the
//      meeting cannot decide anything at all.
//   2. Its only deliverable is another meeting, so it produces nothing.
//   3. The email asking them is still unread, so the ask was never made.
// After this line, nobody can justify holding the meeting.
//
// The program writes exactly that one line to /output/entry.txt:
// a single sentence, 153 characters, no trailing newline, so the file
// is the line and nothing else.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "The only person who can approve this isn't in the room, so this meeting's only deliverable is another meeting, and the email asking them is still unread.";

// The bounty requires exactly one line, 1-200 characters, with no
// leading/trailing whitespace and no embedded line breaks. Fail loudly
// instead of writing a malformed entry.
function validateEntry(line: string): void {
  if (line !== line.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (line.length < 1 || line.length > 200) {
    throw new Error(
      `entry must be 1-200 characters, got ${line.length}`,
    );
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("entry must be a single line with no line breaks");
  }
  if (!line.endsWith(".")) {
    throw new Error("entry must end with a full stop (one sentence)");
  }
}

validateEntry(LINE);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back and confirm the file on disk is exactly the validated line.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("written entry does not match the validated line");
}

console.log(LINE);

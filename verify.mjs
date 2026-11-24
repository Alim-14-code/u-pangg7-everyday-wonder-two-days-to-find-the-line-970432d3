import { readFileSync } from "node:fs";

// Verify the entry: exactly one sentence, at most 200 characters,
// matching the approved text.
const EXPECTED =
  "The coin I tossed in the fountain for luck came back in my change at the corner shop, still wet, still lucky.";

const text = readFileSync(new URL("./entry.txt", import.meta.url), "utf8").trimEnd();
if (text.length > 200) throw new Error("over 200 chars: " + text.length);
if (text.length < 1) throw new Error("entry is empty");
if (text !== EXPECTED) throw new Error("entry.txt does not match the approved entry text");
// Exactly one sentence: one terminal period, at the end, no other sentence ends.
const ends = (text.match(/[.!?]/g) || []).length;
if (ends !== 1 || !text.endsWith(".")) throw new Error("expected exactly 1 sentence, found " + ends + " terminators");
console.log("entry OK: 1 sentence, " + text.length + " chars");

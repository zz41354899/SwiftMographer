const fs = require("node:fs");

const STORYBOARD_MARKERS = [
  "Concept Summary",
  "Creative Direction",
  "Scene Timeline",
  "Remotion Storyboard Script",
  "Manim Scene Plan",
  "Markdown Storyboard",
];

const BLOCK_REASON =
  "Storyboard responses must end with one standalone ```md``` Markdown Storyboard block.";

function readStdin() {
  return fs.readFileSync(0, "utf8");
}

function getFenceTypes(message) {
  const fencePattern = /^```([A-Za-z0-9_-]+)\s*$/gm;
  const types = [];
  let match;

  while ((match = fencePattern.exec(message)) !== null) {
    types.push(match[1].toLowerCase());
  }

  return types;
}

function validate(payload) {
  const message = payload && typeof payload.last_assistant_message === "string"
    ? payload.last_assistant_message
    : "";
  const looksLikeStoryboard = STORYBOARD_MARKERS.some((marker) =>
    message.includes(marker)
  );
  const fenceTypes = getFenceTypes(message);
  const validTail = fenceTypes.length >= 1 && fenceTypes[fenceTypes.length - 1] === "md";

  if (!looksLikeStoryboard || validTail) {
    return { continue: true };
  }

  return {
    decision: "block",
    reason: BLOCK_REASON,
  };
}

function main() {
  let payload = {};

  try {
    payload = JSON.parse(readStdin() || "{}");
  } catch {
    console.log(JSON.stringify({ continue: true }));
    return;
  }

  console.log(JSON.stringify(validate(payload)));
}

main();

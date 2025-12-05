const fs = require("fs");

const filePath = "day5.txt";
const file = fs.readFileSync(filePath, "utf8");

const input = file.split("\n");


let ranges = [];
let items = [];
let index = 0;

while (index < input.length && input[index] !== "") {
  ranges.push(input[index]);
  index++;
}

index++;

for (; index < input.length; index++) {
  if (input[index] !== "") items.push(Number(input[index]));
}

const parsedRanges = ranges.map(r => {
  const [low, high] = r.split("-").map(Number);
  return { low, high };
});


function mergeRanges(ranges) {
  ranges.sort((a, b) => a.low - b.low);

  const merged = [ranges[0]];

  for (let i = 1; i < ranges.length; i++) {
    const last = merged[merged.length - 1];
    const current = ranges[i];

    if (current.low <= last.high + 1) {
      last.high = Math.max(last.high, current.high);
    } else {
      merged.push(current);
    }
  }

  return merged;
}

const mergedRanges = mergeRanges(parsedRanges);

// ----------------------------
// 4. Part 1: Count all fresh IDs
// ----------------------------
let totalFresh = 0;
for (const r of mergedRanges) {
  totalFresh += (r.high - r.low + 1);
}

// ----------------------------
// 5. Part 2: Find items that fall inside any range
// ----------------------------
function inRanges(x, ranges) {
  let left = 0;
  let right = ranges.length - 1;

  while (left <= right) {
    const mid = (left + right) >> 1;
    const r = ranges[mid];

    if (x < r.low) right = mid - 1;
    else if (x > r.high) left = mid + 1;
    else return true; // x is inside a range
  }

  return false;
}

const itemsInside = items.filter(item => inRanges(item, mergedRanges));

console.log("Part 1: Items that fall inside ranges:", itemsInside.length);
console.log("Part 2: Total fresh IDs =", totalFresh);

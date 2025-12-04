const fs = require("fs")
const filePath="day4.txt"
const input = fs.readFileSync(filePath, "utf8")

const lines = input.split("\n").map(row => row.split(""))
let positions = 0
let placesToRemove=[]
const dirs = [
  [-1, -1], // up-left
  [-1,  0], // up
  [-1,  1], // up-right
  [ 0, -1], // left
  [ 0,  1], // right
  [ 1, -1], // down-left
  [ 1,  0], // down
  [ 1,  1]  // down-right
];

// Make a deep copy of the grid
const result = lines.map(row => [...row]);

function removePaper(lines, part){
var removed = 0
for (let r = 0; r < lines.length; r++) {
  for (let c = 0; c < lines[r].length; c++) {

    let count = 0;

    for (const [dr, dc] of dirs) {
      if (lines[r + dr]?.[c + dc] === "@") {
        count++;
      }
    }

    // write into *result*, not grid
    if (count < 4 && lines[r][c]==="@") {
      result[r][c] = "x";
      removed+=1
    }
  }
}
if(part != 1){
positions=positions+removed
}
if(removed !=0){
removePaper(result)
}
if(part===1){
    var temp = removed
    removed = 0
    return temp
}

}removePaper(lines,2)

console.log("Part 1 solution: "+ removePaper(lines,1))
console.log("Part 2 solution: " +positions)
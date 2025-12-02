
//var input = ["11-22","95-115", "998-1012","1188511880-1188511890","222220-222224","446443-446449", "38593856-38593862"]
const fs = require('fs');

const filePath = 'day2.txt'; // Replace with the actual file path
const file = fs.readFileSync(filePath, 'utf8');
const input = file.split(",")

function partOne(input){
var invalidIDs=[]
var p1count = 0
var sum = 0

function hasRepeatedPair(num) {
    const str = String(num);
    const len = str.length;

    // Only even-length numbers can fully split into two halves
    if (len % 2 !== 0) return 0;

    const half = len / 2;
    const firstHalf = str.substring(0, half);
    const secondHalf = str.substring(half);

    return firstHalf === secondHalf ? invalidIDs.push(num) : 0;
}



for(data of input){
    var bounds = data.split("-")
    var lower = Number(bounds[0])
    var upper = Number(bounds[1])
    for(var i =lower; i <=upper; i++){
        p1count+=hasRepeatedPair(i)
    }
}
for(IDs of invalidIDs){
    sum+=IDs
}
return sum
}

function partTwo(input){
    var p2count=0
    var invalidIDs=[]
    var sum = 0
function isRepeatedSequence(num) {
    const str = String(num);
    const len = str.length;

    // try every possible sequence length from 1 up to half of the string
    for (let seqLen = 1; seqLen <= len / 2; seqLen++) {
        if (len % seqLen !== 0) continue; // the sequence must divide evenly

        const seq = str.substring(0, seqLen); // candidate repeating sequence
        const times = len / seqLen;
        const repeated = seq.repeat(times);   // construct repeated sequence

        if (repeated === str) {
            return invalidIDs.push(num); // invalid ID
        }
    }

    return 0; // valid ID
}


for(data of input){
    var bounds = data.split("-")
    var lower = Number(bounds[0])
    var upper = Number(bounds[1])
    for(var i =lower; i <=upper; i++){
        p2count+=isRepeatedSequence(i)
    }
}
for(IDs of invalidIDs){
    sum+=IDs
}
return sum
}
console.log("Part One Sum: "+partOne(input))
console.log("Part 2 Sum: " +partTwo(input))

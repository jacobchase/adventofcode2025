const fs = require("fs")
const filePath="day3.txt"
const file = fs.readFileSync(filePath, 'utf8');

var input=file.split("\n")
//var input = ["987654321111111", "811111111111119","234234234234278", "888911112111"]
var joltage=0
var output=0
//find largest number of 2 numbers
function findLargestCombination(input){
    var combinations=[]
    for(let i = 0; i < input.length; i++){
        for(let j=i+1; j< input.length;j++){
            combinations.push(input.charAt(i)+input.charAt(j))
        }
    }
    combinations.sort((a, b) => a - b)
    //console.log("Largest number in this set is " + combinations[combinations.length-1])
    return Number(combinations[combinations.length-1])
}

function findLargestTwelve(input) {
    const K = 12;
    const digits = input.split("");

    let toRemove = digits.length - K;
    let stack = [];

    for (let d of digits) {

        // While we can remove digits AND
        // there's something in the stack AND
        // the last digit in the stack is smaller than the new digit:
        while (toRemove > 0 && stack.length > 0 && stack[stack.length - 1] < d) {
            stack.pop();
            toRemove--;
        }

        // Always add the new digit
        stack.push(d);
    }

    // If we have too many digits, trim from the end
    while (stack.length > K) {
        stack.pop();
    }

    return Number(stack.join(""));
}

for (data of input){
joltage+=findLargestCombination(data)
}
for (data of input){
output+=findLargestTwelve(data)
}

console.log("Part 1 Output: "+ joltage)
console.log("Part 2 Output: "+output)
// L68
// L30
// R48
// L5
// R60
// L55
// L1
// L99
// R14
// L82

// L = minus
// R = plus

//need to add up how many times it passes 0, starting at 50
const fs = require('fs');

    const filePath = 'day1.txt'; // Replace with the actual file path
    const file = fs.readFileSync(filePath, 'utf8');
var data = file.split("\n")
//var data = ["L68", "L30", "R48", "L5", "R60", "L55", "L1", "L99", "R14", "L82"]

function partOne(data) {
    let place = 50;
    let count = 0;

    for (let i = 0; i < data.length; i++) {
        const direction = data[i][0];
        let amount = Number(data[i].substring(1));

        if (direction === "L") {
            place -= amount;
            // handle wrap-around
            if (place < 0) place = (place + 100) % 100;
        } else if (direction === "R") {
            place += amount;
            // handle wrap-around
            if (place >= 100) place = place % 100;
        }

        // count whenever landing exactly on 0
        if (place === 0) count++;
    }

    console.log("Part 1 Count:", count);
}



function partTwo(data) {
    let dial = 50;
    let count = 0;

    for (let i = 0; i < data.length; i++) {
        const direction = data[i][0];
        const amount = Number(data[i].substring(1));


        // full 100-step rotations
        count += Math.floor(amount / 100);

        // remaining steps after full rotations
        let steps = amount % 100;
        if (direction === "L") steps = -steps;

        const next = dial + steps;

        // detect passing 0
        if ((direction === "L" && next < 0 && (next + 100) !== 0 && dial !== 0) ||
            (direction === "R" && next > 99 && (next - 100) !== 0 && dial !== 0)) {
            count++;
        }

        // detect landing exactly on 0
        if (next % 100 === 0 && next !== dial) count++;

        // update dial safely
        dial = (next + 100) % 100;

    }
    console.log("Part 2 Count: " + Number(count))
    return count;
}

// Example usage:
// const dataStringsArr = fs.readFileSync('input.txt', 'utf8').split('\n');
// console.log(partTwo(dataStringsArr));

partOne(data)
partTwo(data)
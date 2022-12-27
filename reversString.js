function strRevers(str) {
    return str.split("").reverse().join("");
}

function findLongWord(str) {
    return str
        .replace(/[^0-9a-z ]/gi, "")
        .split(" ")
        .sort((a,b) => b.length - a.length)[0]
}

console.log(findLongWord("fuZn&!! 4eeee4444 time"));
console.log(findLongWord("I love22 dogs 88788"));
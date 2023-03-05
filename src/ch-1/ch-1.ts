import assert from "assert";
import { data } from "./data";

function arrayManipulation(N: number, queries: number[][]) {
    const prefixArr = Array(N).fill(0);

    for (let i = 0; i < queries.length; i++) {
        prefixArr[queries[i][0] - 1] += queries[i][2];
        prefixArr[queries[i][1]] -= queries[i][2];
    }

    for (let i = 0; i < prefixArr.length; i++) {
        prefixArr[i] += prefixArr[i - 1] || 0;
    }

    return prefixArr.reduce((prev, cur) => {
        return Math.max(prev, cur);
    }, 0);
}

console.time("start");
assert.strictEqual(arrayManipulation(10000000, data), 2497169732);
console.timeEnd("start");

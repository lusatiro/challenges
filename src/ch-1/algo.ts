import { data } from "./data";
import { data1 } from "./data-1";
import assert from "node:assert";

function isSubSet(set: number[], seti: number[]) {
    const QA = set[0];
    const QB = set[1];
    // const QK = set[2];

    const QAi = seti[0];
    const QBi = seti[1];
    // const QKi = seti[2];

    if (QA <= QBi && QAi <= QB) {
        return true;
    }

    return false;
}

function sortByAAsc(queries: number[][]) {
    queries.sort((a, b) => {
        return a[0] - b[0];
    });
}

function sortByBDesc(queries: number[][]) {
    queries.sort((a, b) => {
        return b[1] - a[1];
    });
}

function arrayManipulation(_: number, queries: number[][]) {
    let max = Math.max(...queries.map((it) => it[2]));

    sortByAAsc(queries);

    let sets = 0;

    let currentSet = queries[0];

    for (let i = 1; i < queries.length; i++) {
        const q = queries[i];

        const A = Math.max(q[0], currentSet[0]);
        const B = Math.min(q[1], currentSet[1]);

        if (A > B) {
            console.log("set", currentSet, q, queries[i + 1], i);
            currentSet = q;
            sets++;
            continue;
        }
        currentSet = [A, B, q[2] + currentSet[2]];
        max = Math.max(currentSet[2], max);
    }

    console.log(sets);
    return max;
}

console.time("start");
// assert.strictEqual(arrayManipulation(1, data), 2589508786);
// console.log("second");
// assert.strictEqual(
//     arrayManipulation(1, [
//         [1, 10, 2],
//         [2, 9, 7],
//         [3, 11, 19],
//         [4, 8, 26],
//         [5, 12, 8],
//     ]),
//     62
// );
assert.strictEqual(arrayManipulation(1, data1), 2497169732);
console.timeEnd("start");

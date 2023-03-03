import { data } from "./data";
import { data1 } from "./data-1";
import assert from "node:assert";

function getSubSet(set: number[], seti: number[]) {
    const QA = set[0];
    const QB = set[1];
    const QK = set[2];

    const QAi = seti[0];
    const QBi = seti[1];
    const QKi = seti[2];

    if (QA <= QBi && QAi <= QB) {
        const A = Math.max(QA, QAi);
        const B = Math.min(QB, QBi);
        const subSet = [A, B, QK + QKi];
        return subSet;
    }

    return null;
}

function sortByAAsc(queries: number[][]) {
    queries.sort((a, b) => {
        return a[0] - b[0];
    });
}

function arrayManipulation(_: number, queries: number[][]) {
    const querySize = queries.length;

    let max = -1;

    sortByAAsc(queries);

    let it = 0;

    for (let i = 0; i < querySize; i++) {
        let set = queries[i];
        max = Math.max(max, set[2]);

        if (i < querySize - 1) {
            const next = getSubSet(set, queries[i + 1]);
            if (!next) {
                continue;
            }
        }

        for (let j = i; j < querySize; j++) {
            it++;
            const seti = queries[j];

            if (i == j) {
                continue;
            }

            if (seti[0] > set[1]) {
                break;
            }

            const newSubSet = getSubSet(set, seti);

            if (!newSubSet) {
                continue;
            }

            set = newSubSet;

            max = Math.max(max, set[2]);
        }
    }

    console.log("iterations", it);
    return max;
}

console.time("start");
// assert.strictEqual(arrayManipulation(1, data), 2589508786);
// console.log("second");
assert.strictEqual(
    arrayManipulation(1, [
        [1, 10, 2],
        [2, 9, 7],
        [3, 11, 19],
        [4, 8, 26],
        [5, 12, 8],
    ]),
    2497169732
);
assert.strictEqual(arrayManipulation(1, data1), 2497169732);
console.timeEnd("start");

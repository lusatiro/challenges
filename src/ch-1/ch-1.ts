import { data } from "./data";
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

    return set;
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

    for (let i = 0; i < querySize; i++) {
        let set = queries[i];
        max = Math.max(max, set[2]);

        if (
            i + 1 < querySize &&
            set[0] == queries[i + 1][0] &&
            set[1] == queries[i + 1][1]
        ) {
            continue;
        }

        for (let j = 0; j < querySize; j++) {
            const seti = queries[j];

            if (i == j) {
                continue;
            }

            if (seti[0] > set[1]) {
                break;
            }

            set = getSubSet(set, seti);

            max = Math.max(max, set[2]);
        }
    }

    return max;
}

console.time("start");
assert.strictEqual(arrayManipulation(1, data), 2589508786);
console.timeEnd("start");

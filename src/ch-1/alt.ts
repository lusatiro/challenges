import { data1 } from "./data-1";
import assert from "node:assert";
import fs from "fs";

function getSubSet(set, seti) {
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

function sortQueriesB(queries) {
    queries.sort((a, b) => {
        return a[1] - b[1];
    });
}

function sortQueriesA(queries) {
    queries.sort((a, b) => {
        return a[0] - b[0];
    });
}

function routine(q, querySize, queries) {
    const subQueries = queries.slice(q, querySize + 1);

    sortQueriesA(subQueries);
    sortQueriesB(subQueries);

    querySize = subQueries.length;

    let max = -1;
    for (let i = 0; i < querySize; i++) {
        let set = subQueries[i];
        max = Math.max(max, set[2]);

        if (
            i + 1 < querySize &&
            set[0] == subQueries[i + 1][0] &&
            set[1] == subQueries[i + 1][1]
        ) {
            continue;
        }

        for (let j = 0; j < querySize; j++) {
            const seti = subQueries[j];

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
function arrayManipulation(_, queries) {
    const queriesSize = queries.length;

    sortQueriesA(queries);
    sortQueriesB(queries);
    // console.log("hello", __dirname);
    // fs.writeFileSync(
    //     `${__dirname}/../../../src/ch-1/ordered.json`,
    //     JSON.stringify(queries, null, 4),
    //     "utf-8"
    // );
    // return;

    let lastIndex = 0;
    for (let i = 0, j = 1; i < queriesSize - 1; i++, j++) {
        if (queries[j][1] > queries[i][0] || j == queriesSize - 1) {
            console.log("Index", queries[lastIndex], queries[j]);
            lastIndex = j;
        }
    }
}

console.time("start");
console.log(assert.strictEqual(arrayManipulation(1, data1), 2589508786));
console.timeEnd("start");

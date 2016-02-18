"use strict";
const ex1 = [8, 8, 7, 4];
const ex2 = [3, 3, 2, 2];
const ex3 = [4, 4, 6, 3, 3, 3, 4];
const ex4 = [4, 4, 6, 3, 3, 3, 4, 7];
const ex5 = [4, 4, 6, 3, 3, 3, 4, 15];
const ex6 = [4, 4, 6, 3, 3, 16, 15];

function findSmallest(array, excludeList) {
    excludeList = excludeList || [];

    const min = array
        .map((a, id) => Object.assign({}, a, {id: id}))
        .filter((_, i) => excludeList.indexOf(i) < 0)
        .reduce((acc, el) => {
            if (el.value < acc.min) {
                return {id: el.id, min: el.value};
            }
            return acc;
        }, {idx: -1, min: Infinity});


    return min.id;
}

function calcExcludeList(machines) {
    const exclusions = [machines.length - 1];

    machines.forEach((machine, machineIndex) => {
        const startsplitjobs = machine.jobs.filter((job) => job.cutoff === 1);

        if (startsplitjobs.length !== 0) {
            exclusions.push(machineIndex);
        }
    });

    return exclusions;
}

function LPT(jobs, NOF_machines, options) {
    //Initialize defaults
    options = options || {};
    const valueGetter = options.valueGetter || (a => a);
    const cutoff = options.cutoff || Infinity;

    //Sort in decreasing order
    jobs.sort((a, b) => valueGetter(b) - valueGetter(a));

    //Initialize machines
    const machines = new Array(NOF_machines).fill(0).map(() => ({value: 0, jobs: []}));

    //Place jobs
    jobs.forEach((job, jobIndex) => {
        const size = valueGetter(job);
        
        if (size > cutoff) {
            let machineIndex = findSmallest(machines, [machines.length - 1]);
            machineIndex = findSmallest(machines, calcExcludeList(machines));
            var p1 = Math.ceil(size / 2);
            var p2 = size - p1;

            var m1 = machines[machineIndex];
            var m2 = machines[machineIndex + 1];

            m1.value += p1;
            m2.value += p2;
            m1.jobs.push({id: jobIndex, size: p1, cutoff: 1});
            m2.jobs.push({id: jobIndex, size: p2, cutoff: -1});
        } else {
            const machineIndex = findSmallest(machines);
            machines[machineIndex].value += size;
            machines[machineIndex].jobs.push({id: jobIndex, size: size, cutoff: 0});
        }
    });

    // Sort internal jobs
    machines.forEach((machine) => {
        machine.jobs.sort((a, b) => a.cutoff - b.cutoff);
    });

    return machines;
}
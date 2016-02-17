ex1 = [8, 8, 7, 4];
ex2 = [3, 3, 2, 2];
ex3 = [4, 4, 6, 3, 3, 3, 4];
ex4 = [4, 4, 6, 3, 3, 3, 4, 7];
ex5 = [4, 4, 6, 3, 3, 3, 4, 15];
ex6 = [4, 4, 6, 3, 3, 16, 15];

function findSmallest(array, excludeList) {
    excludeList = excludeList || [];
    var smallest = Infinity;
    var smallestIndex = -1;
    for (var i = 0; i < array.length; i++) {
        var value = array[i].value;
        if (value < smallest && excludeList.indexOf(i) < 0) {
            smallest = value;
            smallestIndex = i;
        }
    }

    return smallestIndex;
}

function LPT(jobs, NOF_machines, options) {
    //Initialize defaults and sort jobs
    options = options || {};
    var valueGetter = options.valueGetter || function (a) {
            return a;
        };
    var cutoff = options.cutoff || Infinity;
    var comparator = function (a, b) {
        return valueGetter(b) - valueGetter(a);
    };
    jobs.sort(comparator);

    //Initialize machines
    var machines = [];
    for (var i = 0; i < NOF_machines; i++) {
        machines.push({value: 0, jobs: []});
    }

    //Place jobs
    for (var jobIndex = 0; jobIndex < jobs.length; jobIndex++) {
        var jobSize = valueGetter(jobs[jobIndex]);
        var machineIndex;
        if (jobSize > cutoff) {
            machineIndex = findSmallest(machines, [machines.length - 1]);
            var p1 = Math.ceil(jobSize / 2);
            var p2 = jobSize - p1;

            var m1 = machines[machineIndex];
            var m2 = machines[machineIndex + 1];

            m1.value += p1;
            m2.value += p2;
            m1.jobs.push({id: jobIndex, size: p1, cutoff: 1});
            m2.jobs.push({id: jobIndex, size: p2, cutoff: -1});
        } else {
            machineIndex = findSmallest(machines);
            machines[machineIndex].value += jobSize;
            machines[machineIndex].jobs.push({id: jobIndex, size: jobSize, cutoff: 0});
        }
    }

    // Sort internal jobs
    machines.forEach((machine) => {
        machine.jobs.sort((a, b) => a.cutoff - b.cutoff);
    });

    return machines;
}
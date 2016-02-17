ex1 = [8, 8, 7, 4];
ex2 = [3, 3, 2, 2];
ex3 = [4, 4, 6, 3, 3, 3, 4];

function findSmallest(array, excludeList) {
    excludeList = excludeList || [];
    var smallest = Infinity;
    var smallestIndex = -1;
    for (var i = 0; i < array.length; i++) {
        var value = array[i];
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
    var machineJobs = [];
    for (var i = 0; i < NOF_machines; i++) {
        machines.push(0);
        machineJobs.push([]);
    }

    for (var jobIndex = 0; jobIndex < jobs.length; jobIndex++) {
        var jobSize = valueGetter(jobs[jobIndex]);
        var machineIndex;
        if (jobSize > cutoff) {
            machineIndex = findSmallest(machines, [machines.length - 1]);
            var p1 = Math.ceil(jobSize / 2);
            var p2 = jobSize - p1;

            machineJobs[machineIndex].push(jobIndex);
            machineJobs[machineIndex+1].push(jobIndex);
            machines[machineIndex] += p1;
            machines[machineIndex+1] += p2;
        } else {
            machineIndex = findSmallest(machines);
            machineJobs[machineIndex].push(jobIndex);
            machines[machineIndex] += jobSize;
        }

    }

    console.log('machines', machines);
    console.log('machineJobs', machineJobs);
    return machineJobs;
}
function rainbow(numOfSteps, step) {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch(i % 6){
        case 0: r = 1; g = f; b = 0; break;
        case 1: r = q; g = 1; b = 0; break;
        case 2: r = 0; g = 1; b = f; break;
        case 3: r = 0; g = q; b = 1; break;
        case 4: r = f; g = 0; b = 1; break;
        case 5: r = 1; g = 0; b = q; break;
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}

function removeOldColumns() {
    var columns = Array.prototype.slice.call(document.querySelectorAll('.column'), 0);
    columns.forEach((column) => column.remove());
}

function createNewColumns(nof) {
    for (var i = 0; i < nof; i++) {
        var div = document.createElement('div');
        div.classList.add('column');
        div.style.width = '' + (100 / nof) + '%';
        document.body.appendChild(div);
    }
}

function draw(res, jobsLength) {
    res.forEach((column, i) => {
        const columnElement = document.querySelector('.column:nth-of-type('+(i+1)+')');
        column.jobs.forEach((job) => {
            const jobElement = document.createElement('p');
            jobElement.classList.add('job-element');
            jobElement.style.backgroundColor = rainbow(jobsLength, job.id);
            jobElement.style.height = ''+job.size * 3+'rem';
            jobElement.style.lineHeight = ''+job.size * 3+'rem';
            jobElement.textContent = job.size;

            columnElement.appendChild(jobElement);
        })
    });
}

function calc(jobs, columns, options) {
    var jobsLength = jobs.length;
    var paragrapfs = [];

    //Remove all old markup
    removeOldColumns();

    var res = LPT(jobs, columns, options);
    createNewColumns(res.length);

    draw(res, jobsLength);
}

console.log('To run: calc(<dataset>, <number of columns>, <option>)');
console.log('E.g calc(ex1, 4, {cutoff: 10})');
console.log('Predefined datasets; ex1 ex2 ex3 ex4 ex5 ex6');
console.log('Dataset example; ', ex4);

calc(ex1, 4);
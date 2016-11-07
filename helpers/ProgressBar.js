var ProgressBar = require('node-progress-3');

module.exports = {
    progressBar: function(total) {
        return new ProgressBar({
            complete: '=',
            incomplete: ' ',
            width: 50,
            total: 100,
            total: total,
            debounce: 800,
            format: "Progress [:bar] :percent"
        });
    }
};
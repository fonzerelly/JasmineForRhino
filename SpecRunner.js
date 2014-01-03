//imported by Rhino
/*global load*/
load("lib/Timer.js");
/*global cancelTimer*/
load("lib/jasmine-1.3.0/jasmine.js");
/*global jasmine*/

Array.prototype.slice.apply(arguments).forEach(function (spec) {
    load(spec);
});

function TextReporter() {
    this.textResult = "";
}

TextReporter.prototype = new jasmine.Reporter();

TextReporter.prototype.onRunnerFinished = function (callback) {
    this.callbackEnd = callback;
};

TextReporter.prototype.reportRunnerResults = function (runner) {        
    // When all the spec are finished //
    var result = runner.results();

    this.textResult += "Test results :: (" + result.passedCount + "/" + result.totalCount + ") :: " + (result.passed() ? "passed" : "failed");
    this.textResult += "\r\n";

    if (this.callbackEnd) {
        this.callbackEnd(this.textResult);
    }
};

TextReporter.prototype.reportSuiteResults = function (suite) {
    // When a group of spec has finished running //
    var result = suite.results();
    var description = suite.description;
};

TextReporter.prototype.reportSpecResults = function(spec) {
    // When a single spec has finished running //
    var result = spec.results();
    var that = this;

    that.textResult += "Spec :: " + spec.description + " :: " + (result.passed() ? "passed" : "failed");
    that.textResult += "\r\n";
    if (!result.passed()) {
        spec.results().getItems().forEach(function (item) {
            if (!item.passed()) {
                that.textResult += "\t" +item.message;
                that.textResult += "\r\n";
            }
        });
    }
};


var jasmineEnv = jasmine.getEnv();
jasmineEnv.updateInterval = 1000;

var txtReporter = new TextReporter();
txtReporter.onRunnerFinished(function (text) {
    // Do something with text //
    /*global print*/
    print (text);
    cancelTimer();
});

jasmineEnv.addReporter(txtReporter);

jasmine.getEnv().execute();


/*global java, print, JavaAdapter, load*/
//load("lib\\lodash.js");
/*global _*/
var setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    cancelTimer;

(function () {
    var timer = new java.util.Timer();
    var counter = 1; 
    var ids = {};


    setTimeout = function (fn,delay) {
        var id = counter += 1;
        ids[id] = new JavaAdapter(java.util.TimerTask,{run: fn});
        timer.schedule(ids[id],delay);
        return id;
    };

    clearTimeout = function (id) {
        ids[id].cancel();
        timer.purge();
        delete ids[id];
    };

    setInterval = function (fn,delay) {
        var id = counter += 1; 
        ids[id] = new JavaAdapter(java.util.TimerTask,{run: fn});
        timer.schedule(ids[id],delay,delay);
        return id;
    };

    clearInterval = clearTimeout;
    cancelTimer = function () {
        timer.cancel();
    };

}());

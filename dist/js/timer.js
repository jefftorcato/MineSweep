var min, sec, ms, timer_count, malt, salt, msalt;

var stopwatch = {
    start: function () {
        ms = 0;
        sec = 0;
        min = 0;
        timer_count = setInterval(function () {
            if (ms == 100) {
                ms = 0;
                if (sec == 60) {
                    sec = 0;
                    min++;
                } else {
                    sec++;
                }
            } else {
                ms++;
            }

            malt = stopwatch.pad(min);
            salt = stopwatch.pad(sec);
            msalt = stopwatch.pad(ms);

            stopwatch.update(malt + ":" + salt);
        }, 10);
    },
    stop: function () {
        clearInterval(timer_count);
    },

    update: function (txt) {
        var temp = document.getElementById("timer");
        temp.firstChild.nodeValue = txt;
    },

    pad: function (time) {
        var temp;
        if (time < 10) {
            temp = "0" + time;
        } else {
            temp = time;
        }
        return temp;
    }
}
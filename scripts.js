var startTime = 0;
var mouseover = 0;
var counter = 0;

function startTimer(length) {
    var myCounter = ++counter;
    var x = setInterval(function() {
        var now = new Date().getTime();
        distance = now - startTime;
    
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
        // Display the result in the element with id="demo"
        if(mouseover == 1) {
            document.getElementById("timer").innerHTML = "Timer: " + minutes + "m " + seconds + "s of: " + length + "m ";
        } else {
            document.getElementById("timer").innerHTML = "Timer";
        }

        if(counter != myCounter) {
            clearInterval(x);
        }
    }, 100);
}

document.getElementById("timer").onmouseover = function() {mouseover = 1;};
document.getElementById("timer").onmouseout = function() {mouseover = 0;};

function startExercise(exercise, length) {
    startTime = new Date().getTime();
    startTimer(length);
}

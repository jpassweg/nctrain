var startTime = 0;

var maxGoThroughPart = 0;

var mouseover = 0;
var showTimer = 0;

var counter = 0;

var times = [18, 50, 12, 50, 8, 4, 6, 45, 5, 7, 50];

function startTimerCounterWrapper(exercise) {
    var myCounter = ++counter;

    setColors(exercise);

    if(exercise == 5) {
        setTimeout(playSoundCounterWrapper, 4000, "konzsound", myCounter);
        setTimeout(startTimer, 82000, startTime, exercise, myCounter);
    } else {
        stopSound("konzsound")
        setTimeout(startTimer, 4000, startTime, exercise, myCounter);
    }
}

function startTimer(startTime, exercise, myCounter) {
    var length = times[exercise-1];

    if(counter == myCounter) {
        startTime = new Date().getTime();
        stopSound("konzsound");
        playSound("startsound");
    }

    
    var x = setInterval(function() {
        if(counter == myCounter) {
            var now = new Date().getTime();
            distance = now - startTime;
        
            // Time calculations for days, hours, minutes and seconds
            // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            // var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
            // Display the result in the element with id="demo"
            if(mouseover == 1 || showTimer == 1) {
                document.getElementById("timer").innerHTML = "Timer: " + minutes + "m " + seconds + "s of: " + length + "m ";
            } else {
                document.getElementById("timer").innerHTML = "Timer";
            }
            
            if(seconds >= length) {
                document.getElementById("part" + exercise).style.backgroundColor = 'rgb(15, 39, 59)';
                clearInterval(x);

                if(maxGoThroughPart >= exercise + 1) {
                    playSound("nextsound");
                    startTimerCounterWrapper(exercise + 1);
                } else {
                    playSound("stopsound");
                }
            }

        } else {
            document.getElementById("part" + exercise).style.backgroundColor = 'rgb(15, 39, 59)';
            clearInterval(x);
        }
    }, 100);
}

document.getElementById("timer").onmouseover = function() {mouseover = 1;};
document.getElementById("timer").onmouseout = function() {mouseover = 0;};

function startExercise(exercise) {
    maxGoThroughPart = 0;
    startTimerCounterWrapper(exercise);
}

function startPartOne() {
    maxGoThroughPart = 5;
    startTimerCounterWrapper(1);
}

function startPartTwo() {
    maxGoThroughPart = 11;
    startTimerCounterWrapper(6);
}

function setShowTimer() {
    showTimer = (showTimer + 1) % 2
}

function playSoundCounterWrapper(sound, myCounter) {
    if(myCounter == counter) {
        playSound(sound);
    }
}

function playSound(sound) {
    document.getElementById(sound).play();
}

function stopSound(sound) {
    document.getElementById(sound).pause();
    document.getElementById(sound).currentTime = 0;
}

function setColors(exercise) {
    var i;
    for (i = 1; i < 12; i++) { 
        if(i == exercise) {
            document.getElementById("part" + i).style.backgroundColor = 'rgb(65, 99, 119)';
        } else {
            document.getElementById("part" + i).style.backgroundColor = 'rgb(15, 39, 59)';
        }
    }
}
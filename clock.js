"use strict";
var $ = function(id) { return document.getElementById(id); };

//global stop watch timer variable and elapsed time object
var stopwatchTimer;
var elapsedMinutes = 0;
var elapsedSeconds = 0;
var elapsedMilliseconds = 0;

var displayCurrentTime = function() {
    	//create a date object and find out if it is AM or PM
	//display the hours, minutes, milliseconds and AM/PM on the webpage
    let today = new Date;
    let hrs = today.getHours();
    let ampm = hrs>=12 ? "PM":"AM";
    hrs = hrs<=12? hrs : (hrs-12);
    let min = today.getMinutes();
    let sec = today.getSeconds();
    //let millisec = today.getMilliseconds();
    $("hours").innerHTML = padSingleDigit(hrs);
    $("minutes").innerHTML = padSingleDigit(min);
    $("seconds").innerHTML = padSingleDigit(sec);
    $("ampm").innerHTML = ampm;
};

var padSingleDigit = function(num) {
	if (num < 10) {	return "0" + num; }
	else { return num; }
};
var watchInterval;
var tickStopwatch = function() {    
    // increment milliseconds by 10 milliseconds
    elapsedMilliseconds += 10;
    // if milliseconds total 1000, increment seconds by one and reset milliseconds to zero
    if(elapsedMilliseconds == 1000){
        elapsedSeconds++;
        elapsedMilliseconds = 0;
    }
    // if seconds total 60, increment minutes by one and reset seconds to zero
    if(elapsedSeconds==60){
        elapsedMinutes++;
        elapsedSeconds=0;
    }
    //display new stopwatch time
    
    $("s_minutes").innerHTML = elapsedMinutes;
    $("s_seconds").innerHTML = elapsedSeconds;
    $("s_ms").innerHTML = elapsedMilliseconds;
};

// event handler functions
var startStopwatch = function(evt) {
    // prevent default action of link
    evt.preventDefault();
    // do first tick of stop watch and then set interval timer to tick 
    // stop watch every 10 milliseconds. Store timer object in stopwatchTimer 
    // variable so next two functions can stop timer.
    tickStopwatch();
    watchInterval = setInterval(tickStopwatch,10);
};

var stopStopwatch = function(evt) {
    // prevent default action of link
    evt.preventDefault();
    // stop timer
    clearInterval(watchInterval);
};

var resetStopwatch = function(evt) {
    // prevent default action of link
    evt.preventDefault();
    // stop timer
    clearInterval(watchInterval);
    // reset elapsed variables and clear stopwatch display
    elapsedMinutes = 0;
    elapsedSeconds = 0;
    elapsedMilliseconds = 0;
    $("s_minutes").innerHTML = "00";
    $("s_seconds").innerHTML = "00";
    $("s_ms").innerHTML = "000";
};

window.onload = function() {
    // set initial clock display and then set interval timer to display
    // new time every second. Don't store timer object because it 
    // won't be needed - clock will just run.
    displayCurrentTime();
    setInterval(displayCurrentTime, 1000);
    
    // set up stopwatch event handlers
    $("start").addEventListener("click",startStopwatch);
    $("stop").addEventListener("click",stopStopwatch);
    $("reset").addEventListener("click",resetStopwatch);
};
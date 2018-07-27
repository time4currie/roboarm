/*
 * Author      :  Jackson Currie
 * Date        :  2018-07-09
 * Description :  Script for moving the controls
 */

// Socket
var socket = io();

// Sliders
var sliderRotate = document.getElementById("sliderRotate");
var sliderForward = document.getElementById("sliderForward");
var sliderUp = document.getElementById("sliderUp");
var sliderIn = document.getElementById("sliderIn");

// Buttons
var left = document.getElementById("left");
var right = document.getElementById("right");
var forward = document.getElementById("forward");
var back  = document.getElementById("back");
var up = document.getElementById("up");
var down = document.getElementById("down");
var ins = document.getElementById("in");
var out = document.getElementById("out");

// Value areas
var valueRotate = document.getElementById("valueRotate");
var valueForward = document.getElementById("valueForward");
var valueUp = document.getElementById("valueUp");
var valueIn = document.getElementById("valueIn");

// When rotate slider is changed
sliderRotate.addEventListener("input", () => 
    // Send to all users
    socket.emit("rotate", sliderRotate.value)
);

// When forward slider is changed
sliderForward.addEventListener("input", () =>
    // Send to all users
    socket.emit("forward", sliderForward.value)
);

// When up slider is changed
sliderUp.addEventListener("input", () => 
    // Send to all users
    socket.emit("up", sliderUp.value)
);

// When in slider is changed
sliderIn.addEventListener("input", () => 
    // Send to all users
    socket.emit("in", sliderIn.value)
);

// When left button pressed
left.addEventListener("click", () => {
    // Change slider
    sliderRotate.value -= 20;
    socket.emit("rotate", sliderRotate.value);
});

// When right button pressed
right.addEventListener("click", () => {
    // Change slider
    sliderRotate.value = +sliderRotate.value + 20;
    socket.emit("rotate", sliderRotate.value);
});

// When back button pressed
back.addEventListener("click", () => {
    // Change slider
    sliderForward.value -= 20;
    socket.emit("forward", sliderForward.value);
});

// When forward button pressed
forward.addEventListener("click", () => {
    // Change slider
    sliderForward.value = +sliderForward.value + 20;
    socket.emit("forward", sliderForward.value);
});

// When down button pressed
down.addEventListener("click", () => {
    // Change slider
    sliderUp.value -= 20;
    socket.emit("up", sliderUp.value);
});

// When up button pressed
up.addEventListener("click", () => {
    // Change Slider
    sliderUp.value = +sliderUp.value + 20;
    socket.emit("up", sliderUp.value);
});

// When down button pressed
out.addEventListener("click", () => {
    // Change slider
    sliderIn.value -= 20;
    socket.emit("in", sliderIn.value);
});

// When up button pressed
ins.addEventListener("click", () => {
    // Change Slider
    sliderIn.value = +sliderIn.value + 20;
    socket.emit("in", sliderIn.value);
});

// Recieved new rotate value
socket.on("valueRotate", (data) => {
    // Change slider
    sliderRotate.value = data;
    valueRotate.innerHTML = 'Value: ' + data;
});
  
// Recieved new forward value
socket.on("valueForward", (data) => {
    // Change slider
    sliderForward.value = data;
    valueForward.innerHTML = 'Value: ' + data;
});
  
// Recieved new up value
socket.on("valueUp", (data) => {
    // Change slider
    sliderUp.value = data;
    valueUp.innerHTML = 'Value: ' + data;
});

// Recieved new up value
socket.on("valueIn", (data) => {
    // Change slider
    sliderIn.value = data;
    valueIn.innerHTML = 'Value: ' + data;
});
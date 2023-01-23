"use strict";

const a = 1;
const b = 2;
console.log(a + b);

document.querySelector("#dont-click-me").addEventListener("click", function () {
  console.log("You clicked me!");
});

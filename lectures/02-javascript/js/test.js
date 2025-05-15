(function () {
  "use strict";

  const a = 1;
  const b = 2;
  console.log(a + b);

  window.onload = function () {
    document
      .querySelector("#dontClickMe")
      .addEventListener("click", function () {
        console.log("You clicked me!");
      });
  };
})();

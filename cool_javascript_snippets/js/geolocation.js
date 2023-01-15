(function () {
  "use strict";

  function getGeolocation() {
    document.querySelector("#latitude span").innerHTML = "loading...";
    document.querySelector("#longitude span").innerHTML = "loading...";
    navigator.geolocation.getCurrentPosition(success);
  }

  function success(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    document.querySelector("#latitude span").innerHTML = lat;
    document.querySelector("#longitude span").innerHTML = long;
  }

  window.addEventListener("load", function () {
    document.getElementById("getgeo").onclick = getGeolocation;
  });
})();

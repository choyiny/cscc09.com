// closure
(function () {
  "use strict";
  function update() {
    // reset chirps section
    document.querySelector(".chirps").innerHTML = "";
    // loop through chirps and append to DOM
    ChirpService.getChirps().forEach(function (chirp) {
      const newChirp = document.createElement("div");
      newChirp.classList.add("chirp");
      newChirp.innerHTML = `
        <p>${chirp}</p>
      `;
      document.querySelector(".chirps").prepend(newChirp);
    });
  }

  // DOM is ready listener
  window.addEventListener("DOMContentLoaded", function () {
    update();

    document
      .querySelector("#dont-click-me")
      .addEventListener("click", function () {
        console.log("You clicked me!")
      });

    // form submit listener
    document
      .querySelector("#new-chirp")
      .addEventListener("submit", function (e) {
        // prevent default form submission behavior
        e.preventDefault();
        // read form - this depends on [name] attributes
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);

        if (formProps.chirp.length === 0) {
          return;
        }

        ChirpService.addChirp(formProps.chirp);
        update();

        // clear input field
        e.target.reset();
      });
  });
})();

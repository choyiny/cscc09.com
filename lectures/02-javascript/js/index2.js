/**
 * In index2.js, we use the MVVM pattern (this is the ViewModel) to obtain things from
 * a ChirpService (that provides operations to create, read, update, delete) and display
 * them in the UI.
 *
 * There is now separation of concerns between the UI and the data.
 *
 * This is a step in the right direction but only works for the most basic of applications.
 */

// closure
(function () {
  "use strict";
  function update() {
    // reset chirps section
    document.querySelector("#chirpsList").innerHTML = "";
    // loop through chirps and append to DOM
    ChirpService.getChirps().forEach(function (chirp) {
      const newChirp = document.createElement("div");
      newChirp.classList.add("chirp");
      newChirp.innerHTML = `
        <p>${chirp.content}</p>
      `;
      document.querySelector("#chirpsList").prepend(newChirp);
    });
  }

  // DOM is ready listener
  window.addEventListener("DOMContentLoaded", function () {
    update();

    document
      .querySelector("#dontClickMe")
      .addEventListener("click", function () {
        console.log("You clicked me!");
      });

    // form submit listener
    document
      .querySelector("#newChirp")
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

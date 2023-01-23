// closure
(function () {
  "use strict";
  // DOM is ready listener
  window.addEventListener("DOMContentLoaded", function () {
    // form submit listener
    document
      .querySelector("#new-chirp")
      .addEventListener("submit", function (e) {
        // prevent default form submission behavior
        e.preventDefault();
        // read form - this depends on [name] attributes
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        // create new div
        const newChirp = document.createElement("div");
        newChirp.classList.add("chirp"); // <div class="chirp"></div>
        newChirp.innerHTML = `
        <p>${formProps.chirp}</p>
        `; // <div class="chirp"><p>CSCC09 is awesome.</p></div>
        // append to DOM
        document.querySelector(".chirps").prepend(newChirp);

        // clear input field
        e.target.reset();
      });
  });
})();

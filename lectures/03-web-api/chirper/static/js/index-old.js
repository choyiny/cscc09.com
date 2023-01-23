// closure
(function () {
  "use strict";
  function createChirpElement(chirp) {
    const newChirp = document.createElement("div");
    newChirp.classList.add("chirp");
    newChirp.innerHTML = `
      <p class="chirp-content">${chirp.content}</p>
      <form class="edit-chirp-form hidden">
        <input name="chirp" type="text" class="edit-chirp" placeholder="Edit Chirp">
        <input type="submit" class="btn btn-blue" value="Confirm" />
      </form>
      <small class="edit">Edit</small>
    `;
    // uniquely label each element
    newChirp.dataset.id = chirp.id;

    // clicking on edit
    newChirp.querySelector(".edit").addEventListener("click", function () {
      newChirp.querySelector(".edit-chirp-form").classList.remove("hidden");
      newChirp.querySelector(".edit-chirp").value = chirp.content;
      newChirp.querySelector(".edit").classList.add("hidden");
      newChirp.querySelector(".chirp-content").classList.add("hidden");
    });

    // clicking on confirm
    newChirp
      .querySelector(".edit-chirp-form")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        ChirpService.editChirp(chirp.id, formProps.chirp);
        // update DOM
        newChirp.querySelector(".edit-chirp-form").classList.add("hidden");
        newChirp.querySelector(".edit").classList.remove("hidden");
        newChirp.querySelector(".chirp-content").classList.remove("hidden");
        newChirp.querySelector(".chirp-content").innerHTML = formProps.chirp;
        // update();
      });

    return newChirp;
  }

  function update() {
    // reset chirps section
    document.querySelector(".chirps").innerHTML = "";
    // loop through chirps and append to DOM
    ChirpService.getChirps().forEach(function (chirp) {
      const newChirp = createChirpElement(chirp);
      // prepend to DOM
      document.querySelector(".chirps").prepend(newChirp);
    });
  }

  // DOM is ready listener
  window.addEventListener("DOMContentLoaded", function () {
    update();

    document
      .querySelector("#dont-click-me")
      .addEventListener("click", function () {
        // randomly remove a chirp
        const chirps = ChirpService.getChirps();
        const randomIndex = Math.floor(Math.random() * chirps.length);
        document
          .querySelector(".chirps [data-id='" + randomIndex + "']")
          .remove();
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

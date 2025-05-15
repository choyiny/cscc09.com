/**
 * In index3.js, we implement functionality to create and edit chirps from the UI and sync that with
 * ChirpService. We also demonstrate how to split out code into smaller functions.
 */

// closure
(function () {
  "use strict";

  /**
   * This is an object that stores the "state" of the UI. This is a common pattern in UI development.
   * Usually, it is good to show what is expected in the state.
   */
  const state = {
    chirps: [],
  };

  const onEditButtonClickedListeners = [];

  /**
   * This function returns a new ChirpComponent.
   *
   * It takes in a chirp object and returns a new div element with the chirp content and an edit form.
   *
   * Note that at this stage we already attach all the click listeners to the component. Also note that
   * when creating this component, we are not adding it to the DOM.
   * We want the caller to decide where to put it.
   *
   * If you want, to reduce the number of lines of code in this file, you can refactor components into separate files too.
   * Ensure you include the .js files in the HTML though!
   */
  function ChirpComponent(chirp) {
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
    // uniquely label each element - give the ability for this element to be targeted
    // from outside the component. We should not be referring to this inside the component.
    newChirp.dataset.id = chirp.id;

    // attach click listeners when creating the component
    // putting code close to where a developer thinks it may live

    // clicking on edit
    newChirp.querySelector(".edit").addEventListener("click", function () {
      // notice here I am not modifying the CSS, but adding and removing classes.
      // going back to the topic of "where is my css?", this makes it easier to debug.
      newChirp.querySelector(".edit-chirp-form").classList.remove("hidden");
      newChirp.querySelector(".edit-chirp").value = chirp.content;
      newChirp.querySelector(".edit").classList.add("hidden");
      newChirp.querySelector(".chirp-content").classList.add("hidden");

      // when an edit button is clicked, we want to hide all other edit forms. This means
      // we need to notify all other chirp components that an edit button was clicked.
      onEditButtonClickedListeners.push((chirpId) => {
        if (chirpId !== chirp.id) {
          newChirp.querySelector(".edit-chirp-form").classList.add("hidden");
          newChirp.querySelector(".edit").classList.remove("hidden");
          newChirp.querySelector(".chirp-content").classList.remove("hidden");
        }
      });

      onEditButtonClickedListeners.forEach((listener) => listener(chirp.id));
    });

    // clicking on confirm
    newChirp
      .querySelector(".edit-chirp-form")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        ChirpService.editChirp(chirp.id, formProps.chirp);

        // method 1: I show that you do not have to re-fetch the chirps from the service
        // you can just update the state directly.
        state.chirps.find((c) => c.id === chirp.id).content = formProps.chirp;
        updateChirpList();
      });

    return newChirp;
  }

  /**
   * this function is run every time state.chirps is updated. It updates the chirps section.
   * In modern frameworks, instead of doing this, it will do a DOM differential update
   * to be more efficient.
   */
  function updateChirpList() {
    // reset chirps section
    document.querySelector("#chirpsList").innerHTML = "";
    // loop through state.chirps and append to DOM
    state.chirps.forEach(function (chirp) {
      const newChirp = ChirpComponent(chirp);
      // prepend to DOM
      document.querySelector("#chirpsList").prepend(newChirp);
    });
  }

  // DOM is ready listener
  window.addEventListener("DOMContentLoaded", function () {
    // the first thing happens when the DOM loads
    state.chirps = ChirpService.getChirps();
    updateChirpList();

    /**
     * Top level event listeners, usually top level buttons and form submissions. You should add
     * document listeners only when they already exist in the page. If you are adding new elements
     * like ChirpComponent, then the event listeners should be inside the Component, and not at the top level.
     */

    // disable submit button when input is empty
    const newChirpInput = document.querySelector("#newChirp #newChirpInput");
    const submitChirpButton = document.querySelector("#submitChirp");
    submitChirpButton.disabled = true;
    newChirpInput.addEventListener("input", function () {
      submitChirpButton.disabled = newChirpInput.value.length == 0;
    });

    // When a new Chirp is submitted through the UI
    document
      .querySelector("#newChirp")
      .addEventListener("submit", function (e) {
        // prevent default form submission behavior - which is to reload the page
        e.preventDefault();
        // read form - this depends on [name] attributes
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);

        if (formProps.chirp.length === 0) {
          return;
        }

        ChirpService.addChirp(formProps.chirp);

        // method 2: In here, I demonstrate that you can re-fetch the chirps from the service instead
        // of modifying the state directly.
        state.chirps = ChirpService.getChirps();
        updateChirpList();

        // clear input field
        e.target.reset();
      });
  });
})();

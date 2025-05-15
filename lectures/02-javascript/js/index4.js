/**
 * In index3.js, we implement functionality to create and edit chirps from the UI and sync that with
 * ChirpService. We also demonstrate how to split out code into smaller functions.
 */

// closure
(function () {
  "use strict";

  // define the states we are going to use
  const [chirps, getChirps, setChirps] = meact.useState([]);

  // this keeps track of the active chirp that is being edited
  const [activeChirp, getActiveChirp, setActiveChirp] = meact.useState(null);

  const onEditButtonClickedListeners = [];

  /**
   * A ChirpComponent DOM element that represents a single chirp.
   * It contains the chirp content, an edit form, and an edit button.
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
      setActiveChirp(chirp.id);
      // notice here I am not modifying the CSS, but adding and removing classes.
      // going back to the topic of "where is my css?", this makes it easier to debug.
      newChirp.querySelector(".edit-chirp-form").classList.remove("hidden");
      newChirp.querySelector(".edit-chirp").value = chirp.content;
      newChirp.querySelector(".edit").classList.add("hidden");
      newChirp.querySelector(".chirp-content").classList.add("hidden");
    });

    meact.useEffect(() => {
      // when an edit button is clicked, we want to hide all other edit forms. This means
      // we need to notify all other chirp components that an edit button was clicked.
      if (activeChirp !== chirp.id) {
        newChirp.querySelector(".edit-chirp-form").classList.add("hidden");
        newChirp.querySelector(".edit").classList.remove("hidden");
        newChirp.querySelector(".chirp-content").classList.remove("hidden");
      }
    }, [activeChirp]);

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
        const newChirpList = getChirps();
        newChirpList.find((c) => c.id === chirp.id).content = formProps.chirp;
        setChirps(newChirpList);
      });

    return newChirp;
  }

  // DOM is ready listener
  window.addEventListener("DOMContentLoaded", function () {
    setChirps(ChirpService.getChirps());
    meact.useEffect(() => {
      document.querySelector("#chirpsList").innerHTML = "";
      // loop through state and append to DOM
      getChirps().forEach(function (chirp) {
        const newChirp = ChirpComponent(chirp);
        // prepend to DOM
        document.querySelector("#chirpsList").prepend(newChirp);
      });
    }, [chirps]);

    // disable submit button when input is empty
    const newChirpInput = document.querySelector("#newChirp #newChirpInput");
    const submitChirpButton = document.querySelector("#submitChirp");
    submitChirpButton.disabled = true;
    debugger;
    newChirpInput.addEventListener("input", function () {
      submitChirpButton.disabled = newChirpInput.value.length == 0;
    });

    this.document
      .querySelector("#dontClickMe")
      .addEventListener("click", function () {
        setActiveChirp(null);
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
        setChirps(ChirpService.getChirps());

        // clear input field
        e.target.reset();
      });
  });
})();

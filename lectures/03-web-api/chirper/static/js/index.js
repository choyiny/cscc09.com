/**
 * We rewrote index4.js in the previous example using the following Github Copilot prompt.
 *
 * ChirpService now returns a promise that resolves to the response of the fetch call instead of returning the value directly.
 * Rewrite the code to use the new API. Instead of
 * setChirps(ChirpService.getChirps());
 * Do this:
 * ChirpService.getChirps().then((result) => setChirps(result.chirps));
 */

// closure
(function () {
  "use strict";

  // define the states we are going to use
  const [chirps, getChirps, setChirps] = meact.useState([]);

  // this keeps track of the active chirp that is being edited
  const [activeChirp, getActiveChirp, setActiveChirp] = meact.useState(null);

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
    newChirp.dataset.id = chirp.id;

    // clicking on edit
    newChirp.querySelector(".edit").addEventListener("click", function () {
      setActiveChirp(chirp.id);
      newChirp.querySelector(".edit-chirp-form").classList.remove("hidden");
      newChirp.querySelector(".edit-chirp").value = chirp.content;
      newChirp.querySelector(".edit").classList.add("hidden");
      newChirp.querySelector(".chirp-content").classList.add("hidden");
    });

    meact.useEffect(() => {
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

        ChirpService.editChirp(chirp.id, formProps.chirp).then(() => {
          const newChirpList = getChirps();
          newChirpList.find((c) => c.id === chirp.id).content = formProps.chirp;
          setChirps(newChirpList);
        });
      });

    return newChirp;
  }

  // DOM is ready listener
  window.addEventListener("DOMContentLoaded", function () {
    ChirpService.getChirps().then((result) => {
      setChirps(result.chirps);
    });

    meact.useEffect(() => {
      document.querySelector("#chirpsList").innerHTML = "";
      getChirps().forEach(function (chirp) {
        const newChirp = ChirpComponent(chirp);
        document.querySelector("#chirpsList").append(newChirp);
      });
    }, [chirps]);

    // disable submit button when input is empty
    const newChirpInput = document.querySelector("#newChirp #newChirpInput");
    const submitChirpButton = document.querySelector("#submitChirp");
    submitChirpButton.disabled = true;

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
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);

        if (formProps.chirp.length === 0) {
          return;
        }

        ChirpService.addChirp(formProps.chirp)
          .then(() => ChirpService.getChirps())
          .then((result) => setChirps(result.chirps));

        e.target.reset();
      });
  });
})();

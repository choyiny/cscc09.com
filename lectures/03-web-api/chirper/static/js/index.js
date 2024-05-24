(function () {
  "use strict";

  const state = {
    chirps: [],
  };

  const onEditButtonClickedListeners = [];

  function createChirpComponent(chirp) {
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
    newChirp.querySelector(".edit").addEventListener("click", function () {
      newChirp.querySelector(".edit-chirp-form").classList.remove("hidden");
      newChirp.querySelector(".edit-chirp").value = chirp.content;
      newChirp.querySelector(".edit").classList.add("hidden");
      newChirp.querySelector(".chirp-content").classList.add("hidden");

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
        ChirpService.editChirp(chirp.id, formProps.chirp).then((result) => {
          state.chirps.find((c) => c.id === chirp.id).content = result.content;
          updateChirpList();
        });
      });

    return newChirp;
  }

  function updateChirpList() {
    if (state.chirps.length === 0) {
      document.querySelector("#chirpsList").innerHTML = `
      <div class="chirps-placeholder">No chirps to display</div>
      `;
    }
    document.querySelector("#chirpsList").innerHTML = "";
    state.chirps.forEach((chirp) => {
      const newChirp = createChirpComponent(chirp);
      document.querySelector("#chirpsList").append(newChirp);
    });
  }

  window.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#chirpsList").innerHTML = `
      <div class="chirps-placeholder">Trying to load your chirps.</div>
    `;
    ChirpService.getChirps().then((result) => {
      state.chirps = result.chirps;
      updateChirpList();
    });

    const newChirpInput = document.querySelector("#newChirp #newChirpInput");
    const submitChirpButton = document.querySelector("#submitChirp");
    submitChirpButton.disabled = true;
    newChirpInput.addEventListener("input", function () {
      submitChirpButton.disabled = newChirpInput.value.length == 0;
    });

    document
      .querySelector("#dontClickMe")
      .addEventListener("click", function () {
        ChirpService.getChirps().then((result) => {
          const chirps = result.chirps;
          const randomId = chirps[Math.floor(Math.random() * chirps.length)].id;
          ChirpService.deleteChirp(randomId).then(() => {
            document
              .querySelector(".chirps [data-id='" + randomId + "']")
              .remove();

            state.chirps = state.chirps.filter((c) => c.id !== randomId);
          });
        });
      });

    document
      .querySelector("#newChirp")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);

        if (formProps.chirp.length === 0) {
          return;
        }
        document.querySelector("#submitChirp").disabled = true;
        ChirpService.addChirp(formProps.chirp).then((result) => {
          state.chirps.unshift(result);
          updateChirpList();
          document.querySelector("#submitChirp").disabled = false;
        });

        e.target.reset();
      });
  });
})();

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
      <img class="chirp-image hidden" />
      <form class="edit-chirp-form hidden">
        <input name="chirp" type="text" class="edit-chirp" placeholder="Edit Chirp">
        <input type="submit" class="btn btn-blue edit-chirp-submit" value="Confirm" />
      </form>
      <div class="actions">
        <small class="action edit-button">Edit</small>
        <small class="action view-replies">View Replies</small>
      </div>
      <div class="replies"></div>
    `;
    // show image if it exists
    // ideally we do not want to expose imageMetadata to the client because it is not useful. Instead, expose a
    // custom attribute imageUrl for example.
    if (chirp.imageMetadata) {
      newChirp.querySelector(".chirp-image").src = `/chirps/${chirp.id}/image`;
      newChirp.querySelector(".chirp-image").classList.remove("hidden");
    }

    // uniquely label each element
    newChirp.dataset.id = chirp.id;

    if (!(chirp.Chirps?.length > 0)) {
      newChirp.querySelector(".view-replies").classList.add("hidden");
    }

    // clicking on edit
    newChirp
      .querySelector(".edit-button")
      .addEventListener("click", function () {
        onEditButtonClickedListeners.forEach((listener) => listener(chirp.id));
        newChirp.querySelector(".edit-chirp-form").classList.remove("hidden");
        newChirp.querySelector(".edit-chirp").value = chirp.content;
        newChirp.querySelector(".actions").classList.add("hidden");
        newChirp.querySelector(".chirp-content").classList.add("hidden");
      });

    onEditButtonClickedListeners.push((chirpId) => {
      if (chirpId !== chirp.id) {
        newChirp.querySelector(".edit-chirp-form").classList.add("hidden");
        newChirp.querySelector(".edit-chirp").classList.remove("hidden");
        newChirp.querySelector(".actions").classList.remove("hidden");
        newChirp.querySelector(".chirp-content").classList.remove("hidden");
      }
    });

    // clicking on view replies
    newChirp
      .querySelector(".view-replies")
      .addEventListener("click", function () {
        const replies = chirp.Chirps;
        const repliesContainer = document.createElement("div");
        repliesContainer.classList.add("replies-container");
        replies.forEach((reply) => {
          const replyComponent = createChirpComponent(reply);
          repliesContainer.appendChild(replyComponent);
        });
        newChirp.querySelector(".replies").innerHTML = "";
        newChirp.querySelector(".replies").appendChild(repliesContainer);
      });

    // clicking on confirm
    newChirp
      .querySelector(".edit-chirp-form")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        // disable submit button
        e.target.querySelector(".edit-chirp-submit").disabled = true;

        ChirpService.editChirp(chirp.id, formProps.chirp).then(() => {
          // update DOM
          newChirp.querySelector(".edit-chirp-form").classList.add("hidden");
          newChirp.querySelector(".actions").classList.remove("hidden");
          newChirp.querySelector(".chirp-content").classList.remove("hidden");
          newChirp.querySelector(".chirp-content").innerHTML = formProps.chirp;

          // enable submit button
          e.target.querySelector(".edit-chirp-submit").disabled = false;
        });
      });

    return newChirp;
  }

  function updateChirpList() {
    if (state.chirps.length === 0) {
      document.querySelector("#chirpsList").innerHTML = `
      <div class="chirps-placeholder">No chirps to display</div>
      `;
    } else {
      document.querySelector("#chirpsList").innerHTML = "";
      state.chirps.forEach((chirp) => {
        const newChirp = createChirpComponent(chirp);
        document.querySelector("#chirpsList").append(newChirp);
      });
    }
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

        if (formProps.content.length === 0) {
          return;
        }
        document.querySelector("#submitChirp").disabled = true;
        ChirpService.addChirp(formData).then((result) => {
          state.chirps.unshift(result);
          updateChirpList();
          document.querySelector("#submitChirp").disabled = false;
        });

        e.target.reset();
      });
  });
})();

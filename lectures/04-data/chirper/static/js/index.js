// closure
(function () {
  "use strict";
  function createChirpComponent(chirp) {
    const newChirp = document.createElement("div");
    newChirp.classList.add("chirp");
    newChirp.innerHTML = `
      <p class="chirp-content">${chirp.content}</p>
      <img src="/chirps/${chirp.id}/image" class="chirp-image hidden" />
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
        newChirp.querySelector(".edit-chirp-form").classList.remove("hidden");
        newChirp.querySelector(".edit-chirp").value = chirp.content;
        newChirp.querySelector(".actions").classList.add("hidden");
        newChirp.querySelector(".chirp-content").classList.add("hidden");
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

        ChirpApiService.editChirp(chirp.id, formProps.chirp).then(() => {
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

  // update function returns a promise too
  function update() {
    // loop through chirps and append to DOM
    return ChirpApiService.getChirps().then((response) => {
      // reset chirps section
      document.querySelector(".chirps").innerHTML = "";
      const chirps = response.chirps;
      chirps.forEach(function (chirp) {
        const newChirp = createChirpComponent(chirp);
        // prepend to DOM
        document.querySelector(".chirps").append(newChirp);
      });
    });
  }

  // DOM is ready listener
  window.addEventListener("DOMContentLoaded", function () {
    update();

    document
      .querySelector("#dont-click-me")
      .addEventListener("click", function () {
        // randomly remove a chirp
        ChirpApiService.getChirps().then((response) => {
          const chirps = response.chirps;
          const randomIndex = Math.floor(Math.random() * chirps.length);
          const removeChirpId = chirps[randomIndex].id;
          ChirpApiService.deleteChirp(removeChirpId).then((res) => {
            document
              .querySelector(".chirps [data-id='" + removeChirpId + "']")
              .remove();
          });
        });
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

        // disable submit button
        e.target.querySelector(".chirp-submit").disabled = true;

        if (formProps.content.length === 0) {
          e.target.querySelector(".chirp-submit").disabled = false;
          return;
        }

        ChirpApiService.addChirp(formData)
          .then(update)
          .then(() => {
            // clear input field
            e.target.reset();
            // enable submit button
            e.target.querySelector(".chirp-submit").disabled = false;
          });

        // more lines of code here
      });
  });
})();

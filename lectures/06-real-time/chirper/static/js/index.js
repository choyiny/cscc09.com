/**
 * We rewrote index4.js in the previous example using the following Github Copilot prompt.
 *
 * We define a new state variable chirpsLoading to keep track of the loading state of the chirps.
 * We want to rewrite the file such that before we call setChirps outside of promise, we set chirpsLoading to true.
 * After we call setChirps, we set chirpsLoading to false.
 * We also want to show a loading spinner while chirpsLoading is true.
 */

(function () {
  "use strict";

  // define the states we are going to use
  const [chirps, getChirps, setChirps] = meact.useState([]);
  const [chirpsLoading, getChirpsLoading, setChirpsLoading] =
    meact.useState(null);

  const [infiniteLoading, getInfiniteLoading, setInfiniteLoading] =
    meact.useState(false);

  const [activeChirp, getActiveChirp, setActiveChirp] = meact.useState(null);
  const [cursor, getCursor, setCursor] = meact.useState(null);

  function ChirpComponent(chirp) {
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
        <small class="action edit">Edit</small>
        <small class="action view-replies">View Replies</small>
        <small class="action delete">Delete</small>
      </div>
      <div class="replies"></div>
    `;

    if (chirp.imageMetadata) {
      newChirp.querySelector(".chirp-image").src = `/chirps/${chirp.id}/image`;
      newChirp.querySelector(".chirp-image").classList.remove("hidden");
    }

    newChirp.dataset.id = chirp.id;

    if (!(chirp.Chirps?.length > 0)) {
      newChirp.querySelector(".view-replies").classList.add("hidden");
    }

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

    newChirp
      .querySelector(".view-replies")
      .addEventListener("click", function () {
        const replies = chirp.Chirps;
        const repliesContainer = document.createElement("div");
        repliesContainer.classList.add("replies-container");
        replies.forEach((reply) => {
          const replyComponent = ChirpComponent(reply);
          repliesContainer.appendChild(replyComponent);
        });
        newChirp.querySelector(".replies").innerHTML = "";
        newChirp.querySelector(".replies").appendChild(repliesContainer);
      });

    const deleteButton = newChirp.querySelector(".delete");
    deleteButton.addEventListener("click", function () {
      deleteButton.classList.add("disabled");
      ChirpService.deleteChirp(chirp.id).then(() => {
        const newChirpList = getChirps();
        const chirpIndex = newChirpList.findIndex((c) => c.id === chirp.id);
        if (chirpIndex !== -1) {
          newChirpList.splice(chirpIndex, 1);
          setChirps(newChirpList);
        }
        newChirp.remove();
      });
    });

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

  window.addEventListener("DOMContentLoaded", function () {
    // When new Chirp is received from the server
    ChirpService.onChirp((chirp) => {
      setChirps([chirp, ...getChirps()]);
    });

    ChirpService.onChirpDelete((chirp) => {
      // Remove the chirp from the list
      const newChirps = getChirps().filter((c) => c.id !== chirp.id);
      setChirps(newChirps);
    });

    // Infinite Scrolling Feature
    document.addEventListener("scroll", function () {
      const cursor = getCursor();
      if (cursor === null || getInfiniteLoading()) return;
      // when I scroll to the bottom of the page
      if (
        document.documentElement.scrollHeight - window.innerHeight <=
        document.documentElement.scrollTop + 50
      ) {
        setInfiniteLoading(true);
      }
    });

    meact.useEffect(() => {
      // infinite loading
      // load more chirps with cursor
      if (!getInfiniteLoading()) return;
      ChirpService.getChirps(getCursor())
        .then((result) => {
          if (result.chirps.length === 0) {
            setCursor(null);
          } else {
            setChirps([...getChirps(), ...result.chirps]);
            setCursor(result.cursor);
          }
        })
        .finally(() => {
          setInfiniteLoading(false);
        });
    }, [infiniteLoading]);

    // Initial Chirps Loading Feature
    const chirpsPlaceholder = document.querySelector(".chirps-placeholder");
    setChirpsLoading(true);
    ChirpService.getChirps()
      .then((result) => {
        setChirps(result.chirps);
        setCursor(result.cursor);
      })
      .finally(() => {
        setChirpsLoading(false);
      });

    meact.useEffect(() => {
      const chirpsList = document.querySelector("#chirpsList");
      chirpsList.innerHTML = "";
      getChirps().forEach(function (chirp) {
        const newChirp = ChirpComponent(chirp);
        chirpsList.append(newChirp);
      });
    }, [chirps]);

    // Loading state management
    meact.useEffect(() => {
      if (getChirpsLoading()) {
        chirpsPlaceholder.classList.remove("hidden");
      } else {
        chirpsPlaceholder.classList.add("hidden");
      }
    }, [chirpsLoading]);

    const newChirpInput = document.querySelector("#newChirp #newChirpInput");
    const submitChirpButton = document.querySelector("#submitChirp");
    submitChirpButton.disabled = true;

    newChirpInput.addEventListener("input", function () {
      submitChirpButton.disabled = newChirpInput.value.length == 0;
    });

    // Don't click me button
    this.document
      .querySelector("#dontClickMe")
      .addEventListener("click", function () {
        setActiveChirp(null);
      });

    // New Chirp Form Submission
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
          // const existingChirps = getChirps();
          // existingChirps.unshift(result);
          // setChirps(existingChirps);
          document.querySelector("#submitChirp").disabled = false;
        });

        e.target.reset();
      });
  });
})();

const ChirpService = (function () {
  "use strict";
  const module = {};

  module.getChirps = () => {
    return fetch("/chirps").then((res) => res.json());
  };

  module.addChirp = (chirpContent) => {
    return fetch("/chirps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: chirpContent,
      }),
    }).then((res) => res.json());
  };

  module.editChirp = (id, newChirpContent) => {
    return fetch(`/chirps/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: newChirpContent,
      }),
    }).then((res) => res.json());
  };

  module.deleteChirp = (id) => {
    return fetch(`/chirps/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  };

  return module;
})();

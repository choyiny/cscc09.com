const ChirpService = (function () {
  "use strict";
  const module = {};

  module.getChirps = function () {
    return fetch("/chirps").then((res) => res.json());
  };

  module.addChirp = function (formData) {
    return fetch("/chirps", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
  };

  module.editChirp = function (id, newChirpContent) {
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

  module.deleteChirp = function (id) {
    return fetch(`/chirps/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  };

  return module;
})();

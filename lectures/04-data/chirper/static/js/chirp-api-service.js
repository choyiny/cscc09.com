const ChirpService = (function () {
  "use strict";
  const module = {};

  module.getChirps = (cursor) => {
    const params = cursor ? `?cursorId=${cursor}` : "";
    return fetch(`/chirps${params}`).then((res) => res.json());
  };

  module.addChirp = (formData) => {
    return fetch("/chirps", {
      method: "POST",
      body: formData,
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

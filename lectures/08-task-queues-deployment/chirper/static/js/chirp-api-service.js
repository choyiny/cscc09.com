const ChirpService = (function () {
  "use strict";
  const module = {};
  // connect to the WebSocket server
  const socket = io();

  const onChirpPostListeners = [];
  const onChirpDeleteListeners = [];
  socket.on("chirp.post", (chirp) => {
    // Notify all listeners about the new chirp
    onChirpPostListeners.forEach((callback) => callback(chirp));
  });

  module.onChirp = (callback) => {
    onChirpPostListeners.push(callback);
  };

  socket.on("chirp.delete", (chirp) => {
    // Notify all listeners about the deleted chirp
    onChirpDeleteListeners.forEach((callback) => callback(chirp));
  });

  module.onChirpDelete = (callback) => {
    onChirpDeleteListeners.push(callback);
  };

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

const ChirpService = (function () {
  "use strict";
  const module = {};

  const chirpsStore = {
    currentId: 5,
    chirps: [
      {
        id: 0,
        content: "Hello, world!",
      },
      {
        id: 2,
        content: "This is a chirp",
      },
      {
        id: 4,
        content: "I like chirping",
      },
    ],
  }

  module.getChirps = function () {
    return chirpsStore.chirps;
  };

  module.addChirp = function (chirpContent) {
    chirpsStore.chirps.push({
      id: chirpsStore.currentId++,
      content: chirpContent,
    });
  };

  module.editChirp = function (id, newChirpContent) {
    chirpsStore.chirps.findIndex(function (chirp) {
      if (chirp.id === id) {
        chirp.content = newChirpContent;
      }
    });
  }

  return module;
})();

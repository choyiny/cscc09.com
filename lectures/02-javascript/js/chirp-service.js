/**
 * chirp-service.js defines the Model of MVVM. This file has NO access to the UI, nor should it know it at all.
 */
const ChirpService = (function () {
  "use strict";
  const module = {};

  // in this case, we are using an in-memory store. To persist data in the frontend, you could use
  // localStorage or IndexedDB. A real application would make HTTP calls instead (next lecture)
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
  };

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
  };

  // export the namespace so each function can be accessed through ChirpService.*
  return module;
})();

let api = (function () {
  "use strict";

  let module = {};

  // you are recommended to rewrite this to a promise based format, which will
  // be more reflective of what you will do in all major frameworks.
  function send(method, url, data, callback) {
    const config = {
      method: method,
    };
    if (!["GET", "DELETE"].includes(method)) {
      config["headers"] = {
        "Content-Type": "application/json",
      };
      config["body"] = JSON.stringify(data);
    }
    fetch(url, config)
      .then((res) => res.json())
      .then((val) => callback(null, val));
  }

  module.getUsers = function (callback) {
    send("GET", "/api/users/", null, callback);
  };

  return module;
})();

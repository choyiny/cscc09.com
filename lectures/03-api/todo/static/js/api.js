const apiService = (function () {
  "use strict";

  const module = {};

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

  // note to self, try to rewrite this in class without the callback model
  module.addItem = function (content, callback) {
    send("POST", "/api/items/", { content: content }, function (err, res) {
      if (err) return callback(err);
      return callback(null);
    });
  };

  module.deleteItem = function (itemId, callback) {
    send("DELETE", `/api/items/${itemId}`, null, function (err, res) {
      if (err) return callback(err);
      return callback(null);
    });
  };

  module.getItems = function (callback) {
    send("GET", "/api/items/", null, callback);
  };

  return module;
})();

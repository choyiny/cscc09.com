(function () {
  "use strict";

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

  function createParagraph(content) {
    // <p></p>
    const elmnt = document.createElement("p");
    // <p>{ content }</p>
    elmnt.innerHTML = content;
    return elmnt;
  }

  function generateJoke(callback) {
    send(
      "GET",
      "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,racist,sexist,explicit",
      {},
      callback
    );
  }

  window.onload = function () {
    // onclick listener for generating a paragraph
    document.querySelector("#generate-paragraph").onclick = function () {
      const btn = document.querySelector("#generate-paragraph");
      btn.setAttribute("disabled", "true");
      generateJoke((_, data) => {
        document
          .querySelector(".content")
          .appendChild(createParagraph(data.joke));
        btn.removeAttribute("disabled");
      });
    };
  };
})();

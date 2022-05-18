(function() {
  "use strict";

  function createParagraph(content) {
    // <p></p>
    const elmnt = document.createElement("p");
    // <p>{ content }</p>
    elmnt.innerHTML = content;
    return elmnt;
  }

  window.onload = function () {
    document.querySelector(
      ".content"
    ).innerHTML = `<h1 class="title">This is a heading.</h1>`;

    document.querySelector("#generate-paragraph").onclick = function() {
      document
        .querySelector(".content")
        .appendChild(createParagraph("This is a paragraph."));
    };
  };

}());
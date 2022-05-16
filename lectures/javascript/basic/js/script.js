function createParagraph(content) {
  const elmnt = document.createElement("p");
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

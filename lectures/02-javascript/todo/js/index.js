(function () {
  "use strict";

  window.addEventListener("load", function () {
    function update() {
      let items = apiService.getItems();
      document.querySelector("#items").innerHTML = "";
      items.forEach(function (item) {
        let element = document.createElement("div");
        element.className = "item";
        element.innerHTML = `
                    <div class="item-content">${item.content}</div>
                    <div class="delete-icon icon"></div>
                `;
        element
          .querySelector(".delete-icon")
          .addEventListener("click", function (e) {
            apiService.deleteItem(item.id);
            update();
          });
        document.querySelector("#items").prepend(element);
      });
    }

    document
      .querySelector("#add-item")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        let content = document.querySelector("#content-form").value;
        document.querySelector("#add-item").reset();
        apiService.addItem(content);
        update();
      });

    update();
  });
})();

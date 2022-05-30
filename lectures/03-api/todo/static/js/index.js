(function () {
  "use strict";

  window.addEventListener("load", function () {
    function onError(err) {
      console.error("[error]", err);
      var errorBox = document.querySelector("#error-box");
      errorBox.innerHTML = err;
      // do as I say, not as I do
      errorBox.style.visibility = "visible";
    }

    // update the view for todo list
    function update() {
      // apiService.getItems(function (err, items) {
      //   if (err) return onError(err);
      //   document.querySelector("#items").innerHTML = "";
      //   items.forEach(function (item) {
      //     let element = document.createElement("div");
      //     element.className = "item";
      //     element.innerHTML = `
      //                   <div class="item-content">${item.content}</div>
      //                   <div class="delete-icon icon"></div>
      //               `;
      //     element
      //       .querySelector(".delete-icon")
      //       .addEventListener("click", function (e) {
      //         apiService.deleteItem(item.id, function (err) {
      //           if (err) return onError(err);
      //           update();
      //         });
      //       });
      //     document.querySelector("#items").prepend(element);
      //   });
      // });
      apiService.getItemsBetter().then((items) => {
        // if (err) return onError(err);
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
              apiService.deleteItem(item.id, function (err) {
                if (err) return onError(err);
                update();
              });
            });
          document.querySelector("#items").prepend(element);
        });
      })
    }

    // submit listener to add an item
    document
      .querySelector("#add-item")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        let content = document.querySelector("#content-form").value;
        document.querySelector("#add-item").reset();
        apiService.addItem(content, function (err) {
          if (err) return onError(err);
          update();
        });
      });

    // Query posts every 5 seconds
    (function () {
      update();
      setInterval(update, 5000);
    })();
  });
})();

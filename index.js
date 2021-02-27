var req = new XMLHttpRequest();

req.open(
  "GET",
  "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json",
  true
);

req.send();

req.onload = function () {
  var data = JSON.parse(this.response);

  let list = document.querySelector(".list");
  let pagenums = document.querySelector(".page-nums");

  let current_page = 5;
  let rows = 5;

  function displayList(items, wrapper, rowsperpage, page) {
    wrapper.innerHTML = "";
    page--;

    let start = rowsperpage * page;
    let end = start + rowsperpage;
    let paginatedItems = items.slice(start, end);

    for (i = 0; i < paginatedItems.length; i++) {
      let item = paginatedItems[i];

      let item_element = document.createElement("table");
      item_element.setAttribute("class", "item_element");
      item_element.innerHTML = `<tr>
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.email}</td>
      </tr>`;

      list.append(item_element);
    }
  }

  function setPagination(items, wrapper, rowsperpage) {
    wrapper.innerHTML = "";

    let page_count = Math.ceil(items.length / rowsperpage);
    for (i = 1; i <= page_count; i++) {
      var btn = paginationButton(i);
      pagenums.append(btn);
    }

    let prevBtn = paginationButton("Prev");
    prevBtn.setAttribute("class", "prevBtn");
    pagenums.insertAdjacentElement("afterbegin", prevBtn);

    let nextBtn = paginationButton("Next");
    prevBtn.setAttribute("class", "nextBtn");
    pagenums.insertAdjacentElement("beforeend", nextBtn);
  }

  function paginationButton(page) {
    let button = document.createElement("button");
    button.innerText = page;
    if (current_page === page) button.setAttribute("class", "active");

    button.addEventListener("click", (but) => {
      var active_page = document.querySelector(".active").innerText;
      console.log("active_page=" + active_page);

      if (but.innerText === "Prev") {
        current_page = active_page - 1;
        console.log(current_page);
        displayList(data, list, rows, current_page);
      } else if (but.innerText === "Next") {
        current_page = page + 1;
        displayList(data, list, rows, current_page);
      } else {
        current_page = page;
        displayList(data, list, rows, current_page);
      }
      let current_btn = document.querySelector("button.active");
      current_btn.removeAttribute("class", "active");

      button.setAttribute("class", "active");
    });
    return button;
  }

  displayList(data, list, rows, current_page);
  setPagination(data, pagenums, rows);
};

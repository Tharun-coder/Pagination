var req = new XMLHttpRequest();

req.open(
  "GET",
  "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json",
  true
);

req.send();

req.onload = function () {
  try {
    var data = JSON.parse(this.response);

    let list = document.querySelector(".list");
    let pagenums = document.querySelector(".page-nums");

    let current_page = 5;
    let rows = 10;

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

      let prev_Btn = prevBtn();

      let next_Btn = nextBtn();

      firstLastBtn();
    }

    function prevBtn() {
      console.log("im in");
      let btn = document.createElement("button");
      pagenums.insertAdjacentElement("afterbegin", btn);
      btn.innerText = "Prev";
      btn.addEventListener("click", () => {
        current_page = document.querySelector(".active").innerText;
        if (current_page > 1) {
          displayList(data, list, rows, current_page - 1);
          let current_btn = document.querySelector(".active");
          current_btn.classList.remove("active");
          current_btn.previousElementSibling.classList.add("active");
        }
      });
    }

    function nextBtn() {
      let btn = document.createElement("button");
      btn.setAttribute("class", "next");
      btn.innerText = "Next";
      pagenums.insertAdjacentElement("beforeend", btn);
      btn.addEventListener("click", () => {
        current_page = +document.querySelector(".active").innerText;
        if (current_page < +btn.previousElementSibling.innerText) {
          displayList(data, list, rows, current_page + 1);
          let current_btn = document.querySelector(".active");
          current_btn.classList.remove("active");
          current_btn.nextElementSibling.classList.add("active");
        }
      });
    }
    function firstLastBtn() {
      let first_btn = document.createElement("button");
      first_btn.innerText = "First";
      pagenums.insertAdjacentElement("afterbegin", first_btn);
      let last_btn = document.createElement("button");
      last_btn.innerText = "Last";
      pagenums.insertAdjacentElement("beforeend", last_btn);

      first_btn.addEventListener("click", () => {
        displayList(data, list, rows, 1);
        let current_btn = document.querySelector(".active");
        current_btn.classList.remove("active");
        let btn = document.querySelector(".btn-1");
        btn.classList.add("active");
      });

      last_btn.addEventListener("click", () => {
        let current_page = document.querySelector(".next")
          .previousElementSibling;
        displayList(data, list, rows, +current_page.innerText);
        let current_btn = document.querySelector(".active");
        current_btn.classList.remove("active");
        current_page.classList.add("active");
      });
    }

    function paginationButton(page) {
      let button = document.createElement("button");
      button.innerText = page;
      button.classList.add(`btn-${page}`);
      if (current_page === page) button.setAttribute("class", "active");

      button.addEventListener("click", () => {
        current_page = page;

        displayList(data, list, rows, current_page);

        let current_btn = document.querySelector("button.active");
        current_btn.removeAttribute("class", "active");

        button.setAttribute("class", "active");
      });
      return button;
    }

    displayList(data, list, rows, current_page);
    setPagination(data, pagenums, rows);
  } catch (err) {
    console.log(err);
  }
};

const dataKey = "DATA_KEY";
let data = { favorite: [], unread: [], readed: [] };

class DataBook {
   constructor(id, title, author, publisher, realeseDate, readed, favorite) {
      this.id = id;
      this.title = title;
      this.author = author || "unknown";
      this.publisher = publisher || "unknown";
      this.realeseDate = realeseDate || "unknown";
      this.readed = readed;

      if (readed === true) {
         this.favorite = favorite;
      } else {
         this.favorite = false;
      }
   }
}


window.addEventListener("load", () => {
   if (typeof Storage != undefined) {
      if (localStorage.getItem(dataKey) == undefined) {
         localStorage.setItem(dataKey, JSON.stringify(data));
      } else {
         data = JSON.parse(localStorage.getItem(dataKey));
      }
   } else {
      alert("sorry, you'r browser not support web storage");
   }
   refleshFavorite();
   refleshUnread();
   refleshReaded();
})


document.addEventListener("click", (e) => {
   const event = e.target;

   if (event.classList.contains("button-edit")) {
      popoup.classList.add("popup-bg--active");

      const perdata = getDataById(event.getAttribute("id"));
      inputUserTitle[1].value = perdata.title;
      inputUserAuthor[1].value = perdata.author;
      inputUserPublisher[1].value = perdata.publisher;
      inputUserRealeseDate[1].value = perdata.realeseDate;
      idTag.setAttribute("id", event.getAttribute("id"));
   }

   else if (event.classList.contains("button-unfavorite")) {
      const id = event.getAttribute("id");
      const newData = data.favorite.splice(getIndex(id), 1);
      newData[0].favorite = false;
      console.log(newData[0]);
      data.readed.push(newData[0]);

      stored();
   }

   else if (event.classList.contains("button-favorite")) {
      if (data.favorite.length === 10) {
         alert("maaf, rak buku favorit maksimal 10 item");
      } else {
         const id = event.getAttribute("id");
         const newData = data.readed.splice(getIndex(id), 1);
         newData[0].favorite = true;
         console.log(newData[0]);
         data.favorite.push(newData[0]);

         stored();
      }
   }

   else if (event.classList.contains("button-check")) {
      const id = event.getAttribute("id");
      const newData = data.unread.splice(getIndex(id), 1);
      newData[0].readed = true;
      console.log(newData[0]);
      data.readed.push(newData[0]);

      stored();
   }

   else if (event.classList.contains("button-undo")) {
      const id = event.getAttribute("id");
      const newData = data.readed.splice(getIndex(id), 1);
      newData[0].readed = false;
      console.log(newData[0]);
      data.unread.push(newData[0]);

      stored();
   }

   else if (event.classList.contains("button-delete")) {
      const id = event.getAttribute("id");
      for (const section in data) {
         for (const miniData of data[section]) {
            if (miniData.id == id) {
               data[section].splice(data[section].indexOf(miniData), 1);
            }
         }
      }

      stored();
   }

   refleshFavorite();
   refleshUnread();
   refleshReaded();
})


buttonSubmit.addEventListener("click", (event) => {
   event.preventDefault();

   if (data.favorite.length === 10 && inputFavorite.checked) {
      alert("maaf, rak buku favorit maksimal 10 item");
   } else {
      const newData = new DataBook(
         Math.floor(Date.now() * Math.random()),
         inputUserTitle[0].value,
         inputUserAuthor[0].value,
         inputUserPublisher[0].value,
         inputUserRealeseDate[0].value,
         inputReaded.checked,
         inputFavorite.checked,
      );

      for (const section in data) {
         for (const miniData of data[section]) {
            if (
               miniData.title === newData.title &&
               miniData.author === newData.author &&
               miniData.publisher === newData.publisher &&
               miniData.realeseDate === newData.realeseDate
            ) {
               return;
            }
         }
      }

      if (newData.favorite === true) {
         data.favorite.push(newData);
      } else if (newData.readed === true) {
         data.readed.push(newData);
      } else if (newData.readed === false) {
         data.unread.push(newData);
      }

      inputUserTitle[0].value = "";
      inputUserAuthor[0].value = "";
      inputUserPublisher[0].value = "";
      inputUserRealeseDate[0].value = "";
      inputReaded.checked = false;
      inputFavorite.checked = false;

      document.querySelectorAll(".register-form-box__input")
         .forEach((item) => item.classList.remove("register-form-box__input--valid"));
   }

   localStorage.setItem(dataKey, JSON.stringify(data));

   refleshFavorite();
   refleshUnread();
   refleshReaded();
});


const cancelButton = document.getElementById("button-cancel");
cancelButton.addEventListener("click", () => popoup.classList.remove("popup-bg--active"));


const saveButton = document.getElementById("button-save");
saveButton.addEventListener("click", () => {
   storeEdit({
      title: inputUserTitle[1].value,
      author: inputUserAuthor[1].value,
      publisher: inputUserPublisher[1].value,
      realeseDate: inputUserRealeseDate[1].value
   }, idTag.getAttribute("id"));

   popoup.classList.remove("popup-bg--active");
});


document.getElementById("search-unread").addEventListener("input", function () {
   if (this.value.length == 0) {
      refleshUnread();
   } else {
      const searchResult = getDataByTitle(this.value.toUpperCase(), "unread");
      searchCardReflesh(searchResult, "unread");
   }
});


document.getElementById("search-readed").addEventListener("input", function () {
   if (this.value.length == 0) {
      refleshReaded();
   } else {
      const searchResult = getDataByTitle(this.value.toUpperCase(), "readed");
      searchCardReflesh(searchResult, "readed");
   }
});


const stored = () => localStorage.setItem(dataKey, JSON.stringify(data));


const popoup = document.querySelector(".popup-bg");
const idTag = document.querySelector(".popup-edit");
function storeEdit(object, idNum) {
   for (const section in data) {
      for (const miniData of data[section]) {
         if (miniData.id == idNum) {
            miniData.title = object.title;
            miniData.author = object.author;
            miniData.publisher = object.publisher;
            miniData.realeseDate = object.realeseDate;
         }
      }
   }

   stored();
}


function getDataById(idNum) {
   for (const section in data) {
      for (const miniData of data[section]) {
         if (miniData.id == idNum) {
            return miniData;
         }
      }
   }
}


function getDataByTitle(title, r) {
   const result = []
   for (const miniData of data[r]) {
      const newTitle = miniData.title.toUpperCase();
      if (newTitle.match(title)) {
         result.push(miniData);
      }
   }
   return result;
}


function getIndex(idNum) {
   for (const section in data) {
      for (const miniData of data[section]) {
         if (miniData.id == idNum) {
            return data[section].indexOf(miniData);
         }
      }
   }
}


function refleshFavorite() {
   const favorites = data.favorite;
   const favoriteContainer = document.querySelector(".favorite-container__card-container");

   const cards = favorites.map((favorite) => {
      return `<li class="card" >
                     <div class="card__row-1">
                        <h2 class="card__title card__title--ender" scrollamount="4">${favorite.title}</h2>
                        <p class="card__author card__author--ender">${favorite.author}</p>
                        <p class="card__publisher card__publisher--ender">${favorite.publisher}</p>
                        <p class="card__realese-date">${favorite.realeseDate}</p>
                     </div>
                     <div class="card__row-2">
                        <button class="card__favorite-button">
                           <i class="fa-solid fa-heart-circle-minus card__favorite-icon button-unfavorite" id="${favorite.id}"></i>
                        </button>
                        <button class="card__edit-button">
                           <i class="fa-regular fa-pen-to-square card__edit-icon button-edit" id="${favorite.id}"></i>
                        </button>
                     </div>
                  </li>
                  `
   }).join("");

   favoriteContainer.innerHTML = cards;
   document.querySelector(".number-favorite").innerHTML = (10 - data.favorite.length);
}


function refleshUnread() {
   const unreads = data.unread;
   const unreadContainer = document.querySelector(".unread-container__bookshelf-container");

   const cards = unreads.map((unread) =>
      `<li class="card-bookshelf">
               <div class="card-bookshelf__wrap-1">
                  <h3 class="card-bookshelf__heading">${unread.title}</h3>
                  <p class="card-bookshelf__author">${unread.author}</p>
                  <p class="card-bookshelf__publisher">${unread.publisher}</p>
                  <p class="card-bookshelf__realese-date">${unread.realeseDate}</p>
                  </div>
               <div class="card-bookshelf__wrap-2">
               <button class="card-bookshelf__undo-button">
               <i class="fa-regular fa-trash-can card-bookshelf__undo-icon button-delete" id="${unread.id}"></i>
               </button>
                  <button class="card-bookshelf__edit-button">
                     <i class="fa-regular fa-pen-to-square card-bookshelf__edit-icon button-edit" id="${unread.id}"></i>
                  </button>
                  <button class="card-bookshelf__check-button">
                  <i class="fa-regular fa-check-circle card-bookshelf__check-icon button-check" id="${unread.id}"></i>
                  </button>
               </div>
            </li>`
   ).join("");

   unreadContainer.innerHTML = cards;
   document.querySelector(".number-unread").innerText = data.unread.length;
}


function refleshReaded() {
   const readeds = data.readed;
   const readedContainer = document.querySelector(".readed-container__bookshelf-container");

   const cards = readeds.map((readed) =>
      `<li class="card-bookshelf">
               <div class="card-bookshelf__wrap-1">
               <h3 class="card-bookshelf__heading">${readed.title}</h3>
                  <p class="card-bookshelf__author">${readed.author}</p>
                  <p class="card-bookshelf__publisher">${readed.publisher}</p>
                  <p class="card-bookshelf__realese-date">${readed.realeseDate}</p>
               </div>
               <div class="card-bookshelf__wrap-2">
               <button class="card-bookshelf__undo-button">
               <i class="fa-solid fa-arrow-rotate-left card-bookshelf__undo-icon button-undo" id="${readed.id}"></i>
               </button>
               <button class="card-bookshelf__favorite-button">
                     <i class="fa-regular fa-heart card-bookshelf__favorite-icon button-favorite" id="${readed.id}"></i>
                  </button>
                  <button class="card-bookshelf__delete-button">
                  <i class="fa-regular fa-trash-can card-bookshelf__delete-icon button-delete" id="${readed.id}"></i>
                  </button>
               </div>
            </li>`
   ).join("");

   readedContainer.innerHTML = cards;
   document.querySelector(".number-readed").innerText = data.readed.length;
}


function searchCardReflesh(datas, where) {
   if (where === "unread") {
      document.querySelector(".unread-container__bookshelf-container")
         .innerHTML = datas.map((unread) =>
            `<li class="card-bookshelf">
               <div class="card-bookshelf__wrap-1">
                  <h3 class="card-bookshelf__heading">${unread.title}</h3>
                  <p class="card-bookshelf__author">${unread.author}</p>
                  <p class="card-bookshelf__publisher">${unread.publisher}</p>
                  <p class="card-bookshelf__realese-date">${unread.realeseDate}</p>
                  </div>
               <div class="card-bookshelf__wrap-2">
               <button class="card-bookshelf__undo-button">
               <i class="fa-regular fa-trash-can card-bookshelf__undo-icon button-delete" id="${unread.id}"></i>
               </button>
                  <button class="card-bookshelf__edit-button">
                     <i class="fa-regular fa-pen-to-square card-bookshelf__edit-icon button-edit" id="${unread.id}"></i>
                  </button>
                  <button class="card-bookshelf__check-button">
                  <i class="fa-regular fa-check-circle card-bookshelf__check-icon button-check" id="${unread.id}"></i>
                  </button>
               </div>
            </li>`
         ).join("");
   } else if (where === "readed") {
      document.querySelector(".readed-container__bookshelf-container")
         .innerHTML = datas.map((readed) =>
            `<li class="card-bookshelf">
               <div class="card-bookshelf__wrap-1">
               <h3 class="card-bookshelf__heading">${readed.title}</h3>
                  <p class="card-bookshelf__author">${readed.author}</p>
                  <p class="card-bookshelf__publisher">${readed.publisher}</p>
                  <p class="card-bookshelf__realese-date">${readed.realeseDate}</p>
               </div>
               <div class="card-bookshelf__wrap-2">
               <button class="card-bookshelf__undo-button">
               <i class="fa-solid fa-arrow-rotate-left card-bookshelf__undo-icon button-undo" id="${readed.id}"></i>
               </button>
               <button class="card-bookshelf__favorite-button">
                     <i class="fa-regular fa-heart card-bookshelf__favorite-icon button-favorite" id="${readed.id}"></i>
                  </button>
                  <button class="card-bookshelf__delete-button">
                  <i class="fa-regular fa-trash-can card-bookshelf__delete-icon button-delete" id="${readed.id}"></i>
                  </button>
               </div>
            </li>`
         ).join("");
   }
}
document.querySelector("form").addEventListener("keypress", (event) => {
   if (event.key === "Enter" && event.code === "Enter") {
      event.preventDefault();
   }
});

const buttonSubmit = document.querySelector("#button-submit");
const allInput = document.querySelectorAll(".register-form-box__input");
allInput.forEach((input) => {
   input.addEventListener("input", () => {
      if (input.value) {
         input.classList.add("register-form-box__input--valid");

         if (input.getAttribute("id") == "title") {
            buttonSubmit.classList.remove("register-form-box__button--primary--disable");
            buttonSubmit.removeAttribute("disabled");
         }
      } else {
         input.classList.remove("register-form-box__input--valid");
         if (input.getAttribute("id") == "title") {
            buttonSubmit.classList.add("register-form-box__button--primary--disable");
            buttonSubmit.setAttribute("disabled", "");
         }

      }
   });
});


const inputUserTitle = document.querySelectorAll("#title");
inputUserTitle[0].addEventListener("input", () => {
   const warning = document.querySelector("#title-warning");

   if (inputUserTitle[0].value.length === 100) {
      warning.innerText = "Maks 100 karakter";
   } else {
      warning.innerText = "";
   }
});


const inputUserAuthor = document.querySelectorAll("#author");
inputUserAuthor[0].addEventListener("input", () => {
   const warning = document.querySelector("#author-warning");

   if (inputUserAuthor[0].value.length === 60) {
      warning.innerText = "Maks 60 karakter";
   } else {
      warning.innerText = "";
   }
});


const inputUserPublisher = document.querySelectorAll("#publisher");
inputUserPublisher[0].addEventListener("input", () => {
   const warning = document.querySelector("#publisher-warning");

   if (inputUserPublisher[0].value.length === 60) {
      warning.innerText = "Maks 60 karakter";
   } else {
      warning.innerText = "";
   }
});

const inputUserRealeseDate = document.querySelectorAll("#date");

const inputReaded = document.querySelector("#readed-check");
const inputFavorite = document.querySelector("#favorite-check");
const checkboxTitles = document.querySelectorAll(".register-form-box__input-checkbox-title");
const checkboxIcons = document.querySelectorAll(".register-form-box__checkbox-icon");

inputReaded.addEventListener("click", () => {
   if (inputReaded.checked) {
      checkboxTitles[1].classList.remove("register-form-box__input-checkbox-title--disable");
      checkboxIcons[1].classList.remove("register-form-box__checkbox-icon--disable");
      inputFavorite.removeAttribute("disabled");

      inputReaded.parentElement.classList.remove("fa-regular", "fa-square");
      inputReaded.parentElement.classList.add("fa-solid", "fa-check-square");
   } else {
      checkboxIcons[1].classList.add("register-form-box__checkbox-icon--disable");
      checkboxTitles[1].classList.add("register-form-box__input-checkbox-title--disable");
      inputFavorite.setAttribute("disabled", "");

      inputReaded.parentElement.classList.add("fa-regular", "fa-square");
      inputReaded.parentElement.classList.remove("fa-solid", "fa-check-square");
   }
   inputReaded.parentElement.classList.toggle("register-form-box__checkbox-icon--checked");
});

inputFavorite.addEventListener("click", () => {
   if (inputFavorite.checked) {
      inputFavorite.parentElement.classList.remove("fa-regular", "fa-square");
      inputFavorite.parentElement.classList.add("fa-solid", "fa-check-square");
   } else {
      inputFavorite.parentElement.classList.add("fa-regular", "fa-square");
      inputFavorite.parentElement.classList.remove("fa-solid", "fa-check-square");
   }
   inputFavorite.parentElement.classList.toggle("register-form-box__checkbox-icon--checked");
})

document.querySelector("#button-reset").addEventListener("click", () => {
   allInput.forEach((input) => {
      input.classList.remove("register-form-box__input--valid");
   });
});
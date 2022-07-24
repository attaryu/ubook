// burger button
const burgerButton = document.querySelector(".burger-button");
const navLink = document.querySelector(".header__nav-link");
burgerButton.addEventListener("click", () => {
   burgerButton.classList.toggle("burger-button--click");

   if (navLink.classList.contains("header__nav-link--trigger")) {
      navLink.classList.toggle("header__nav-link--opacity");
      setTimeout(() => navLink.classList.toggle("header__nav-link--trigger"), 410);
   } else {
      navLink.classList.toggle("header__nav-link--trigger");
      setTimeout(() => navLink.classList.toggle("header__nav-link--opacity"), 10);
   }
});


document.addEventListener("scroll", () => {
   const header = document.querySelector(".header");
   const arrow = document.querySelector(".header__arrow");
   const linkList = document.querySelector(".header__link-list");
   const links = document.querySelectorAll(".header__link");
   const registerBox = document.querySelector(".register-form-box");

   const scrolledY = window.scrollY;
   const scrolledYOffset = window.pageYOffset;

   const speed = registerBox.dataset.speed;
   registerBox.style.transform = `translateY(${scrolledYOffset * speed}px)`;

   if (scrolledY > 0) {
      header.classList.add("header--scrolled");
      arrow.classList.add("header__arrow--scrolled");
      linkList.classList.add("header__link-list--scrolled");

      links.forEach((link) => {
         if (link.classList.contains("header__link--disable")) {
            link.classList.add("header__link--scrolled--disable");
         } else {
            link.classList.add("header__link--scrolled");
         }
      });

   } else if (scrolledY < 100) {
      header.classList.remove("header--scrolled");
      arrow.classList.remove("header__arrow--scrolled");
      linkList.classList.remove("header__link-list--scrolled");

      links.forEach((link) => {
         if (link.classList.contains("header__link--disable")) {
            link.classList.remove("header__link--scrolled--disable");
         } else {
            link.classList.remove("header__link--scrolled");
         }
      });
   }
})


const links = document.querySelectorAll(".header__link");
const links2 = document.querySelectorAll(".footer__link");
[...links, ...links2].forEach((link) => {
   link.addEventListener("click", (event) => {
      event.preventDefault();
      const element = document.querySelector(link.getAttribute("href"));
      element.scrollIntoView({ behavior: "smooth" });
   })
})
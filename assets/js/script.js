'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

window.addEventListener('contextmenu', function(e) {
  e.preventDefault();
})

setTimeout(function() {
  $('.loader_bg').fadeToggle();
}, 5000);

const cookieDialog = document.getElementById("cookie-dialog");
const cookieForm = document.getElementById("cookie-form");
const cookiePreferences = document.querySelectorAll("[data-cookie]");
const cookieActions = document.querySelectorAll("[data-cookie-action]");
const { log } = console;

cookieForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get and log the result to the console
  const formData = new FormData(e.target);
  const chosenCookiePreferences = formData.getAll("cookie");
  log(chosenCookiePreferences);

  cookieDialog.close();
});

cookieActions.forEach((action) => {
  action.addEventListener("click", (e) => {
    switch (e.target.dataset.cookieAction) {
      case "show-dialog":
        cookieDialog.showModal();
        break;
      case "allow-all":
        cookiePreferences.forEach((cookie) => {
          cookie.checked = true;
        });
        break;
      case "reject-all":
        cookiePreferences.forEach((cookie) => {
          cookie.checked = false;
        });
        break;
      default:
        break;
    }
  });
});




// const toggle = document.getElementById('a');
// const loadingScreen = document.getElementById('loadingScreen');
// const COOKIE_NAME = 'toggleState';
// const COOKIE_EXPIRATION_DAYS = 365;
// const LOADING_SCREEN_DURATION = 5000; // Duration in milliseconds

// // Function to set a cookie
// function setCookie(name, value, expirationDays) {
//   const expirationDate = new Date();
//   expirationDate.setDate(expirationDate.getDate() + expirationDays);
//   document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
// }

// // Function to get the value of a cookie
// function getCookie(name) {
//   const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
//   return cookieValue ? cookieValue.pop() : '';
// }

// // Check the value of the toggle cookie and set the toggle state accordingly
// const toggleState = getCookie(COOKIE_NAME);
// if (toggleState === 'true') {
//   toggle.checked = true;
//   loadingScreen.style.display = 'none';
// } else {
//   toggle.checked = false;
//   loadingScreen.style.display = 'flex'; // Use flex display to center the content
//   loadingScreen.style.justifyContent = 'center'; // Center horizontally
//   loadingScreen.style.alignItems = 'center'; // Center vertically
//   setTimeout(() => {
//     loadingScreen.style.display = 'none';
//   }, LOADING_SCREEN_DURATION);
// }

// // Event listener to handle toggle changes
// toggle.addEventListener('change', function() {
//   if (toggle.checked) {
//     loadingScreen.style.display = 'none';
//   } else {
//     loadingScreen.style.display = 'flex'; // Use flex display to center the content
//     loadingScreen.style.justifyContent = 'center'; // Center horizontally
//     loadingScreen.style.alignItems = 'center'; // Center vertically
//     setTimeout(() => {
//       loadingScreen.style.display = 'none';
//     }, LOADING_SCREEN_DURATION);
//   }

//   // Store the toggle state in a cookie
//   setCookie(COOKIE_NAME, toggle.checked, COOKIE_EXPIRATION_DAYS);
// });
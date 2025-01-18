import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { openWindow, closeWindow } from "./components/modal.js";
import { handleProfileSubmit,handleCardSubmit, createCard } from "./components/card.js";

const placesList = document.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileWindow = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileForm = document.forms.namedItem("edit-profile");
const editName = profileForm.elements.name;
const editDescription = profileForm.elements.description;
const newCardButton = document.querySelector(".profile__add-button");
const newCardWindow = document.querySelector(".popup_type_new-card");
const cardForm = document.forms.namedItem("new-place");

editProfileButton.addEventListener("click", function () { 
  editName.value = profileTitle.textContent;
  editDescription.value = profileDescription.textContent;
   openWindow(editProfileWindow);
});

newCardButton.addEventListener("click", function () {
  openWindow(newCardWindow);
});

for (let itm of initialCards) {
  placesList.append(createCard(itm));
}

profileForm.addEventListener("submit", function (evt) {
  handleProfileSubmit(evt, profileTitle, profileDescription);
  closeWindow(editProfileWindow);
});

cardForm.addEventListener("submit", function (evt) {
  handleCardSubmit(evt,placesList);
  closeWindow(newCardWindow);
});



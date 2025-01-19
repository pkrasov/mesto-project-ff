import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { openWindow, closeWindow } from "./components/modal.js";
import { createCard } from "./components/card.js";

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
const pictureWindow = document.querySelector(".popup_type_image");
const popups = document.querySelectorAll(".popup");

function handleProfileSubmit(evt, profileTitle, profileDescription) {
  evt.preventDefault();
  profileTitle.textContent = evt.srcElement.name.value;
  profileDescription.textContent = evt.srcElement.description.value;
  evt.srcElement.reset();
  closeWindow(editProfileWindow);
}

editProfileButton.addEventListener("click", function () {
  editName.value = profileTitle.textContent;
  editDescription.value = profileDescription.textContent;
  openWindow(editProfileWindow);
});

newCardButton.addEventListener("click", function () {
  openWindow(newCardWindow);
});

function popupImage(evt) {
  pictureWindow
    .querySelector(".popup__image")
    .setAttribute("src", evt.target.getAttribute("src"));
  pictureWindow.querySelector(".popup__caption").textContent =
    evt.target.parentNode.querySelector(".card__title").textContent;
  openWindow(pictureWindow);
}

popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closeWindow(popup);
  });
});

for (let itm of initialCards) {
  placesList.append(createCard(itm, popupImage));
}

function handleCardSubmit(evt, placesList) {
  evt.preventDefault();
  const card = {
    name: evt.srcElement.elements["place-name"].value,
    link: evt.srcElement.elements["link"].value,
  };
  placesList.prepend(createCard(card, popupImage));
  closeWindow(newCardWindow);
  evt.srcElement.reset();
}

profileForm.addEventListener("submit", function (evt) {
  handleProfileSubmit(evt, profileTitle, profileDescription);
});

cardForm.addEventListener("submit", function (evt) {
  handleCardSubmit(evt, placesList);
});

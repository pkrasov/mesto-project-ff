import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { openWindow, closeWindow } from "./components/modal.js";
import { createCard } from "./components/card.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getInitialCards,
  getProfile,
  updateProfile,
  addCard,
  deleteCard,
  toggleLike,
  updateAvatar,
} from "./components/api.js";
const placesList = document.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileWindow = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const profileForm = document.forms.namedItem("edit-profile");
const editName = profileForm.elements.name;
const editDescription = profileForm.elements.description;
const newCardButton = document.querySelector(".profile__add-button");
const newCardWindow = document.querySelector(".popup_type_new-card");
const cardForm = document.forms.namedItem("new-place");
const pictureWindow = document.querySelector(".popup_type_image");
const popups = document.querySelectorAll(".popup");
const cardDeleteWindow = document.querySelector(".popup_type_delete");
const popupDeleteButton = document.querySelector(".popup__button-delete");
const editAvatarWindow = document.querySelector(".popup_type_avatar");
const avatarForm = document.forms.namedItem("new-avatar");
const popupImg = pictureWindow.querySelector(".popup__image");
const selectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function handleAvatarSubmit(evt) {
  evt.preventDefault();

  const btn = evt.srcElement.querySelector(selectors.submitButtonSelector);
  const old_text = evt.submitter.textContent;
  btn.textContent = "Сохранение...";
  updateAvatar({
    avatar: evt.srcElement["link-avatar"].value,
  })
    .then((res) => {
      profileAvatar.style.backgroundImage = `url(${res.avatar})`;
      evt.srcElement.reset();
      closeWindow(editAvatarWindow);
    })
    .catch((err) => {
      alert(err);
    })
    .finally((btn.textContent = old_text));
}

avatarForm.addEventListener("submit", function (evt) {
  handleAvatarSubmit(evt);
  clearValidation(avatarForm, selectors);
});

profileAvatar.addEventListener("click", function () {
  openWindow(editAvatarWindow);
});

const handleCardDelete = (evt, cardId, removeCard) => {
  openWindow(cardDeleteWindow);
  popupDeleteButton.onclick = () => {
    popupDeleteButton.disabled = true;
    popupDeleteButton.classList.add(selectors.inactiveButtonClass);
    deleteCard(cardId)
      .then(() => {
        removeCard(evt);
        closeWindow(cardDeleteWindow);
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        popupDeleteButton.disabled = false;
        popupDeleteButton.classList.remove(selectors.inactiveButtonClass);
      });
  };
};

function handleLike(evt, isLiked, refreshLike, card) {
  toggleLike(card._id, isLiked)
    .then((res) => {
      refreshLike(evt, res);
    })
    .catch((err) => alert(err));
}

function handleProfileSubmit(evt, profileTitle, profileDescription) {
  evt.preventDefault();

  const btn = evt.srcElement.querySelector(selectors.submitButtonSelector);
  const old_text = btn.textContent;
  btn.textContent = "Сохранение...";
  updateProfile({
    name: evt.srcElement.name.value,
    about: evt.srcElement.description.value,
  })
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      evt.srcElement.reset();
      closeWindow(editProfileWindow);
    })
    .catch((err) => {
      alert(err);
    })
    .finally((btn.textContent = old_text));
}

editProfileButton.addEventListener("click", function () {
  editName.value = profileTitle.textContent;
  editDescription.value = profileDescription.textContent;
  openWindow(editProfileWindow);
  clearValidation(profileForm, selectors);
});

newCardButton.addEventListener("click", function () {
  openWindow(newCardWindow);
});

function popupImage(name, link) {
  popupImg.setAttribute("src", link);
  pictureWindow.querySelector(".popup__caption").textContent = name;
  openWindow(pictureWindow);
}

popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closeWindow(popup);
  });
});

function handleCardSubmit(evt, placesList) {
  evt.preventDefault();
  const btn = evt.srcElement.querySelector(selectors.submitButtonSelector);
  const old_text = btn.textContent;
  btn.textContent = "Сохранение...";
  const card = {
    name: evt.srcElement.elements["place-name"].value,
    link: evt.srcElement.elements["link"].value,
  };
  addCard(card)
    .then((res) => {
      placesList.prepend(
        createCard(res.owner._id, res, popupImage, handleCardDelete, handleLike)
      );
      closeWindow(newCardWindow);
      evt.srcElement.reset();
      clearValidation(cardForm, selectors);
    })
    .catch((err) => {
      alert(err);
    })
    .finally((btn.textContent = old_text));
}

profileForm.addEventListener("submit", function (evt) {
  handleProfileSubmit(evt, profileTitle, profileDescription);
});

cardForm.addEventListener("submit", function (evt) {
  handleCardSubmit(evt, placesList);
});

enableValidation(selectors);

Promise.all([getProfile(), getInitialCards()])
  .then(([profile, cards]) => {
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    profileAvatar.style.backgroundImage = `url(${profile.avatar})`;

    for (let itm of cards) {
      placesList.append(
        createCard(profile._id, itm, popupImage, handleCardDelete, handleLike)
      );
    }
  })
  .catch((err) => alert(err));
/*
{
  name: 'Marie Skłodowska Curie',
  about: 'Physicist and Chemist'
}

*/

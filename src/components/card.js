import {openWindow,closeWindow} from './modal.js'
const cardTemplate = document.querySelector("#card-template").content;
const pictureWindow = document.querySelector(".popup_type_image");
export function handleProfileSubmit(evt, profileTitle, profileDescription) {
  evt.preventDefault();
  profileTitle.textContent = evt.srcElement.name.value;
  profileDescription.textContent = evt.srcElement.description.value;
  evt.srcElement.reset();
}
export function handleCardSubmit(evt,placesList) {
  evt.preventDefault();
  const card = {
    name: evt.srcElement.elements["place-name"].value,
    link: evt.srcElement.elements["link"].value
  };
  placesList.prepend(createCard(card));
  evt.srcElement.reset();
}

export function createCard(card) {  
  let newCard = cardTemplate.querySelector(".places__item").cloneNode(true);
  newCard.querySelector(".card__image").src = card.link;
  newCard.querySelector(".card__title").textContent = card.name;
  newCard
    .querySelector(".card__delete-button")
    .addEventListener("click", removeMe);
  newCard.querySelector(".card__like-button").addEventListener('click',likeUnlike);
  newCard.querySelector('.card__image').addEventListener('click',function(){
    openWindow(pictureWindow);
    pictureWindow.querySelector('.popup__image').setAttribute('src',card.link);
    pictureWindow.querySelector('.popup__caption').setAttribute('src',card.name);
    
  });
  return newCard;
}

//card__like-button

const removeMe = (event) => {
  const card = event.srcElement.closest(".places__item");
  card.remove();
};

 function likeUnlike(evt){  
  evt.target.classList.toggle('card__like-button_is-active');
}

function popUpimage(evt){

}

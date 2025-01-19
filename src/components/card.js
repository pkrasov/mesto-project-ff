const cardTemplate = document.querySelector("#card-template").content;

export function createCard(card, popupImage) {
  let newCard = cardTemplate.querySelector(".places__item").cloneNode(true);
  newCard.querySelector(".card__image").src = card.link;
  newCard.querySelector(".card__title").textContent = card.name;
  newCard
    .querySelector(".card__delete-button")
    .addEventListener("click", removeMe);
  newCard
    .querySelector(".card__like-button")
    .addEventListener("click", likeUnlike);
  newCard.querySelector(".card__image").addEventListener("click", popupImage);
  return newCard;
}

const removeMe = (event) => {
  const card = event.srcElement.closest(".places__item");
  card.remove();
};

function likeUnlike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

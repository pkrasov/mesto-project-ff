const cardTemplate = document.querySelector("#card-template").content;

export function createCard(my_id, card, popupImage, deleteCard, likeUnlike) {
  let newCard = cardTemplate.querySelector(".places__item").cloneNode(true);
  newCard.querySelector(".card__image").src = card.link;
  newCard.querySelector(".card__delete-button").hidden =
    card.owner._id !== my_id;
  newCard.querySelector(".card__title").textContent = card.name;
  newCard.querySelector(".card__like-count").textContent = card.likes.length;
  newCard
    .querySelector(".card__delete-button")
    .addEventListener("click", (evt) => {
      deleteCard(evt, card._id);
    });

  if (card.likes.find((x) => x._id === my_id)) {
    newCard
      .querySelector(".card__like-button")
      .classList.add("card__like-button_is-active");
  }

  newCard
    .querySelector(".card__like-button")
    .addEventListener("click", (evt) => {
      likeUnlike(evt, card);
    });
  newCard.querySelector(".card__image").addEventListener("click", popupImage);
  return newCard;
}

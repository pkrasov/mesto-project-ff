const cardTemplate = document.querySelector("#card-template").content;

export function createCard(my_id, card, popupImage, deleteCard, likeUnlike) {
  const newCard = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImg = newCard.querySelector(".card__image");
  const cardLike = newCard.querySelector(".card__like-button");
  cardImg.src = card.link;
  cardImg.alt = card.name;
  if (card.owner._id !== my_id)
    newCard
      .querySelector(".card__delete-button")
      .classList.add("card__delete-button-hide");

  newCard.querySelector(".card__title").textContent = card.name;
  newCard.querySelector(".card__like-count").textContent = card.likes.length;
  newCard
    .querySelector(".card__delete-button")
    .addEventListener("click", (evt) => {
      deleteCard(evt, card._id, removeCard);
    });

  if (card.likes.find((x) => x._id === my_id)) {
    cardLike.classList.add("card__like-button_is-active");
  }
  cardLike.addEventListener("click", (evt) => {
    likeUnlike(
      evt,
      cardLike.classList.contains("card__like-button_is-active"),
      refreshLike,
      card
    );
  });
  cardImg.addEventListener("click", () => popupImage(card.name, card.link));
  cardImg.addEventListener("click", popupImage);
  return newCard;
}
const removeCard = (evt) => {
  evt.srcElement.closest(".places__item").remove();
};

const refreshLike = (evt, res) => {
  evt.srcElement
    .closest(".card__like-section")
    .querySelector(".card__like-count").textContent = res.likes.length;
  evt.target.classList.toggle("card__like-button_is-active");
};

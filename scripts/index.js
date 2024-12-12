const cardTemplate = document.querySelector("#card-template").content;

const placesList = document.querySelector(".places__list");

function createCard(card, event) {
  let newCard = cardTemplate.querySelector(".places__item").cloneNode(true);
  newCard.querySelector(".card__image").src = card.link;
  newCard.querySelector(".card__title").textContent = card.name;
  newCard
    .querySelector(".card__delete-button")
    .addEventListener("click", event);
  return newCard;
}

const removeMe = (event) => {
  const card = event.srcElement.closest(".places__item");
  card.remove();
};

for (itm of initialCards) {
  placesList.append(createCard(itm, removeMe));
}

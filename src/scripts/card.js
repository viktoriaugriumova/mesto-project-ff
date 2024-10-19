//Функция удаления карточки
export function deleteCard(event) {
    const card = event.target.closest('.places__item');
    card.remove();
};

// Обработчик кнопки лайк
export function makeLikeButtonActive(event) {
	event.target.classList.toggle('card__like-button_is-active');
}

// Функция создания карточки
export function createCard(newCard, deleteCard, makeLikeButtonActive, openImagePopup) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    cardElement.querySelector('.card__title').textContent = newCard.name;
    cardElement.querySelector('.card__image').src = newCard.link;
    cardElement.querySelector('.card__image').alt = newCard.alt;

    const deleteCardButton = cardElement.querySelector('.card__delete-button');
    deleteCardButton.addEventListener('click', deleteCard);

    const cardLikeButton = cardElement.querySelector('.card__like-button')
    cardLikeButton.addEventListener('click', makeLikeButtonActive);

    cardImage.addEventListener('click', () =>
		openImagePopup(cardImage.src, cardImage.alt)
	)

    return cardElement;
};



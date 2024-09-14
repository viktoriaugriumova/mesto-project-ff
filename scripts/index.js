// DOM узлы
const cardsContainer = document.querySelector('.places__list');

//Функция удаления карточки
function deleteCard(event) {
    const card = event.target.closest('.places__item');
    card.remove();
};

// Функция создания карточки
function createCard(newCard, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = newCard.name;
    cardElement.querySelector('.card__image').src = newCard.link;
    cardElement.querySelector('.card__image').alt = newCard.alt;

    const deleteCardButton = cardElement.querySelector('.card__delete-button');
    deleteCardButton.addEventListener('click', deleteCard);

    return cardElement;
};

// Вывести карточки на страницу
function renderCards() {
    for (let i = 0; i < initialCards.length; i++) {
        const newCard = createCard(initialCards[i], deleteCard);
        cardsContainer.append(newCard);
    }
};

renderCards();

// DOM узлы
const cardContainer = document.querySelector('.places__list');
const deleteCardButton = document.querySelector('.card__delete-button');

//Функция удаления карточки
function deleteCard() {
    const card = deleteCardButton.closest('.places__item');
    card.remove();
};

// Функция создания карточки
function renderCards(deleteCard) {
    for (let i = 0; i < initialCards.length; i++) {
        const cardTemplate = document.querySelector('#card-template').content;
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

        cardElement.querySelector('.card__title').textContent = initialCards[i].name;
        cardElement.querySelector('.card__image').src = initialCards[i].link;

        cardContainer.append(cardElement);

        // deleteCardButton.addEventListener('click', deleteCard);
    }
};

// Вывести карточки на страницу
renderCards();

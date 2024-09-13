// DOM узлы
const cardContainer = document.querySelector('.places__list');

//Функция удаления карточки
function deleteCard(event) {
    const card = event.target.closest('.places__item');
    console.log(card);
    card.remove();
};


// Функция создания карточки
function renderCards() {
    for (let i = 0; i < initialCards.length; i++) {
        const cardTemplate = document.querySelector('#card-template').content;
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

        cardElement.querySelector('.card__title').textContent = initialCards[i].name;
        cardElement.querySelector('.card__image').src = initialCards[i].link;

        const deleteCardButton = cardElement.querySelector('.card__delete-button');
        deleteCardButton.addEventListener('click', deleteCard);

        cardContainer.append(cardElement);
    }
};

// Вывести карточки на страницу
renderCards();

// DOM узлы
const cardContainer = document.querySelector('.places__list');

//Функция удаления карточки
function deleteCard(event) {
    const card = event.target.closest('.places__item');
    console.log(card);
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

        const deleteCardButton = cardElement.querySelector('.card__delete-button');
        console.log(deleteCardButton);
        console.log(typeof(deleteCardButton));
        deleteCardButton.addEventListener('click', deleteCard);
    }

};

// Вывести карточки на страницу
renderCards();

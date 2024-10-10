import './pages/index.css';
import { initialCards } from './scripts/cards.js'
import { addCardForm, openImageModal } from './scripts/modal.js'

const placesList = document.querySelector('.places__list')
const cardTemplate = document.querySelector('#card-template').content


// DOM узлы
const cardsContainer = document.querySelector('.places__list');

//Функция удаления карточки
function deleteCard(event) {
    const card = event.target.closest('.places__item');
    card.remove();
};

// Функция создания карточки
export function createCard(cardData, likeHandler) {
	const cardElement = cardTemplate
		.querySelector('.places__item')
		.cloneNode(true)
    const cardDeleteButton = cardElement.querySelector('.card__delete-button')
	const cardLikeButton = cardElement.querySelector('.card__like-button')
	const cardPicture = cardElement.querySelector('.card__image')
	const cardTitle = cardElement.querySelector('.card__title')

	cardPicture.src = cardData.link
	cardPicture.alt = cardData.name
	cardTitle.textContent = cardData.name

	cardDeleteButton.addEventListener('click', () => cardElement.remove())
	cardLikeButton.addEventListener('click', likeHandler)

	cardPicture.addEventListener('click', () =>
		openImageModal(cardPicture.src, cardPicture.alt)
	)

	return cardElement
}

// Вывести карточки на страницу
function renderCards() {
    for (let i = 0; i < initialCards.length; i++) {
        const newCard = createCard(initialCards[i], deleteCard);
        cardsContainer.append(newCard);
    }
};

renderCards();

const formAddElement = document.querySelector(
	'.popup_type_new-card .popup__form'
)
addCardForm(placesList, createCard)

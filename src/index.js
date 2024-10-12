import './pages/index.css';
import { initialCards } from './scripts/cards.js'
import { closeOnOverlay, closeOnEsc, closeOnCross, openPopup, closePopup } from './scripts/modal.js';


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



// DOM узлы МОДАЛКИ

const profileEditButton = document.querySelector('.profile__edit-button')
const profileEditPopup = document.querySelector('.popup_type_edit')
const profileName = document.querySelector('.profile__title')
const profileProfession = document.querySelector('.profile__description')
const profileEditForm = profileEditPopup.querySelector('.popup__form')
const nameInput = profileEditForm.querySelector('input[name="name"]')
const professionInput = profileEditForm.querySelector('input[name="description"]')

// Открываем профиль
profileEditButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent
    professionInput.value = profileProfession.textContent
    openPopup(profileEditPopup)
})

// Событие для сохранения редактирования профиля
function handleFormSubmit(evt) {
    evt.preventDefault()
    profileName.textContent = nameInput.value
    profileProfession.textContent = professionInput.value
    closePopup(profileEditPopup)
}

// Слушатель на событие клик по Сохранить в форме профиля
profileEditPopup.addEventListener('submit', handleFormSubmit); 


// Вешаем слушатель на событие клик по оверлею
export function initializePopupOverlayClose() {
    const popup = document.querySelector('.popup_is-opened');
    if (popup) {
        popup.addEventListener('click', closeOnOverlay);
    }
}

// Вешаем слушатель на событие Esc
export function initializePopupEscClose() {
    document.addEventListener('keydown', closeOnEsc);
}

// Вешаем слушатель на событие клика по крестику
export function initializePopupCloseOnCross() {
    document.addEventListener('click', closeOnCross);
}





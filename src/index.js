import './pages/index.css';
import { renderCards } from './scripts/card.js';
import { closeOnOverlay, closeOnEsc, closeOnCross, openPopup, closePopup } from './scripts/modal.js';

// DOM узлы модалки редактирования профиля
const cardsContainer = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button')
const profileEditPopup = document.querySelector('.popup_type_edit')
const profileName = document.querySelector('.profile__title')
const profileProfession = document.querySelector('.profile__description')
const profileEditForm = profileEditPopup.querySelector('.popup__form')
const nameInput = profileEditForm.querySelector('input[name="name"]')
const professionInput = profileEditForm.querySelector('input[name="description"]')


// Открываем модалку редактирования профиля
profileEditButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent
    professionInput.value = profileProfession.textContent
    openPopup(profileEditPopup)
})

// Событие для сохранения редактирования профиля
function saveChangedProfile(evt) {
    evt.preventDefault()
    profileName.textContent = nameInput.value
    profileProfession.textContent = professionInput.value
    closePopup(profileEditPopup)
}

// Слушатель на событие клик по Сохранить в форме профиля
profileEditPopup.addEventListener('submit', saveChangedProfile);

// Вешаем слушатель на событие клик по оверлею для всех попапов
export function initializePopupOverlayClose() {
    const popup = document.querySelector('.popup_is-opened');
    if (popup) {
        popup.addEventListener('click', closeOnOverlay);
    }
}

// Вешаем слушатель на событие Esc для всех попапов
export function initializePopupEscClose() {
    document.addEventListener('keydown', closeOnEsc);
}

// Вешаем слушатель на событие клика по крестику для всех попапов
export function initializePopupCloseOnCross() {
    document.addEventListener('click', closeOnCross);
}

// DOM узлы модалки добавления карточки
const cardAddButton = document.querySelector('.profile__add-button')
const cardAddPopup = document.querySelector('.popup_type_new-card')
const cardAddForm = cardAddPopup.querySelector('.popup__form')

const cardAddNameInput = cardAddForm.querySelector('.popup__input_type_card-name')
const cardAddLinkInput = cardAddForm.querySelector('.popup__input_type_url')

// Открываем модалку добавления карточки
cardAddButton.addEventListener('click', () => {
    openPopup(cardAddPopup)
})

// Событие для сохранения новой карточки
export function addNewCard(createCard, evt) {
    evt.preventDefault()

    const newCardParameters = {
        name: cardAddNameInput.value,
        link: cardAddLinkInput.value,
    }

    const newCard = createCard(newCardParameters)
    cardsContainer.prepend(newCard)

    closePopup(cardAddPopup)
    cardAddForm.reset()
}

// Слушатель на событие клик по Сохранить в форме новой карточки
cardAddForm.addEventListener('submit', addNewCard);






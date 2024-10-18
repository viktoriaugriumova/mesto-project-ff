import './pages/index.css';
import { initialCards } from './scripts/cards.js'
import { createCard, deleteCard, makeLikeButtonActive } from './scripts/card.js';
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

// DOM узлы модалки добавления карточки
const cardAddButton = document.querySelector('.profile__add-button')
const cardAddPopup = document.querySelector('.popup_type_new-card')
const cardAddForm = cardAddPopup.querySelector('.popup__form')
const cardAddNameInput = cardAddForm.querySelector('.popup__input_type_card-name')
const cardAddLinkInput = cardAddForm.querySelector('.popup__input_type_url')

// DOM узлы моалки с картинкой
const imagePopup = document.querySelector('.popup_type_image')

// Вывести карточки на страницу
export function renderCards() {
    for (let i = 0; i < initialCards.length; i++) {
        const newCard = createCard(initialCards[i], deleteCard, makeLikeButtonActive, openImagePopup);
        cardsContainer.append(newCard);
    }
};

// Отрисовываем уже имеющиеся карточки из массива
renderCards();

// Открываем модалку редактирования профиля
profileEditButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent
    professionInput.value = profileProfession.textContent
    openPopup(profileEditPopup)
})

// Рассказываем как именно сохранить данные профиля после редактирования
function saveChangedProfile(evt) {
    evt.preventDefault()
    profileName.textContent = nameInput.value
    profileProfession.textContent = professionInput.value
    closePopup(profileEditPopup)
}

// Указываем по какому действию сохранять отредактированный профиль
profileEditPopup.addEventListener('submit', saveChangedProfile);


export function initializePopupOverlayClose() {
    const popup = document.querySelector('.popup_is-opened');
    popup.addEventListener('click', closeOnOverlay);
}

// Говорим, что все попапы нужно закрывать кликом по Esc
export function initializePopupEscClose() {
    document.addEventListener('keydown', closeOnEsc);
}

// Говорим, что все попапы нужно закрывать кликом по крестику
export function initializePopupCloseOnCross() {
    document.addEventListener('click', closeOnCross);
}

// Открываем модалку добавления новой карточки
cardAddButton.addEventListener('click', () => {
    openPopup(cardAddPopup)
})

// Указываем по какому действию сохранять новую карточку
cardAddForm.addEventListener('submit', addNewCard);

//  Рассказываем как именно сохранить данные новой карточки
export function addNewCard(evt) {
    evt.preventDefault()
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = cardAddNameInput.value;
    cardElement.querySelector('.card__image').src = cardAddLinkInput.value;

    cardsContainer.prepend(cardElement)

    closePopup(cardAddPopup)
    cardAddForm.reset()
}

// Рассказываем как и когда открывать попап с картинкой
export function openImagePopup () {
    const cardImage = document.querySelectorAll(".card__image");

    for (let i = 0, len = cardImage.length; i < len; i++) {
        cardImage[i].addEventListener('click', function () {
            const popupImage = document.querySelector(".popup__image");
            const popupCaption = document.querySelector(".popup__caption");
            popupCaption.textContent = cardImage[i].alt;
            popupImage.src = cardImage[i].src;
            openPopup(imagePopup);
        });
    };
}
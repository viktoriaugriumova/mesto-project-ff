import './pages/index.css';
import { createCard, deleteCard, makeLikeButtonActive } from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { getUser, editProfile, fetchCards, makeNewCardAtServer } from './scripts/api.js';

// DOM узлы профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

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

getUser();

// Функция обновления инфы о юзере на странице
export function updateProfileInfo(user) {
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.value = user.avatar;
}

// Отрисовываем карточки
export function renderCards(cardsData, deleteCard, makeLikeButtonActive, openImagePopup, userId) {
    cardsContainer.innerHTML = ''; // Очистить контейнер перед добавлением новых карточек

    // Перебираем массив карточек и добавляем их на страницу
    cardsData.forEach(card => {
        const newCard = createCard(card, deleteCard, makeLikeButtonActive, openImagePopup, userId);
        cardsContainer.append(newCard);
    });
}

fetchCards();

// Открываем модалку редактирования профиля
profileEditButton.addEventListener('click', () => {
    clearValidation(profileEditPopup);
    nameInput.value = profileName.textContent
    professionInput.value = profileProfession.textContent
    openPopup(profileEditPopup);
})

// Рассказываем как именно сохранить данные профиля после редактирования
function saveChangedProfile(evt) {
    evt.preventDefault()

    // Получаем значения из полей ввода
    const updatedName = nameInput.value;
    const updatedProfession = professionInput.value;

    // Обновляем текст на странице
    profileName.textContent = updatedName;
    profileProfession.textContent = updatedProfession;

    // Отправляем PATCH-запрос на сервер
    editProfile(updatedName, updatedProfession);

    closePopup(profileEditPopup)
}

// Указываем по какому действию сохранять отредактированный профиль
profileEditPopup.addEventListener('submit', saveChangedProfile);

// Открываем модалку добавления новой карточки
cardAddButton.addEventListener('click', () => {
    clearValidation(cardAddPopup);
    openPopup(cardAddPopup);
})

// // Создаем новый объект карточки с помощью createCard
export function createNewCardObject(deleteCard, makeLikeButtonActive, openImagePopup, userId) {
    const newCardParameters = {
        name: cardAddForm.querySelector('input[name="place-name"]').value,
        link: cardAddForm.querySelector('input[name="link"]').value,
    };

    // Отправляем данные о новой карточке на сервер
    makeNewCardAtServer(newCardParameters.name, newCardParameters.link);

    // Создаём карточку
    const newCard = createCard(newCardParameters, deleteCard, makeLikeButtonActive, openImagePopup, userId);
    return newCard;
}

// Рассказываем как именно сохранить данные новой карточки
function addNewCard(evt) {
    evt.preventDefault()
    cardsContainer.prepend(createNewCardObject());
    closePopup(cardAddPopup)
    cardAddForm.reset()
}

// Указываем по какому действию сохранять новую карточку
cardAddForm.addEventListener('submit', addNewCard);

// Открываем модалку с картинкой
export function openImagePopup(imageUrl, imageAlt) {
	const popupTypeImage = document.querySelector('.popup_type_image')
	const popupImage = popupTypeImage.querySelector('.popup__image')
	const popupCaption = popupTypeImage.querySelector('.popup__caption')

	popupImage.src = imageUrl
	popupImage.alt = imageAlt
	popupCaption.textContent = imageAlt
	openPopup(popupTypeImage)
}

//Включаем валидацию для всех форм
enableValidation();
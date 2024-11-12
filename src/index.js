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
    openPopup(profileEditPopup);
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

// Открываем модалку добавления новой карточки
cardAddButton.addEventListener('click', () => {
    openPopup(cardAddPopup)
})

// Создаем новый объект карточки с помощью createCard
export function createNewCardObject(deleteCard, makeLikeButtonActive, openImagePopup) {
    const newCardParameters = {
        name: cardAddForm.querySelector('input[name="place-name"]').value,
        link: cardAddForm.querySelector('input[name="link"]').value,
	}

	const newCard = createCard(newCardParameters, deleteCard, makeLikeButtonActive, openImagePopup)
    console.log(newCard);
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

//Валидация

const formElement = document.querySelector('.popup__form');

//Добавление классов при невалидном значении
const addInputErrorClass = (formElement, formInput, errorMessage) => {
    const errorElement = formElement.querySelector(`.${formInput.id}-error`);
    if (!errorElement) return; // Пропустить, если элемент не найден
    console.log("Добавление ошибки:", errorMessage); // Отладка
    formInput.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
};

//Удаление классов при валидном занчении
const deleteInputErrorClass = (formElement, formInput) => {
    const errorElement = formElement.querySelector(`.${formInput.id}-error`);
    if (!errorElement) return; // Пропустить, если элемент не найден
    console.log("Удаление ошибки"); // Отладка
    formInput.classList.remove('popup__input_type_error');
    errorElement.textContent = '';
    errorElement.classList.remove('form__input-error_active');
};

//Проверка валидности инпута
const isValid = (formElement, formInput) => {
    console.log("Проверка валидности поля:", formInput.id); // Отладка
    if (formInput.validity.patternMismatch) {
        formInput.setCustomValidity(formInput.dataset.errorMessage);
    } else {
        formInput.setCustomValidity("");
    }

    if (!formInput.validity.valid) {
        addInputErrorClass(formElement, formInput, formInput.validationMessage);
    } else {
        deleteInputErrorClass(formElement, formInput);
    }
};

//Функция, которая проверяет все поля в форме и фигачит кнопку
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        isValid(formElement, formInput)
        toggleButtonState(inputList, buttonElement);
      });
    });
}; 

  //Функция, которая проверяет все формы на странице
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));

    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });
};

// Функция проверки есть ли невалидный инпут
const hasInvalidInput = (inputList) => {
    return inputList.some((formInput) => {
      return !formInput.validity.valid;
    })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add('form__submit_inactive');
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('form__submit_inactive');
    }
};
  
  enableValidation();

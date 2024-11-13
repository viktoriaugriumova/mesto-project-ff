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
export const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));

    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });
};

//Функция очистки валидации
export const clearValidation = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');

    inputList.forEach((formInput) => {
        deleteInputErrorClass(formElement, formInput); // Удаляем классы ошибок
        formInput.setCustomValidity(""); // Сбрасываем кастомные сообщения об ошибке
    });

    // Обновляем состояние кнопки
    toggleButtonState(inputList, buttonElement);
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
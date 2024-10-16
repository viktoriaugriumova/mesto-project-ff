import { initializePopupOverlayClose, initializePopupEscClose, initializePopupCloseOnCross } from "../../src/index.js";


//Функция открытия модалки
export function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');

    initializePopupOverlayClose();
    initializePopupCloseOnCross(); 
    initializePopupEscClose();
};

// Функция закрытия модалки
export function closePopup(popupElement) {
	popupElement.classList.remove('popup_is-opened')
    document.removeEventListener('click', closeOnCross);
    document.removeEventListener('keydown', closeOnEsc);
}

// Закрытие на оверлей
export function closeOnOverlay(event) {
    if (event.target === event.currentTarget) {
        closePopup(event.currentTarget);
    }
}

// Закрытие на Esc
export function closeOnEsc(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

// Закрытие на крестик
export function closeOnCross(event) {
    const closeButton = event.target.closest('.popup__close');
    if (closeButton) {
        const popup = closeButton.closest('.popup');
        closePopup(popup);
    }
}



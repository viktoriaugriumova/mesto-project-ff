export function openModal(popupElement) {
	popupElement.classList.add('popup_is-opened')
}

export function closeModal(popupElement) {
	popupElement.classList.remove('popup_is-opened')
}

//Узлы
const profileEditButton = document.querySelector('.profile__edit-button')
const popupTypeEdit = document.querySelector('.popup_type_edit')
const profileAddButton = document.querySelector('.profile__add-button')
const formEditElement = popupTypeEdit.querySelector('.popup__form')
const jobInput = formEditElement.querySelector('input[name="description"]')
const profileName = document.querySelector('.profile__title')
const nameInput = formEditElement.querySelector('input[name="name"]')
const profileDescription = document.querySelector('.profile__description')
const popupTypeNewCard = document.querySelector('.popup_type_new-card')

// Открываем профиль
profileEditButton.addEventListener('click', () => {
	nameInput.value = profileName.textContent
	jobInput.value = profileDescription.textContent
	openModal(popupTypeEdit)
})

// Событие для редактирования профиля
formEditElement.addEventListener('submit', evt => {
	evt.preventDefault()
	profileName.textContent = nameInput.value
	profileDescription.textContent = jobInput.value
	closeModal(popupTypeEdit)
})

// Открываем карточку
profileAddButton.addEventListener('click', () => openModal(popupTypeNewCard))

// Событие для добавления карточки
const formAddElement = popupTypeNewCard.querySelector('.popup__form')

export function addCardForm(placesList, createCard) {
	formAddElement.addEventListener('submit', evt => {
		evt.preventDefault()

		const newCardData = {
			name: formAddElement.querySelector('input[name="place-name"]').value,
			link: formAddElement.querySelector('input[name="link"]').value,
		}

		const newCard = createCard(newCardData, handleLikeButton)
		placesList.prepend(newCard)

		closeModal(popupTypeNewCard)
		formAddElement.reset()
	})
}

// Закрываем кликом по фону
document.querySelectorAll('.popup').forEach(popup => {
	popup.addEventListener('click', event => {
		if (event.target === popup) {
			closeModal(popup)
		}
	})
})

// Закрываем крестиком
document.querySelectorAll('.popup__close').forEach(button => {
	button.addEventListener('click', () => closeModal(button.closest('.popup')))
})

// Закрываем клавишей Esc
document.addEventListener('keyup', evt => {
	if (evt.key == 'Escape') {
		document
			.querySelectorAll('.popup_is-opened')
			.forEach(popup => closeModal(popup))
	}
})

// Открываем модалку с картинкой
export function openImageModal(imageUrl, imageAlt) {
	const popupTypeImage = document.querySelector('.popup_type_image')
	const popupImage = popupTypeImage.querySelector('.popup__image')
	const popupCaption = popupTypeImage.querySelector('.popup__caption')

	popupImage.src = imageUrl
	popupImage.alt = imageAlt
	popupCaption.textContent = imageAlt
	openModal(popupTypeImage)
}

// Кнопка лайк
function handleLikeButton(event) {
	event.target.classList.toggle('card__like-button_active')
}
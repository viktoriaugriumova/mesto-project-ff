import { updateProfileInfo, renderCards } from "../index.js";

// Получаем данные юзера с сервера
export function getUser() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-27/users/me', {
        headers: {
            authorization: 'cb855d73-d078-4680-854c-1ea1edd5e68c'
        }
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
        }
        return res.json();
    })
    .then((result) => {
        if (result._id) {
            updateProfileInfo(result); // Обновляем профиль (если нужно)
        }
        return result;
    })
    .catch((err) => {
        // Обработка ошибок, если необходимо
    });
}


// Редактируем данные профиля на сервере
export function editProfile(updatedName, updatedProfession) {
    fetch('https://nomoreparties.co/v1/wff-cohort-27/users/me', {
        method: 'PATCH',
        headers: {
            authorization: 'cb855d73-d078-4680-854c-1ea1edd5e68c',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: updatedName,
            about: updatedProfession
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// // Получаем карточки с сервера
export function fetchCards(deleteCard, makeLikeButtonActive, openImagePopup) {
    // Создаём массив с промисами для каждого запроса
    const requests = [
        fetch('https://nomoreparties.co/v1/wff-cohort-27/users/me', {
            method: 'GET',
            headers: {
                authorization: 'cb855d73-d078-4680-854c-1ea1edd5e68c',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()), // Получаем данные о пользователе

        fetch('https://nomoreparties.co/v1/wff-cohort-27/cards', {
            method: 'GET',
            headers: {
                authorization: 'cb855d73-d078-4680-854c-1ea1edd5e68c',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()) // Получаем данные о карточках
    ];

    // Используем Promise.all для параллельного выполнения обоих запросов
    return Promise.all(requests)
        .then(([userData, cardsData]) => {
            const userId = userData._id; // Извлекаем userId из данных пользователя

            // Передаём данные карточек и userId в renderCards
            renderCards(cardsData, deleteCard, makeLikeButtonActive, openImagePopup, userId);
        })
        .catch(error => {
            // Рендерим пустой массив карточек при ошибке
            renderCards([], deleteCard, makeLikeButtonActive, openImagePopup, null);
        });
}


// Добавление новой карточки на сервер
export function makeNewCardAtServer(newCardName, newCardLink) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-27/cards', {
        method: 'POST',
        headers: {
          authorization: 'cb855d73-d078-4680-854c-1ea1edd5e68c',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newCardName,
            link: newCardLink
        })
    })
        .then(res => res.json())
        .then((result) => {
          console.log(result);
    }); 
}




// // Удаление карточки на сервере
// function deleteCardFromServer(cardId) {
//     return fetch(`https://nomoreparties.co/v1/wff-cohort-27/cards/${cardId}`, {
//         method: 'DELETE',
//         headers: {
//           authorization: 'cb855d73-d078-4680-854c-1ea1edd5e68c',
//           'Content-Type': 'application/json'
//         },
//     })
//         .then(res => res.json())
//         .then(() => {
//           console.log('Success delete');
//     }); 
// }
import { updateProfileInfo, renderCards } from "../index.js";

export function getUser() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-27/users/me', {
        headers: {
          authorization: 'cb855d73-d078-4680-854c-1ea1edd5e68c'
        }
    })
        .then(res => res.json())
        .then((result) => {
          console.log(result);
          updateProfileInfo(result);
          return result;
    }); 
}


// Редактируем данные профиля
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

// Функция получения карточек с сервера
export function fetchCards() {
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
            console.log('User data:', userData);
            console.log('Cards data:', cardsData);
            
            // Передаем массив карточек в renderCards
            renderCards(cardsData);
        })
        .catch(error => {
            console.error('Error:', error);
            renderCards([]);
        });
}
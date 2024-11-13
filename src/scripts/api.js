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
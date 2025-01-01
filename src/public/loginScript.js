/* eslint-disable no-undef */

// elements
const loginInputs = document.querySelectorAll('.login-form__input');


// event handlers
const handleInputBlur = (e) => {
    const input = e.currentTarget;

    input.classList.add('login-form__input--with-invalid');
}

const handleInputFocus = (e) => {
    const input = e.currentTarget;

    input.classList.remove('login-form__input--with-invalid');
}


// event listeners
loginInputs.forEach(input => {
    input.addEventListener('focus', handleInputFocus);
    input.addEventListener('blur', handleInputBlur);
})
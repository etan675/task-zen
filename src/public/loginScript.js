/* eslint-disable no-undef */

// elements
const loginForm = document.getElementById('loginForm');
const loginInputs = document.querySelectorAll('.login-form__input');
const loginFailMessage = document.querySelector('.login-form__fail-message');

// event handlers
const handleLoginFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const email = formData.get('email');
    const password = formData.get('password');

    const loginSuccess = await login(email, password);
    
    if (loginSuccess) {
        sessionStorage.setItem('userEmail', email);

        window.location.replace('/tasks');

    } else {
        loginFailMessage.classList.toggle('hidden');
    }
}

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
loginForm.addEventListener('submit', handleLoginFormSubmit);


// data fetching
const login = async (email, password) => {
    const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    return res.ok;
}
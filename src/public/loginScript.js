/* eslint-disable no-undef */

// elements
const loginForm = document.getElementById('loginForm');
const loginInputs = document.querySelectorAll('.login-form__input');

// event handlers
const handleLoginFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);

    const loginSuccess = await login(formData.get('email'), formData.get('password'));
    
    if (loginSuccess) {
        window.location.replace('/');

    } else {
        //TODO: show login fail message

        console.log('login failed!');
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
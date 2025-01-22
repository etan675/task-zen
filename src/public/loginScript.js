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

    const signupSuccess = await login(email, password);
    
    if (signupSuccess) {
        sessionStorage.setItem('userEmail', email);

        window.location.replace('/tasks');

    } else {
        loginFailMessage.classList.remove('hidden');
    }
}

const handleSignupFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const email = formData.get('email');
    const password = formData.get('password');

    const signupSuccess = await signup(email, password);
    
    if (signupSuccess) {
        window.location.replace('/login');

    } else {
        loginFailMessage.classList.remove('hidden');
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

if (window.location.pathname === '/login') {
    loginForm.addEventListener('submit', handleLoginFormSubmit);

} else if (window.location.pathname === '/signup') {
    loginForm.addEventListener('submit', handleSignupFormSubmit);
}


// data fetching
const login = async (email, password) => {
    const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    return res.ok;
}

const signup = async (email, password) => {
    const res = await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    return res.ok;
}
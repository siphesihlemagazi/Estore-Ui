if (localStorage.getItem('jwt')) {
    window.location.href = '../products.html';
}

const apiUrl = 'http://127.0.0.1:8000/api/dev/accounts'

const passwordResetConfirmForm = document.getElementById('password-reset-confirm-form');
passwordResetConfirmForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const url = new URL(window.location.href);
    const uid = url.searchParams.get("uid");
    const token = url.searchParams.get("token");
    const password = passwordResetConfirmForm.elements.password.value;
    const password2 = passwordResetConfirmForm.elements.password2.value;
    const response = await fetch(`${apiUrl}/password-reset-confirm/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password,
            password2,
            uid,
            token
        })
    });
    const errorMessage = document.getElementById("err-message");
    if (!response.ok) {
        const error = await response.json();
        for (let key in error) {
            let message = error[key].join('\n').replace(/[\[\]',]/g, '')
            errorMessage.innerHTML = `<div class="alert alert-warning mb-4 small" id="err-message" role="alert">
                                    ${message}
                                </div>`;
        }
        return;
    }
    else{
        window.location.href = 'login.html';
    }

});


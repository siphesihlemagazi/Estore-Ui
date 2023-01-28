if (localStorage.getItem('jwt')) {
    window.location.href = '../products.html';
}

const apiUrl = 'http://127.0.0.1:8000/api/dev'

const form = document.getElementById("login-form");
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    const response = await fetch(`${apiUrl}/accounts/login/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    if (!response.ok) {
        const errMessage = document.getElementById("err-message");
        const error = await response.json();
        console.error(`Error: ${error.message}`);
        errMessage.innerHTML = `<div class="alert alert-warning mb-4 small" id="err-message" role="alert">
                                    ${error.message}
                                </div>`
        return;
    }
    const data = await response.json();
    if (data.token) {
        localStorage.setItem("jwt", data.token);
        window.location.href = "../products.html";
    } else {
        errMessage.innerHTML = `<div class="alert alert-warning mb-4 small" id="err-message" role="alert">
                                    Internal server error, you might want to contact support.
                                </div>`
    }
});

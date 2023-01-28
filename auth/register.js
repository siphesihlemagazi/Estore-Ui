const apiUrl = 'http://127.0.0.1:8000/api/dev'

const form = document.getElementById("register-form");
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("comfirm_password");
    const response = await fetch(`${apiUrl}/accounts/register/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            first_name,
            last_name,
            username,
            email,
            password,
            confirmPassword
        })
    });
    if (!response.ok) {
        const errorObject = await response.json();
        console.error(`Error: ${JSON.stringify(errorObject)}`);

        const errorList = [];
        for (const key in errorObject) {
            errorObject[key].forEach((error) => {
                errorList.push(`${key}: ${error}`);
            });
        }
        console.log(errorList)

        const errorHTML = errorList.map(error => `<li class="ms-3">${error}</li>`).join('');
        const html = `<ul class="alert alert-warning mb-4 small" id="err-message" role="alert">
                          ${errorHTML}</ul>`;

        const errMessage = document.getElementById("err-message");
        errMessage.innerHTML = html;
        return;
    }
    else{
        window.location.href = "login.html";
    }
});

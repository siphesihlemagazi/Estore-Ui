const navbar = document.querySelector("#navbar");
navbar.innerHTML = `
<header class="section-header">
    <nav class="navbar navbar-dark navbar-expand p-0 bg-dark">
        <div class="container-fluid">
            <ul class="navbar-nav d-none d-md-flex mr-auto">
                <li class="nav-item"><a class="nav-link" href="#" data-abc="true">Cash On Delivery</a></li>
                <li class="nav-item"><a class="nav-link" href="#" data-abc="true">Free Delivery</a></li>
                <li class="nav-item"><a class="nav-link" href="#" data-abc="true">Cash Backs</a></li>
            </ul>
            <ul class="navbar-nav d-flex align-items-center">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="assets/EYFtR83.jpg" class="rounded-circle" width="30">
                        <span>Nantano M</span>
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" id="auth-links">
                        <li><a class="dropdown-item small" href="auth/login.html">Login</a></li>
                        <li><a class="dropdown-item small" href="auth/register.html">Register</a></li>
                        <li><a class="dropdown-item small" href="#" id="logout">Logout</a></li>
                        <li><a class="dropdown-item small" href="#">Update account</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>

    <section class="header-main border-bottom bg-white">
        <div class="container-fluid">
            <div class="row p-2 pt-3 pb-3 align-items-center">
                <div class="col-md-2">
                    <img class="d-md-flex" src="assets/R8QhGhk.png" width="100">
                </div>
                <div class="col-md-8">
                    <div class="d-flex form-inputs">
                        <input class="form-control" type="text" placeholder="Search any product...">
                        <i class="bx bx-search"></i>
                    </div>
                </div>

                <div class="col">
                    <a class="d-flex d-md-flex flex-row align-items-center 
                    text-dark text-decoration-none" id="cart-url" href="cart.html">
                        <span class="shop-bag"><i class="bi bi-bag"></i></span>
                        <div class="d-flex flex-column ms-2">
                            <span class="cart-qty">1 Product(s)</span>
                            <span class="fw-bold cart-total">R27.90</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand d-md-none d-md-flex" href="#">Categories</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="products.html">All</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#">Electronics</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Fashion</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Furnitures</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Mobiles
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <li><a class="dropdown-item" href="#">Smart Phones</a></li>
                            <li><a class="dropdown-item" href="#">Feature Phones</a></li>
                            <li><a class="dropdown-item" href="#">Mobile Covers</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
`

// Auth urls
const authLinks = document.getElementById("auth-links");
const loginLink = authLinks.querySelector("a[href='auth/login.html']");
const registerLink = authLinks.querySelector("a[href='auth/register.html']");
const logoutLink = authLinks.querySelector("a#logout");
const cartLink = document.getElementById("cart-url");

if (localStorage.getItem("jwt")) {
    loginLink.style.display = "none";
    registerLink.style.display = "none";
    logoutLink.style.display = "block";
} else {
    loginLink.style.display = "block";
    registerLink.style.display = "block";
    logoutLink.style.display = "none";
    cartLink.setAttribute("href", "auth/login.html");
}

// Logout
logoutLink.addEventListener("click", function () {
    localStorage.removeItem("jwt");
    window.location.href = "../auth/login.html";
});

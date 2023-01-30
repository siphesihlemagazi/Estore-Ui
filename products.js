const apiUrl = 'http://127.0.0.1:8000/api/dev'

fetch(`${apiUrl}/catalogue/products/`)
    .then(response => response.json())
    .then(data => {
        const products = document.querySelector("#products");
        data.forEach(item => {
            console.log(item)
            const product = document.createElement('div')
            product.setAttribute('class', 'col-md-3 mb-3')
            product.innerHTML = `
                            <a href="product-details.html?product=${item.id}" class="card p-3 text-decoration-none text-dark">
                                <div class="text-center">
                                    <img src="${item.images[0].file}" width="200" height="200" alt="${item.name}">
                                </div>
                                <h5 class="text-uppercase">${item.name}</h5>
                                <p class="small">This is the amazing clothing category by ecommerce.</p>
                                <h4>R${item.regular_price}</h4>
                            </a>
                            `
            products.appendChild(product)

        });
    })
    .catch(error => {
        console.error('Error:', error);
    });

setTimeout(() => {
    const productAddToCart = document.querySelectorAll(".product");

    function addToCart(products, size) {
        const data = {
            products: products,
            size: size
        };
        const jwt = localStorage.getItem("jwt");
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": `Token ${jwt}`
        });
        console.log(data);
        fetch(`${apiUrl}/cart/items/`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log("Success:", data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    for (let i = 0; i < productAddToCart.length; i++) {
        productAddToCart[i].addEventListener("click", function () {
            alert(this.value);
            addToCart(this.value, 8);
        });
    }

}, 1000)


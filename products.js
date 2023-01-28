const apiUrl = 'http://127.0.0.1:8000/api/dev'

fetch(`${apiUrl}/catalogue/products/`)
    .then(response => response.json())
    .then(data => {
        const products = document.querySelector("#products");
        data.forEach(item => {
            console.log(item)
            const product = document.createElement('div')
            product.setAttribute('class', 'col-md-3')
            product.innerHTML = `
                            <div class="card p-3">
                                <img src="${item.images[0].file}" alt="${item.name}">
                                <h4>${item.name}</h4>
                                <p class="small">This is the amazing clothing category by ecommerce.</p>
                                <h4>R${item.regular_price}</h4>
                                <button type="button" value="${item.id}" class="btn btn-outline-dark mt-3 product">
                                Add to cart</button>
                            </div>
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


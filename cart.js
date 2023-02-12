if (!localStorage.getItem('jwt')) {
    window.location.href = './auth/login.html';
}

const apiUrl = 'http://127.0.0.1:8000/api/dev'
const jwt = localStorage.getItem("jwt");
const headers = new Headers({
    "Authorization": `Token ${jwt}`
});

fetch(`${apiUrl}/cart/items/`, {
    method: "GET",
    headers: headers
})
    .then(response => response.json())
    .then(data => {
        const cart = document.querySelector("#cart");
        if (data[0] && data[0].products) {
            data[0].products.forEach(item => {
                console.log(item);
                const cartItem = document.createElement("div");
                cartItem.setAttribute("class", "card rounded-3 mb-4");
                cartItem.innerHTML = `
                <div class="card-body p-4">
                    <div class="row d-flex justify-content-between align-items-center">
                        <div class="col-md-2 col-lg-2 col-xl-2 text-center">
                            <img src="http://127.0.0.1:8000${item.product.images[0].file}" class="img-fluid rounded-3"
                                alt="${item.product.name}">
                        </div>
                        <div class="col-md-3 col-lg-3 col-xl-3">
                            <p class="lead fw-normal mb-2">
                                <a href="product-details.html?product=${item.product.id}" class="text-decoration-none text-dark">
                                    ${item.product.name}
                                </a>
                            </p>
                            <p><span class="text-muted">Size: </span>${item.size} <br><span class="text-muted">Color:
                                </span>${getCartItemColor(item.product.specifications)}</p>
                        </div>
                        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                            <button class="btn btn-link px-2"
                            onclick="deleteCartItemOrDecrementQty(${item.product.id}, '${item.size}', this)">
                                <i class="bi bi-dash"></i>
                            </button>
            
                            <input min="0" name="quantity" value="${item.quantity}" type="number"
                                class="form-control form-control-sm" />
            
                            <button class="btn btn-link px-2" 
                            onclick="incrementQty(${item.product.id}, '${item.size}', this)">
                                <i class="bi bi-plus"></i>
                            </button>
                        </div>
                        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h5 class="mb-0" id="item-price ${item.product.id} ${item.size}">R${item.price}</h5>
                        </div>
                        <div class="col-md-1 col-lg-1 col-xl-1 text-end" 
                        onclick="deleteCartItemOrDecrementQty(${item.product.id}, '${item.size}', this, 'delete')">
                            <a href="#!" class="text-danger"><i class="bi bi-trash"></i></a>
                        </div>
                    </div>
                </div>`;
                cart.appendChild(cartItem);
            });
        } else {
            cart.innerHTML = "<h3 class='fw-normal mb-0 text-black'>Your shopping cart is empty</h3>"
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });



// Utility function
function getCartItemColor(specifications) {
    for (let i = 0; i < specifications.length; i++) {
        if (specifications[i].specification.toLowerCase() == 'color') {
            return specifications[i].value
        }
    }
}

function incrementQty(itemId, itemSize, itemBtn) {
    const jwt = localStorage.getItem("jwt");
    const products = itemId;

    if (!itemSize) {
        alert("Please select a size");
        return;
    }
    if (!jwt) {
        alert("Login to add this product to cart!");
        return;
    }

    fetch(`${apiUrl}/cart/items/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify({
            products,
            size: itemSize,
        })
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(data => {
            const product = data.products.find(obj => obj.product.id === itemId && obj.size === itemSize)
            document.getElementById(`item-price ${itemId} ${itemSize}`).innerHTML = `R${product.price}`
            itemBtn.parentNode.querySelector('input[type=number]').value = product.quantity;
            alert("Cart product quantity incremented");
        })
        .catch(error => {
            console.error(error);
            alert("Failed to increment cart product quantity");
        });
}

function deleteCartItemOrDecrementQty(itemId, itemSize, itemBtn, action = undefined) {
    const jwt = localStorage.getItem("jwt");
    const products = itemId;

    if (!itemSize) {
        alert("Please select a size");
        return;
    }
    if (!jwt) {
        alert("Login to add this product to cart!");
        return;
    }

    let endpoint = `${apiUrl}/cart/items/`;
    let method = "DELETE";
    let body = JSON.stringify({
        products,
        size: itemSize,
    });

    if (action === 'delete') {
        body = JSON.stringify({
            products,
            size: itemSize,
            delete: 'delete'
        });
    }

    fetch(endpoint, {
        method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
        body
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(data => {
            let product = data.products.find(obj => obj.product.id === itemId && obj.size === itemSize)
            console.log(data.products.length)
            if (data.products.length > 0) {
                if (product) {
                    document.getElementById(`item-price ${itemId} ${itemSize}`).innerHTML = `R${product.price}`
                    itemBtn.parentNode.querySelector('input[type=number]').value = product.quantity;
                    alert("Cart product quantity decremented");
                } else {
                    location.reload(); // maybe refetch cart
                }
            } else {
                cart.innerHTML = "<h3 class='fw-normal mb-0 text-black'>Your shopping cart is empty</h3>"
            }
        })
        .catch(error => {
            console.error(error);
            alert("Failed to decrement/delete cart product quantity");
        });
}

const apiUrl = 'http://127.0.0.1:8000/api/dev'

let payload = {
    customer: 1
};

let queryString = Object.keys(payload).map(key => key + '=' + payload[key]).join('&');

let url = `${apiUrl}/cart/items/?${queryString}`;
console.log(url)
fetch(url)
    .then(response => response.json())
    .then(data => {
        const cart = document.querySelector("#cart");
        data[0].products.forEach(item => {

            console.log(item)

            const cartItem = document.createElement('div');
            cartItem.setAttribute('class', 'card rounded-3 mb-4')
            cartItem.innerHTML = `
                                <div class="card-body p-4">
                                    <div class="row d-flex justify-content-between align-items-center">
                                        <div class="col-md-2 col-lg-2 col-xl-2 text-center">
                                            <img src="http://127.0.0.1:8000${item.product.images[0].file}"
                                                class="img-fluid rounded-3" alt="${item.product.name}">
                                        </div>
                                        <div class="col-md-3 col-lg-3 col-xl-3">
                                            <p class="lead fw-normal mb-2">${item.product.name}</p>
                                            <p><span class="text-muted">Size: </span>${item.size} <br><span class="text-muted">Color:
                                                </span>${getCartItemColor(item.product.specifications)}</p>
                                        </div>
                                        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                            <button class="btn btn-link px-2"
                                                onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                                                <i class="bi bi-dash"></i>
                                            </button>

                                            <input id="form1" min="0" name="quantity" value="${item.quantity}" type="number"
                                                class="form-control form-control-sm" />

                                            <button class="btn btn-link px-2"
                                                onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                                                <i class="bi bi-plus"></i>
                                            </button>
                                        </div>
                                        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                            <h5 class="mb-0">R${item.price}</h5>
                                        </div>
                                        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                            <a href="#!" class="text-danger"><i class="bi bi-trash"></i></a>
                                        </div>
                                    </div>
                                </div>
                                `
            cart.appendChild(cartItem)

        });
    })
    .catch(error => {
        console.error('Error:', error);
    });


// Utility function
function getCartItemColor(specifications){
    for (let i = 0; i < specifications.length; i++) {
        if(specifications[i].specification.toLowerCase() == 'color'){
            return specifications[i].value
        }
    }
}

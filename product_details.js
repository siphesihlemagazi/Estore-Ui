const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('product');

const apiUrl = 'http://127.0.0.1:8000/api/dev'

fetch(`${apiUrl}/catalogue/product/${productId}/`)
    .then(response => response.json())
    .then(data => {
        const product = document.getElementById('product');
        console.log(data)
        product.innerHTML = `
            <div class="col-md-6" id="product-images">
            </div>
            <div class="col-md-6">
                <div class="bg-light p-4">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center"> <i class="bi bi-arrow-left"></i>
                            <span class="ms-1">Back</span>
                        </div> <i class="bi bi-cart text-muted"></i>
                    </div>
                    <div class="mt-4 mb-3"> <span class="text-uppercase text-muted brand">Orianz</span>
                        <h5 class="text-uppercase">${data.name}</h5>
                        <div class="price d-flex flex-row align-items-center"> <span
                                class="act-price">$20</span>
                            <div class="ms-2"> <small class="dis-price">$59</small> <span>40% OFF</span>
                            </div>
                        </div>
                    </div>
                    <p class="about">${data.description}</p>
                    <div class="sizes mt-5">
                    </div>
                    <div class="cart mt-4 align-items-center"> <button
                            class="btn btn-danger text-uppercase mr-2 px-4" id="cart-btn">Add to cart</button> <i
                            class="bi bi-heart-fill text-muted"></i> <i
                            class="bi bi-share-fill text-muted"></i>
                    </div>
                </div>
            </div>`
        displayProductImages(data.images);
        generateSizeHTML(data.size);
        addToCart(data.id);
    })
    .catch(error => {
        console.error('Error:', error);
    });


function displayProductImages(products) {
    var productImagesContainer = document.getElementById("product-images");

    var mainImage = document.createElement("img");
    mainImage.id = "main-image";
    mainImage.width = 250;
    mainImage.height = 250;
    mainImage.src = products[0].file;
    var mainImageContainer = document.createElement("div");
    mainImageContainer.className = "text-center p-4";
    mainImageContainer.appendChild(mainImage);

    var thumbnailContainer = document.createElement("div");
    thumbnailContainer.className = "thumbnail text-center";
    for (var i = 0; i < products.length; i++) {
        var thumbnailImage = document.createElement("img");
        thumbnailImage.width = 70;
        thumbnailImage.className = "m-2"
        thumbnailImage.src = products[i].file;
        thumbnailImage.onclick = function () {
            mainImage.src = this.src;
        };
        thumbnailContainer.appendChild(thumbnailImage);
    }
    productImagesContainer.appendChild(mainImageContainer);
    productImagesContainer.appendChild(thumbnailContainer);
}

function addToCart(productId) {
    const addToCartBtn = document.getElementById("cart-btn");
    if (!addToCartBtn) return;

    const sizeInputs = document.querySelectorAll('input[name="size"]');
    let selectedSize;

    sizeInputs.forEach(input => {
        input.addEventListener("change", event => {
            selectedSize = event.target.value;
        });
    });

    addToCartBtn.addEventListener("click", event => {
        const jwt = localStorage.getItem("jwt");
        const products = productId;

        if (!selectedSize) {
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
                size: selectedSize,
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                alert("Product added to cart");
            })
            .catch(error => {
                console.error(error);
                alert("Failed to add product to cart");
            });
    });
}

function generateSizeHTML(array) {
    array.sort((a, b) => a.size - b.size);
    let html = `<h6 class="text-uppercase">Size</h6>`;
    array.forEach(size => {
        html += `<label class="radio me-1">
                    <input type="radio" name="size" value="${size.size}" ${size.checked ? 'checked' : ''}>
                    <span>${size.size}</span>
                </label>`;
    });
    document.querySelector('.sizes.mt-5').innerHTML = html;
}

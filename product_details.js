const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('product');

const apiUrl = 'http://127.0.0.1:8000/api/dev'

fetch(`${apiUrl}/catalogue/product/${productId}/`)
    .then(response => response.json())
    .then(data => {
        const product = document.getElementById('product');
        console.log(data.images, product)
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
                        <h5 class="text-uppercase">Men's slim fit t-shirt</h5>
                        <div class="price d-flex flex-row align-items-center"> <span
                                class="act-price">$20</span>
                            <div class="ms-2"> <small class="dis-price">$59</small> <span>40% OFF</span>
                            </div>
                        </div>
                    </div>
                    <p class="about">Shop from a wide range of t-shirt from orianz. Pefect for your
                        everyday
                        use, you could pair it with a stylish pair of jeans or trousers complete the
                        look.
                    </p>
                    <div class="sizes mt-5">
                        <h6 class="text-uppercase">Size</h6> <label class="radio"> <input type="radio"
                                name="size" value="S" checked> <span>S</span> </label> <label
                            class="radio">
                            <input type="radio" name="size" value="M"> <span>M</span> </label> <label
                            class="radio"> <input type="radio" name="size" value="L"> <span>L</span>
                        </label> <label class="radio"> <input type="radio" name="size" value="XL">
                            <span>XL</span> </label> <label class="radio"> <input type="radio"
                                name="size" value="XXL"> <span>XXL</span> </label>
                    </div>
                    <div class="cart mt-4 align-items-center"> <button
                            class="btn btn-danger text-uppercase mr-2 px-4">Add to cart</button> <i
                            class="bi bi-heart-fill text-muted"></i> <i
                            class="bi bi-share-fill text-muted"></i>
                    </div>
                </div>
            </div>`
        displayProductImages(data.images);
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
      thumbnailImage.onclick = function() {
        mainImage.src = this.src;
      };
      thumbnailContainer.appendChild(thumbnailImage);
    }
    productImagesContainer.appendChild(mainImageContainer);
    productImagesContainer.appendChild(thumbnailContainer);
  }
  
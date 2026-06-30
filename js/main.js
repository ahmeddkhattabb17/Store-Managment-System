var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productImg = document.getElementById("productImg");
var search = document.getElementById("search");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var productList = localStorage.getItem("productsArray") || [];
var updateIndex;

// initializing storage
if (localStorage.getItem("productsArray") != null) {
  productList = JSON.parse(localStorage.getItem("productsArray"));
  displayProducts(productList);
}
// add product
function addProduct() {
  var product = {
    name: productName.value,
    price: productPrice.value,
    description: productDescription.value,
    category: productCategory.value,
    image: `./Images/${productImg.files.length > 0 ? productImg.files[0].name : "no-image.jpg"}`,
  };
  productList.push(product);
  localStorage.setItem("productsArray", JSON.stringify(productList));
  displayProducts(productList);
  clear();
}
// displaying product
function displayProducts(Arrays) {
  var box = "";
  for (var i = 0; i < Arrays.length; i++) {
    var originalIndex = productList.indexOf(Arrays[i]);
    box += `<div class="col-lg-4">
    <div class="card m-2 products-card">
    <img src="${Arrays[i].image}" class="card-img-top" alt="${Arrays[originalIndex].name}">
    <div class="card-body">
    <h5 class="card-title fs-3 fw-bold text-primary">${Arrays[originalIndex].name.split(" ").slice(0, 4).join(" ")}</h5>
    <p class="card-text m-0 fs-4 fw-semibold">${Arrays[originalIndex].price}</p>
    <div class="fw-2 d-flex align-items-center justify-content-between">
    <p class="card-text m-0 fs-5 fw-normal">${Arrays[originalIndex].description.split(" ").slice(0, 5).join(" ")}</p>
    <div class="d-flex">
    <button onclick="deleteProducts(${i})" class="btn btn-outline-danger rounded-end-0"><i class="fas fa-trash"></i></button>
    <button onclick="getProducts(${i})"class="btn btn-outline-warning rounded-0"><i class="fas fa-edit"></i></button>
    <button onclick="addCart(${i})"class="btn btn-outline-primary rounded-start-0"><i class="fa-solid fa-cart-plus"></i></button>
    </div>
      </div>
        </div>
          </div>
            </div>`;
  }
  document.getElementById("Products").innerHTML = box;
}
displayProducts(productList);

// clearing inputs
function clear() {
  productName.value = null;
  productPrice.value = null;
  productCategory.value = null;
  productDescription.value = null;
  search.value = null;
  productImg.value = null;
}
// deleting product
function deleteProducts(index) {
  productList.splice(index, 1);
  displayProducts(productList);
  localStorage.setItem("productsArray", JSON.stringify(productList));
}

function searchProductsByName() {
  var searchArray = [];
  for (var i = 0; i < productList.length; i++)
    if (
      productList[i].name
        .toLowerCase()
        .trim()
        .includes(search.value.toLowerCase().trim()) == true
    ) {
      searchArray.push(productList[i]);
    }
displayProducts(searchArray);
}
// getting product details
function getProducts(index) {
  window.scrollTo(0, 0);
  updateIndex = index;
  productName.value = productList[index].name;
  productPrice.value = productList[index].price;
  productCategory.value = productList[index].category;
  productDescription.value = productList[index].description;
  updateBtn.classList.remove("d-none");
  addBtn.classList.add("d-none");
}
// updating product again
function updateProducts() {
  productList[updateIndex].name = productName.value;
  productList[updateIndex].price = productPrice.value;
  productList[updateIndex].category = productCategory.value;
  productList[updateIndex].description = productDescription.value;
  productList[updateIndex].image =
    productImg.files.length > 0
      ? `./Images/${productImg.files[0].name}`
      : productList[updateIndex].image;
  updateBtn.classList.add("d-none");
  addBtn.classList.remove("d-none");
  displayProducts(productList);
  localStorage.setItem("productsArray", JSON.stringify(productList));
  clear();
}

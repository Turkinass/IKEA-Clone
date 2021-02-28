function addToCartbtn() {
  var addToCartBtn = document.getElementsByClassName("addToCart");
  for (i = 0; i < addToCartBtn.length; i++) {
    var button = addToCartBtn[i];
    button.addEventListener("click", addToCart);
  }
}
function addToCart(event) {
  var button = event.target;
  var data = button.parentElement;
  var inCart = 0;
  var name = data.getElementsByClassName("elementName")[0].innerText;
  var price = parseFloat(
    data.getElementsByClassName("elementPrice")[0].innerText.replace("SR", "")
  );
  var des = data.getElementsByClassName("elementDes")[0].innerText;
  var image = button.parentElement.parentElement.getElementsByClassName(
    "elementImg"
  )[0].src;
  let product = {
    name: name,
    price: price,
    des: des,
    image: image,
    inCart: 0,
  };

  total(product);
  setItems(product);
}

function addToWishlistbtn() {
  var addToCartBtn = document.getElementsByClassName("addToWishlist");
  for (i = 0; i < addToCartBtn.length; i++) {
    var button = addToCartBtn[i];
    button.addEventListener("click", addToWishlist);
  }
}

function addToWishlist(event) {
  var button = event.target;
  var section = button.parentElement.parentElement;
  var data = section.getElementsByClassName("data");
  var image = section.getElementsByClassName("elementImg")[0].src;
  var name = section.getElementsByClassName("elementName")[0].innerText;
  var price = parseFloat(
    section
      .getElementsByClassName("elementPrice")[0]
      .innerText.replace("SR", "")
  );
  var des = section.getElementsByClassName("elementDes")[0].innerText;

  console.log(image);
  let product = {
    name: name,
    price: price,
    des: des,
    image: image,
  };

  setWishlist(product);
}
function addToCart(event) {
  var button = event.target;
  var data = button.parentElement;
  var inCart = 0;
  var name = data.getElementsByClassName("elementName")[0].innerText;
  var price = parseFloat(
    data.getElementsByClassName("elementPrice")[0].innerText.replace("SR", "")
  );
  var des = data.getElementsByClassName("elementDes")[0].innerText;
  var image = button.parentElement.parentElement.getElementsByClassName(
    "elementImg"
  )[0].src;
  let product = {
    name: name,
    price: price,
    des: des,
    image: image,
    inCart: 0,
  };

  total(product);
  setItems(product);
}
function setWishlist(product) {
  let wishlistItems = localStorage.getItem("productsInWishlist");
  wishlistItems = JSON.parse(wishlistItems);

  if (wishlistItems != null) {
    if (wishlistItems[product.name] == undefined) {
      wishlistItems = {
        ...wishlistItems,
        [product.name]: product,
      };
    }
    wishlistItems[product.name].inCart += 1;
  } else {
    product.inCart = 1;
    wishlistItems = {
      [product.name]: product,
    };
  }

  localStorage.setItem("productsInWishlist", JSON.stringify(wishlistItems));
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.name] == undefined) {
      cartItems = {
        ...cartItems,
        [product.name]: product,
      };
    }
    cartItems[product.name].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.name]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function displayWishlist() {
  let wishlistItems = localStorage.getItem("productsInWishlist");
  wishlistItems = JSON.parse(wishlistItems);

  let productConainer = document.querySelector(".wishlistCont");

  if (wishlistItems && productConainer) {
    productConainer.innerHTML = "";

    Object.values(wishlistItems).map((item) => {
      productConainer.innerHTML += `   
            
     <div  class="cotainer-element mt-5 ">
         <table class="table table-sm">
              <tr">
                <td>
             
             <div class="q1">
                <a href="#"> <img  class="ItemsImg text-center" src="${item.image}" alt="whiteTable"></a>
       
                
                
             </div>
             <div class="data">
               
                 <h4><a href="#" class="types t1" id="prductName">${item.name}</a></h4>
                 <p id="elementDes">${item.des}</p>
                 <h3 id="elementPrice">${item.price} SR</h3>
       
       
                
                
                
             </div>
             
             
            </td> 
           </tr>

            
`;
    });

    productConainer.innerHTML += `

        <button type="button " class="btn btn-danger m-3 "onclick="deleteItemWishlist()">empty the wishlist</button>
        `;
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let cartCost = localStorage.getItem("total");

  let productConainer = document.querySelector(".cartCont");

  if (cartItems && productConainer) {
    productConainer.innerHTML = "";

    Object.values(cartItems).map((item) => {
      productConainer.innerHTML += `   
            
     <div  class="cotainer-element mt-5 ">
         <table class="table table-sm">
              <tr">
                <td>
             
             <div class="q1">
                <a href="#"> <img  class="ItemsImg text-center" src="${
                  item.image
                }" alt="whiteTable"></a>
       
                
                
             </div>
             <div class="data">
               
                 <h4><a href="#" class="types t1" id="prductName">${
                   item.name
                 }</a></h4>
                 <p id="elementDes">${item.des}</p>
                 <h3 id="elementPrice">${item.price * item.inCart} SR</h3>
       
       
                 <select id="mySelect" class="form-select" aria-label="Default select example" onchange="changeQ()">
                   <option value="1">1</option>
                   <option value="2">2</option>
                   <option value="3">3</option>
                   <option value="4">4</option>
                   <option value="5">5</option>
                   <option value="5" selected>${item.inCart}</option>
                   
                 </select>
                
                
             </div>
             
             
            </td> 
           </tr>

            
`;
    });

    productConainer.innerHTML += `
        <div>
        <h5>the total </h5>
        <h6>${cartCost} SR</h6>
        </div>
        <button type="button " class="btn btn-danger m-3 "onclick="deleteItem()">empty the cart</button>
        `;
  }
}

function total(product) {
  let cartCost = localStorage.getItem("total");

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("total", cartCost + product.price);
  } else {
    localStorage.setItem("total", product.price);
  }
}
function changeQ() {
  var x = document.getElementById("mySelect").value;
}

function deleteItem() {
  localStorage.removeItem("productsInCart");
  localStorage.removeItem("total");
  location.reload();
}
function deleteItemWishlist() {
  localStorage.removeItem("productsInWishlist");
  location.reload();
}
displayCart();
displayWishlist();

class Product {
  //ถ้าประกาศแค่นี้มันจะไม่สามารถใส่ค่าเข้าไปแบบด้านล่างได้ มันต้องใช้ This ด้วย
  // title = "DEFAULT";
  // imageUrl;
  // description;
  // price;

  //การประกาศ method ให้ใช้แค่ someName() {} แค่นี้พอ

  //special method => constructor

  constructor(title, image, description, price) {
    //ค่าในนี้มันจะไป Override class field ด้านบน เพราะฉะนั้นด้านบนไม่จำเป็นต้องประกาศก็ได้
    this.title = title;
    this.imageUrl = image;
    this.description = description;
    this.price = price;
  }
}

class ShoppingCart {
  items = [];

  render() {
    const cartEl = document.createElement('section')
    cartEl.innerHTML = `
      <h2>Total: \s${0}</h2>
      <button>Order Now</button>
    `
    cartEl.className = "cart";
    return cartEl;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    console.log('Adding product to cart.')
    console.log(this.product)
  }

  render() {
    const prodEl = document.createElement("li");
      prodEl.className = "product-item";
      prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}" >
          <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
      const addCartButton = prodEl.querySelector("button");
      //เวลาใช้ addEventListener แล้วเรียกฟังก์ชั่น this ในฟังก์ชั่นนั้นมันจะเป็น this ของฟังก์ชั่นนั้น เราจึงต้อง bind this ซึ่งเป็นของ class เริ่มต้นเข้าไปด้วยจะได้ส่งค่าเข้าได้ใน ฟังก์ชั่น addToCart ได้ 
      addCartButton.addEventListener("click", this.addToCart.bind(this));
      return prodEl;
  }


}

class ProductList {
  products = [
    new Product(
      "A Pillow",
      "https://www.maxpixel.net/static/photo/2x/Soft-Pillow-Green-Decoration-Deco-Snuggle-1241878.jpg",
      "A soft pillow!",
      19.99
    ),
    new Product(
      "A Carpet",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ardabil_Carpet.jpg/397px-Ardabil_Carpet.jpg",
      "A carpet which you might like - or not.",
      89.99
    ),
  ];

  constructor() {}

  render() {
    
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render()
      prodList.append(prodEl);
    }
    return prodList;
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById("app");
    const cart = new ShoppingCart();
    const cartEl = cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();

    renderHook.append(cartEl);
    renderHook.append(prodListEl);
  }
}

const shop = new Shop();
shop.render();



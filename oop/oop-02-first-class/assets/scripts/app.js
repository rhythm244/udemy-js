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

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId) {
    this.hookId = renderHookId;
  }
  createRootElement(tag, cssClasses, attibutes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if ( attibutes && attibutes.length > 0 ) {
      for ( const attr of attibutes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `
      <h2>Total: \s${this.totalAmout.toFixed(2)}</h2>
    `
  }

  get totalAmout() {
    const sum = this.items.reduce((prevValue, curItem) => {
      return prevValue + curItem.price;
    }, 0);
    return sum;
  }

  constructor(renderHookId) {
    super(renderHookId); //ต้องเรียกเมื่อใช้ subclass
  }

  addProduct(product) {
    const updateItem = [...this.items];
    updateItem.push(product);
    this.cartItems = updateItem; //เป็นการเรียก setter

  }

  render() {
    // const cartEl = document.createElement('section')
    //inhertance
    const cartEl = this.createRootElement('section', 'cart')
    cartEl.innerHTML = `
      <h2>Total: \s${0}</h2>
      <button>Order Now</button>
    `
    this.totalOutput = cartEl.querySelector("h2");
  }
}

class ProductItem extends Component{
  constructor(product, renderHookId) {
    super(renderHookId);
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement("li", 'product-item');
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
  }


}

class ProductList extends Component {
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

  constructor(renderHookId) {
    super(renderHookId);
  }

  render() {
    
    this.createRootElement("ul", "product-list", [
      new ElementAttribute("id", "prod-list")
    ]);
    for (const prod of this.products) {
      const productItem = new ProductItem(prod, 'prod-list');
      productItem.render()
    }
  }
}

class Shop {
  render() {
    this.cart = new ShoppingCart('app');
    this.cart.render();
    const productList = new ProductList('app');
    productList.render();

  }
}

class App {
  static cart;
  
  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }
  //ตรงนี้แม่งโคตรงง
  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();


const mainPage = {
  mainPageHeader: "#main-page-header",
  addingToCartButton: (name) =>
    `//li[@class="adding-button" and normalize-space(text())="${name}"]//button`,
  cartItem: (name) =>
    `//ul[@id="cart-items"]//li[@class="cart-item"]/p[@class="cart-item-text" and normalize-space(text())="${name}"]`,
  cartItemQuantity: (name) =>
    `//ul[@id="cart-items"]/li[@class="cart-item"][p[@class="cart-item-text" and normalize-space(text())="${name}"]]/span[@class="cart-item-quantity"]`,
};

export default mainPage;

const mainPage = {
  mainPageHeader: "#main-page-header",

  addToCartButton: (name) => `li[data-testid="menu-item-${name}"] button`,
  menuItemName: (name) =>
    `li[data-testid="menu-item-${name}"] p.menu-item-text`,
  cartItemName: (name) =>
    `li[data-testid="cart-item-${name}"] p.cart-item-text`,
  cartItemQuantity: (name) =>
    `li[data-testid="cart-item-${name}"] span.cart-item-quantity`,
  increaseQuantityButton: (name) =>
    `li[data-testid="cart-item-${name}"] button.increase-button`,
  reduceQuantityButton: (name) =>
    `li[data-testid="cart-item-${name}"] button.reduce-button`,
  cartItemPrice: (name) =>
    `li[data-testid="cart-item-${name}"] p.cart-item-price`,
  clearCartButton: "#clear-cart-btn",
  cartTotalPrice: "#cart-total",
  emptyCartLabel: "#empty-cart-label",
};

export default mainPage;

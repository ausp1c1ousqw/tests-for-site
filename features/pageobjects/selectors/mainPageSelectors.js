const mainPage = {
  mainPageHeader: "#main-page-header",
  addingToCartButton: (name) => `li[data-testid="menu-item-${name}"] button`,
  cartItem: (name) => `li[data-testid="cart-item-${name}"] p`,
  cartItemQuantity: (name) => `li[data-testid="cart-item-${name}"] span`,
};

export default mainPage;

describe('Shopping Cart Functionality', () => {
  beforeEach(() => {
    // 访问你的应用
    cy.visit('http://localhost:3000');
  });

  it('loads the product list', () => {
    // 检查是否加载了产品列表
    cy.get('.product-list').should('exist');
  });

  it('can add a product to the cart', () => {
    // 假设有一个添加到购物车的按钮，并且它的类名是`.add-to-cart`
    cy.get('.add-to-cart').first().click();

    // 打开购物车
    cy.get('.cart-icon').click();

    // 检查购物车中是否有产品
    cy.get('.cart-item').should('have.length.at.least', 1);
  });

  it('can remove a product from the cart', () => {
    // 添加一个产品到购物车
    cy.get('.add-to-cart').first().click();

    // 打开购物车
    cy.get('.cart-icon').click();

    // 移除购物车中的产品
    cy.get('.remove-from-cart').first().click();

    // 检查购物车是否为空
    cy.get('.cart-item').should('not.exist');
  });

  it('updates the quantity of a product in the cart', () => {
    // 添加一个产品到购物车
    cy.get('.add-to-cart').first().click();

    // 打开购物车
    cy.get('.cart-icon').click();

    // 增加产品数量
    cy.get('.increment-quantity').first().click();

    // 检查数量是否更新
    cy.get('.quantity').first().should('contain', '2');
  });

  it('can proceed to checkout', () => {
    // 添加一个产品到购物车
    cy.get('.add-to-cart').first().click();

    // 打开购物车
    cy.get('.cart-icon').click();

    // 点击结账按钮
    cy.get('.checkout-button').click();

    // 检查是否跳转到了结账页面
    cy.url().should('include', '/checkout');
  });
});

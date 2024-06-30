describe('Shopping Cart Functionality', () => {
  beforeEach(() => {
    // 访问你的应用
    cy.visit('http://localhost:3000');
  });

  it('loads the product list', () => {
    // 检查是否加载了产品列表
    cy.get("[data-testid='product-item']").should('have.length.at.least', 16);
  });

  it('can filter products by size', () => {
    // 勾选 XS 尺寸的复选框
    cy.get('.checkmark').contains('XS').click();

    // 检查筛选结果
    cy.get('[data-testid="product-item"]').each(($el) => {
      cy.wrap($el).find('[data-testid="size"]').should('contain', 'XS');
    });
  });

  it('can sort products by price in ascending order', () => {
    cy.get('[data-testid="price-asc"]').click();
    let lastPrice = 0;
    cy.get('[data-testid="product-item"]').each(($el) => {
      cy.wrap($el)
        .find('[data-testid="product-price"]')
        .invoke('text')
        .then((priceText) => {
          const price = parseFloat(priceText.replace('$', ''));
          expect(price).to.be.at.least(lastPrice);
          lastPrice = price;
        });
    });
  });

  it('can sort products by price in descending order', () => {
    cy.get('[data-testid="price-desc"]').click();
    let lastPrice = Infinity;
    cy.get('[data-testid="product-item"]').each(($el) => {
      cy.wrap($el)
        .find('[data-testid="product-price"]')
        .invoke('text')
        .then((priceText) => {
          const price = parseFloat(priceText.replace('$', ''));
          expect(price).to.be.at.most(lastPrice);
          lastPrice = price;
        });
    });
  });

  it('shows an error message if size is not selected', () => {
    cy.get('[data-testid="add-to-cart"]').first().click();

    cy.get('.message').then(($el) => {
      expect($el.text()).to.include('请选择尺寸');
    });
  });

  it('can add a product to the cart', () => {
    // 选尺寸
    cy.get('[data-testid="size"]').first().select('L');

    // 打开购物车
    cy.get("[data-testid='add-to-cart']").first().click();

    // 检查购物车中是否有产品
    cy.get("[data-testid='cart-item']").should('have.length.at.least', 1);
  });

  it('can remove a product from the cart', () => {
    // 选尺寸
    cy.get("[data-testid='size']").first().select('L');

    // 打开购物车
    cy.get("[data-testid='add-to-cart']").first().click();

    // 移除购物车中的产品
    cy.get("[data-testid='remove-from-cart']").first().click();

    // 检查购物车是否为空
    cy.get("[data-testid='cart-item']").should('not.exist');
  });
  it('updates the quantity of a product in the cart', () => {
    // 选尺寸
    cy.get("[data-testid='size']").first().select('L');

    // 打开购物车
    cy.get("[data-testid='add-to-cart']").first().click();

    // 增加产品数量
    cy.get("[data-testid='increment-quantity']").first().click();

    // 检查数量是否更新
    cy.get("[data-testid='shop-desc']").first().should('contain', '2');
  });
  it('shows correct total quantity and price in the cart', () => {
    // 选择第一个产品的尺寸并添加到购物车
    cy.get('[data-testid="size"]').first().select('L');
    cy.get('[data-testid="product-item"]')
      .first()
      .find('[data-testid="product-price"]')
      .invoke('text')
      .then((priceText1) => {
        const price1 = parseFloat(priceText1.replace('$', ''));
        cy.get('[data-testid="add-to-cart"]').first().click();

        // 选择第二个产品的尺寸并添加到购物车
        cy.get('[data-testid="size"]').eq(1).select('L');
        cy.get('[data-testid="product-item"]')
          .eq(1)
          .find('[data-testid="product-price"]')
          .invoke('text')
          .then((priceText2) => {
            const price2 = parseFloat(priceText2.replace('$', ''));
            cy.get('[data-testid="add-to-cart"]').eq(1).click({ force: true });

            // 检查购物车中产品的总数量
            cy.get("[data-testid='cart-item']").should('have.length', 2);

            // 检查购物车中产品的总价格
            const expectedTotalPrice = price1 + price2;
            cy.get('[data-testid="cart-total-price"]')
              .invoke('text')
              .then((totalPriceText) => {
                const totalPrice = parseFloat(totalPriceText.replace('$', ''));
                expect(totalPrice).to.equal(expectedTotalPrice);
              });
          });
      });
  });
  it('can proceed to checkout', () => {
    // 选尺寸
    cy.get("[data-testid='size']").first().select('L');

    // 打开购物车
    cy.get("[data-testid='add-to-cart']").first().click();

    // 点击结账按钮
    cy.get("[data-testid='checkout-button']").first().click();

    // 检查是否捕获结算成功文本
    cy.get('.message').then(($el) => {
      expect($el.text()).to.include('总计');
    });
  });
});

const { Given, When, Then } = require('@cucumber/cucumber');
const checkoutPage = require('../page-objects/checkout.page');

const Helpers = require('../support/helper');
const data = require('../data.json');

const chai = require('chai');
const { expect } = chai;
chai.use(require('chai-sorted'));

Given('I am logged in as {string}', (user) => {
  Helpers.login(user);
});

Given('I am on the {} page', (page) => {
  const paths = {
    'login': '/',
    'Products': '/inventory.html',
    'Shopping Cart': '/cart.html',
    'Checkout Overview': '/checkout-step-two.html'
  };
  browser.url(paths[page]);
});

Then('I am directed to my shopping cart page', () => {
  expect(browser.getUrl()).to.have.string('/cart.html');
  expect($('.title').getText()).to.equal('YOUR CART')
});

Then('the cart count shows {}', (amount) => {
  expect($('.shopping_cart_badge').getText()).to.equal(amount);
});

When('I click the shopping cart icon', () => {
  Helpers.waitForBtnEnabledAndClick($('#shopping_cart_container'))
});

When('I select to sort by {} to {} price', (first, last) => {
  $('.product_sort_container').click();
  const sort = first.slice(0, 2) + last.slice(0, 2);
  $(`option[value=${sort}]`).click();
});

When('I enter my information on checkout', () => {
    checkoutPage.fillOutCheckutInformation()
    Helpers.waitForBtnEnabledAndClick(Helpers.getByDataTestId('continue'))
});

Then('I should see items sorted in {} price order', (order) => {
  const prices = [...$$('.inventory_item_price')].map(node => Number(node.getText().slice(1)));
  let descending = (order !== 'ascending') ? true : false;
  expect(prices).to.be.sorted({ descending });
});

  Then('I can confirm I completed my purchase', () => {
    $('#checkout_complete_container').waitForDisplayed(5000);
  });
  
  Then(/^I can see the (\S+)/, (selected) => {
    const paths = {
      'Products': '/inventory.html',
      'Checkout': '/checkout-step-two.html'
    };
  
    const elements = {
      'list': $('.cart_list'),
      'total': $('.summary_total_label')
    };
  
    if (paths[selected]) {
      expect(browser.getUrl()).to.have.string(paths[selected]);
    } else {
      elements[selected].waitForDisplayed(5000);
    }
  });

  When(/^I (.*) (?:.*) item (?:.*) the cart$/, (type) => {
    const button = {
      'add': $('.btn_primary'),
      'remove': $('.btn_secondary'),
    };
    button[type].click();
  });
  
  When('I click the {} button', (type) => {
    const button = {
      'Finish': $('.cart_button'),
      'Checkout': $('.checkout_button')
    };
    button[type].click();
  });
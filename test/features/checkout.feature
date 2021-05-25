
Feature: Checkout product feature

  Scenario: I am logged in and sort items by order
    And I am logged in as 'standardUser'
    Then I can see the Products page
    And I select to sort by lowest to highest price
    Then I should see items sorted in ascending price order

  Scenario: Add the items to cart
    When I add an item to the cart
    And I add another item to the cart
    Then the cart count shows 2

  Scenario: User is directed to cart page
    When I click the shopping cart icon
    Then I am directed to my shopping cart page
    When I remove an item from the cart
    Then the cart count shows 1

  Scenario: User checks out their items and completes order
    When I click the Checkout button
    And I enter my information on checkout
    Then I can see the Checkout Overview page
    When I click the Finish button
    Then I can confirm I completed my purchase
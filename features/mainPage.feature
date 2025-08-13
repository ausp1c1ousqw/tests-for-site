Feature: Add pizza to cart

  Scenario: Add one pizza to the cart
    Given I open the pizza menu page
    When I add "margarita" pizza to the cart
    Then the cart should contain "margarita" with quantity "1"

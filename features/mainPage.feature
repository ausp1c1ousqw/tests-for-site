Feature: Add pizza to cart

  Scenario: Add one pizza to the cart
    Given I open the main page
    When I add to cart "margarita"
    Then I should see "margarita" in the cart with quantity "1"

  Scenario: Add quantity in the cart
    Given I open the main page
    When I add to cart "margarita"
    And I increase quantity of "margarita" by "2"
    Then I should see "margarita" in the cart with quantity "3"

Scenario: Empty cart state
    Given I open the main page
    Then I should see "Your cart is empty"

Scenario: Clearing the cart
    Given I open the main page
    When I add to cart "margarita"
    And I add to cart "full of meat"
    And I clear cart
    Then I should see "Your cart is empty"

Scenario: Total price calculation
    Given I open the main page
    When I add to cart "margarita"
    And I add to cart "full of meat"
    Then Total price should be "22"
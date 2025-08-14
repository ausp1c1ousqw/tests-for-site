Feature: Add pizza to cart

  Scenario Outline: Add one pizza to the cart
    Given I open the pizza menu page
    When I add "<pizzaName>" pizza to the cart
    Then the cart should contain "<pizzaName>" with quantity "<quantity>"

  Examples:
    | pizzaName       | quantity |
    | full of meat    | 1        |
    | peperoni        | 1        |
    | with vegetables | 1        |
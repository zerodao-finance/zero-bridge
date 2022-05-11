Feature: Converting crypto to USD

Scenario: Showing the input amount in USD
    Given I am on either transfer/release modules
    When I enter a positive value
    Then I am presented with the appropriate USD value of the selected token

Scenario: Showing the resulting amount in USD
    Given I am on either transfer/release modules
    When I enter a positive value
    Then I am presented with the appropriate USD resulting amount of the selected token

Scenario: Showing the fee amounts in USD
    Given I am on either transfer/release modules
    When I enter a positive value
    Then I am presented with the appropriate USD fees for executing the transaction
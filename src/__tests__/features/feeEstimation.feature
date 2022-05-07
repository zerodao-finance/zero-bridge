Feature: Estimating fees

Scenario: Transfering funds
    Given I am on the transfer module
    When I enter a positive amount in the input box
    Then the appropriate fees are presented to me

Scenario: Releasing funds
    Given I am on the release module
    When I enter a positive amount in the input box
    And I enter a valid bitcoin address
    Then the appropriate fees are presented to me
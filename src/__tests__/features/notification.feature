Feature: Receiving notifications

Scenario: Using the transfer module
    Given I am on the transfer module
    And I enter a valid input amount
    When I transfer the funds
    Then I receive a notification showing the transaction was executed

Scenario: Using the release module
    Given I am on the release module
    And I enter a valid input amount
    And I enter a valid bitcoin address
    When I release the funds
    Then I receive a notification showing the transaction was executed
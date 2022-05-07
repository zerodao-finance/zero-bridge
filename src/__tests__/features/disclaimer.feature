Feature: Disclaimer

Scenario: Acknowledging the disclaimer
    Given I have never used the bridge
    When I enter the site, the disclaimer appears
    Then I scroll to the bottom and select "Acknowledge"

Scenario: Not ackowledging the disclaimer
    Given I have never used the bridge
    When I enter the site, the disclaimer appears
    Then I do not scroll to the bottom so I cannot view the bridge
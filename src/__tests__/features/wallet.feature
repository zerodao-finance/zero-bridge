Feature: Wallet Connect

Scenario: Connecting your wallet - first visit
    Given I have never used the bridge but have acknowledged the disclaimer
    And I see the connecting wallet loading screen
    When I select my wallet provider
    Then my account connects to the bridge app

Scenario: Connecting your wallet - visited before
    Given I have used the bridge before
    When I try to use the bridge
    Then my account/wallet is connected automatically

Scenario: Connecting your wallet - on wrong chain
    Given I have used the bridge before
    When I try to use the bridge
    And my wallet provider is connected to another chain other than ETH mainnet
    Then I cannot use the bridge until I switch my network to ETH mainnet

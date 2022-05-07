import { defineFeature, loadFeature } from "jest-cucumber";

const feature = loadFeature("src/__tests__/features/wallet.feature");

defineFeature(feature, (test) => {
  test("Connecting your wallet - first visit", ({ given, and, when, then }) => {
    given(
      "I have never used the bridge but have acknowledged the disclaimer",
      () => {}
    );

    and("I see the connecting wallet loading screen", () => {});

    when("I select my wallet provider", () => {});

    then("my account connects to the bridge app", () => {});
  });

  test("Connecting your wallet - visited before", ({ given, when, then }) => {
    given("I have used the bridge before", () => {});

    when("I try to use the bridge", () => {});

    then("my account/wallet is connected automatically", () => {});
  });

  test("Connecting your wallet - on wrong chain", ({
    given,
    when,
    and,
    then,
  }) => {
    given("I have used the bridge before", () => {});

    when("I try to use the bridge", () => {});

    and(
      "my wallet provider is connected to another chain other than ETH mainnet",
      () => {}
    );

    then(
      "I cannot use the bridge until I switch my network to ETH mainnet",
      () => {}
    );
  });
});

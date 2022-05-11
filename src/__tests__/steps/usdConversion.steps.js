import { defineFeature, loadFeature } from "jest-cucumber";

const feature = loadFeature("src/__tests__/features/usdConversion.feature");

defineFeature(feature, (test) => {
  test("Showing the input amount in USD", ({ given, when, then }) => {
    given("I am on either transfer/release modules", () => {});

    when("I enter a positive value", () => {});

    then(
      "I am presented with the appropriate USD value of the selected token",
      () => {}
    );
  });

  test("Showing the resulting amount in USD", ({ given, when, then }) => {
    given("I am on either transfer/release modules", () => {});

    when("I enter a positive value", () => {});

    then(
      "I am presented with the appropriate USD resulting amount of the selected token",
      () => {}
    );
  });

  test("Showing the fee amounts in USD", ({ given, when, then }) => {
    given("I am on either transfer/release modules", () => {});

    when("I enter a positive value", () => {});

    then(
      "I am presented with the appropriate USD fees for executing the transaction",
      () => {}
    );
  });
});

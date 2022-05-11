import { defineFeature, loadFeature } from "jest-cucumber";

const feature = loadFeature("src/__tests__/features/feeEstimation.feature");

defineFeature(feature, (test) => {
  test("Transfering funds", ({ given, when, then }) => {
    given("I am on the transfer module", () => {});

    when("I enter a positive amount in the input box", () => {});

    then("the appropriate fees are presented to me", () => {});
  });

  test("Releasing funds", ({ given, when, and, then }) => {
    given("I am on the release module", () => {});

    when("I enter a positive amount in the input box", () => {});

    and("I enter a valid bitcoin address", () => {});

    then("the appropriate fees are presented to me", () => {});
  });
});

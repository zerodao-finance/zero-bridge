import { defineFeature, loadFeature } from "jest-cucumber";

const feature = loadFeature("src/__tests__/features/notification.feature");

defineFeature(feature, (test) => {
  test("Using the transfer module", ({ given, and, when, then }) => {
    given("I am on the transfer module", () => {});

    and("I enter a valid input amount", () => {});

    when("I transfer the funds", () => {});

    then(
      "I receive a notification showing the transaction was executed",
      () => {}
    );
  });

  test("Using the release module", ({ given, and, when, then }) => {
    given("I am on the release module", () => {});

    and("I enter a valid input amount", () => {});

    and("I enter a valid bitcoin address", () => {});

    when("I release the funds", () => {});

    then(
      "I receive a notification showing the transaction was executed",
      () => {}
    );
  });
});

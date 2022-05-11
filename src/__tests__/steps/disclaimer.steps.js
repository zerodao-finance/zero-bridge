import { defineFeature, loadFeature } from "jest-cucumber";

const feature = loadFeature("src/__tests__/features/disclaimer.feature");

defineFeature(feature, (test) => {
  test("Acknowledging the disclaimer", ({ given, when, then }) => {
    given("I have never used the bridge", () => {});

    when("I enter the site, the disclaimer appears", () => {});

    then(/^I scroll to the bottom and select "(.*)"$/, (arg0) => {});
  });

  test("Not ackowledging the disclaimer", ({ given, when, then }) => {
    given("I have never used the bridge", () => {});

    when("I enter the site, the disclaimer appears", () => {});

    then("I do not scroll to the bottom so I cannot view the bridge", () => {});
  });
});

import { defineFeature, loadFeature } from "jest-cucumber";

const feature = loadFeature("src/__tests__/features/navigation.feature");

defineFeature(feature, (test) => {
  test("Viewing the bridge release module by clicking", ({
    given,
    when,
    then,
  }) => {
    given("I am on the default home screen - bridge transfer module", () => {});

    when("I click on the release tab", () => {});

    then("I should be able to view the bridge release module", () => {});
  });

  test("Viewing the bridge transfer module by clicking", ({
    given,
    when,
    then,
  }) => {
    given("I am on the bridge release module", () => {});

    when("I click on the transfer tab", () => {});

    then("I should be able to view the bridge transfer module", () => {});
  });

  test("Viewing the bridge modules by url", ({ given, when, then }) => {
    given("I am on the default home screen - bridge transfer module", () => {});

    when("I enter the url followed by /#/release", () => {});

    then("I should be able to view the bridge release module", () => {});
  });

  test("Viewing transaction history", ({ given, when, then }) => {
    given("I am on the default home screen - bridge transfer module", () => {});

    when(/^I click on "(.*)" in the sidebar$/, (arg0) => {});

    then("I should see previous transaction if I have any", () => {});
  });

  test("Viewing transaction manager", ({ given, when, then }) => {
    given("I am on the default home screen - bridge transfer module", () => {});

    when(/^I click on "(.*)" in the sidebar$/, (arg0) => {});

    then(
      "I should see pending and previous transactions if I have any",
      () => {}
    );
  });
});

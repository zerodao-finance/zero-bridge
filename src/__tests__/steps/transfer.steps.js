import { defineFeature, loadFeature } from "jest-cucumber";

const feature = loadFeature("src/__tests__/features/transfer.feature");

defineFeature(feature, (test) => {
  test("Transfering a negative amount", ({ given, when, then }) => {
    given("I am on the bridge transfer module", () => {});

    when("I enter a negative amount into the input", () => {});

    then("I cannot transfer the funds", () => {});
  });

  test("Transfering a small amount less than $30", ({ given, when, then }) => {
    given("I am on the bridge transfer module", () => {});

    when(
      /^I enter a small amount that results to less than \$(\d+)$/,
      (arg0) => {}
    );

    then("I am warned by the bridge that I could lose my funds", () => {});
  });

  test("Transfering a large amount over $100K", ({ given, when, then }) => {
    given("I am on the bridge transfer module", () => {});

    when(
      /^I enter a small amount that results to over \$(\d+)K$/,
      (arg0) => {}
    );

    then("I am warned by the bridge that I could lose my funds", () => {});
  });

  test("Transfering an an amount more than $30 and less than $100K", ({
    given,
    when,
    then,
    and,
  }) => {
    given("I am on the bridge transfer module", () => {});

    when(
      /^I enter an amount resulting between \$(\d+) and \$(\d+)K$/,
      (arg0, arg1) => {}
    );

    then("I am able to transfer my funds to ETH mainnet", () => {});

    and("I am shown the fees for executing the transaction", () => {});

    and("I am shown the amount I will receive after fees", () => {});
  });
});

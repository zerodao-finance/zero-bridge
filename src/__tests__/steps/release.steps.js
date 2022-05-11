import { defineFeature, loadFeature } from "jest-cucumber";

const feature = loadFeature("src/__tests__/features/release.feature");

defineFeature(feature, (test) => {
  test("Releasing a negative amount", ({ given, when, then }) => {
    given("I am on the bridge release module", () => {});

    when("I enter a negative amount into the input", () => {});

    then("I cannot release the funds", () => {});
  });

  test("Releasing a small amount less than $30", ({ given, when, then }) => {
    given("I am on the bridge release module", () => {});

    when(
      /^I enter a small amount that results to less than \$(\d+)$/,
      (arg0) => {}
    );

    then("I am warned by the bridge that I could lose my funds", () => {});
  });

  test("Releasing a large amount over $100K", ({ given, when, then }) => {
    given("I am on the bridge release module", () => {});

    when(
      /^I enter a small amount that results to over \$(\d+)K$/,
      (arg0) => {}
    );

    then("I am warned by the bridge that I could lose my funds", () => {});
  });

  test("Releasing a valid amount with invalid bitcoin address", ({
    given,
    when,
    and,
    then,
  }) => {
    given("I am on the bridge release module", () => {});

    when("I enter a positive number in the input box", () => {});

    and("I enter an invalid bitcoin address in the second input box", () => {});

    then(
      "I am warned that my funds may be lost because the receiving address is invalid",
      () => {}
    );
  });

  test("Releasing an an amount more than $30 and less than $100K", ({
    given,
    when,
    and,
    then,
  }) => {
    given("I am on the bridge release module", () => {});

    when(
      /^I enter an amount resulting between \$(\d+) and \$(\d+)K$/,
      (arg0, arg1) => {}
    );

    and("I enter my recieving bitcoin address", () => {});

    then("I am able to release my funds to the bitcoin chain", () => {});

    and("I am shown the fees for executing the transaction", () => {});

    and("I am shown the amount I will receive after fees", () => {});
  });
});

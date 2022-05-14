import { defineFeature, loadFeature } from "jest-cucumber";
import { fireEvent } from "@testing-library/react";
import { useMockComponents } from "../mockComponents";

const feature = loadFeature("src/__tests__/features/release.feature");

defineFeature(feature, (test) => {
  const { input, button } = useMockComponents();

  beforeEach(() => {
    window.history.pushState({}, "Release", "/#/release");
    fireEvent.change(input, { target: { value: "0" } });
  });

  test("Releasing a negative amount", ({ given, when, then }) => {
    given("I am on the bridge release module", () => {
      expect(window.location.hash).toContain("release");
    });

    when("I enter a negative amount into the input", () => {
      fireEvent.change(input, { target: { value: "-1" } });
      expect(input.value).toBe("-1");
    });

    then("I cannot release the funds", () => {
      expect(button.className).toContain("cursor-not-allowed");
    });
  });

  test("Releasing a small amount less than $30", ({ given, when, then }) => {
    given("I am on the bridge release module", () => {
      expect(window.location.hash).toContain("release");
    });

    when(
      /^I enter a small amount that results to less than \$(\d+)$/,
      (arg0) => {
        fireEvent.change(input, { target: { value: "0.001" } });
        expect(input.value).toBe("0.001");
      }
    );

    then("I am warned by the bridge that I could lose my funds", () => {
      // TODO: mock release hook and watch for notification to get triggered
    });
  });

  test("Releasing a large amount over $100K", ({ given, when, then }) => {
    given("I am on the bridge release module", () => {
      expect(window.location.hash).toContain("release");
    });

    when(/^I enter an amount that results to over \$(\d+)K$/, (arg0) => {
      fireEvent.change(input, { target: { value: "5" } });
      expect(input.value).toBe("5");
    });

    then("I am warned by the bridge that I could lose my funds", () => {
      // TODO: mock release hook and watch for notification to get triggered
    });
  });

  test("Releasing a valid amount with invalid bitcoin address", ({
    given,
    when,
    and,
    then,
  }) => {
    given("I am on the bridge release module", () => {
      expect(window.location.hash).toContain("release");
    });

    when("I enter a positive number in the input box", () => {
      fireEvent.change(input, { target: { value: "1" } });
      expect(input.value).toBe("1");
    });

    and("I enter an invalid bitcoin address in the second input box", () => {
      // TODO: implement this on the FE
    });

    then(
      "I am warned that my funds may be lost because the receiving address is invalid",
      () => {
        // TODO: implement this on the FE
      }
    );
  });

  test("Releasing an an amount more than $30 and less than $100K", ({
    given,
    when,
    and,
    then,
  }) => {
    given("I am on the bridge release module", () => {
      expect(window.location.hash).toContain("release");
    });

    when(
      /^I enter an amount resulting between \$(\d+) and \$(\d+)K$/,
      (arg0, arg1) => {
        fireEvent.change(input, { target: { value: "1" } });
        expect(input.value).toBe("1");
      }
    );

    and("I enter my recieving bitcoin address", () => {
      // TODO
    });

    then("I am able to release my funds to the bitcoin chain", () => {
      // TODO
    });

    and("I am shown the fees for executing the transaction", () => {
      // TODO
    });

    and("I am shown the amount I will receive after fees", () => {
      // TODO
    });
  });
});

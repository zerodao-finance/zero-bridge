import { defineFeature, loadFeature } from "jest-cucumber";
import { fireEvent } from "@testing-library/react";
import { useMockComponents } from "../mockComponents";

const feature = loadFeature("src/__tests__/features/transfer.feature");

defineFeature(feature, (test) => {
  const { input, button, setInputValue, inputValue } = useMockComponents();

  beforeEach(() => {
    window.history.pushState({}, "Transfer", "/#/transfer");
    fireEvent.change(input, { target: { value: "0" } });
  });

  test("Transfering a negative amount", ({ given, when, then }) => {
    given("I am on the bridge transfer module", () => {
      expect(window.location.hash).toContain("transfer");
    });

    when("I enter a negative amount into the input", () => {
      setInputValue("-1");
      expect(inputValue).toBe("-1");
    });

    then("I cannot transfer the funds", () => {
      expect(button.className).toContain("cursor-not-allowed");
    });
  });

  test("Transfering a small amount less than $30", ({ given, when, then }) => {
    given("I am on the bridge transfer module", () => {
      expect(window.location.hash).toContain("transfer");
    });

    when(
      /^I enter a small amount that results to less than \$(\d+)$/,
      (arg0) => {
        fireEvent.change(input, { target: { value: "0.001" } });
        expect(input.value).toBe("0.001");
      }
    );

    then("I am warned by the bridge that I could lose my funds", () => {
      // TODO: mock transfer hook and watch for notification to get triggered
    });
  });

  test("Transfering a large amount over $100K", ({ given, when, then }) => {
    given("I am on the bridge transfer module", () => {
      expect(window.location.hash).toContain("transfer");
    });

    when(/^I enter an amount that results to over \$(\d+)K$/, (arg0) => {
      fireEvent.change(input, { target: { value: "5" } });
      expect(input.value).toBe("5");
    });

    then("I am warned by the bridge that I could lose my funds", () => {
      // TODO: mock transfer hook and watch for notification to get triggered
    });
  });

  test("Transfering an an amount more than $30 and less than $100K", ({
    given,
    when,
    then,
    and,
  }) => {
    given("I am on the bridge transfer module", () => {
      expect(window.location.hash).toContain("transfer");
    });

    when(
      /^I enter an amount resulting between \$(\d+) and \$(\d+)K$/,
      (arg0, arg1) => {
        fireEvent.change(input, { target: { value: "1" } });
        expect(input.value).toBe("1");
      }
    );

    then("I am able to transfer my funds to ETH mainnet", () => {
      // TODO: integration tests to do a mock transfer
      console.log(button.className);
    });

    and("I am shown the fees for executing the transaction", () => {});

    and("I am shown the amount I will receive after fees", () => {});
  });
});

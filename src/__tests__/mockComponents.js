import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { DefaultInput, PrimaryRoundedButton } from "../ui/atoms";

export const useMockComponents = () => {
  // Mock States
  let inputValue = 0;
  const setInputValue = (e) => {
    fireEvent.change(input, { target: { value: e } });
    inputValue = e;
  };

  // Input Mocked Component
  const inputUtils = render(
    <DefaultInput value={inputValue} onChange={setInputValue} />
  );
  const input = inputUtils.getByTestId("default-input");

  // Button Submit Mocked Component
  const buttonUtils = render(
    <PrimaryRoundedButton active={parseFloat(input.value) >= 0} />
  );
  const button = buttonUtils.getByTestId("rounded-button");

  return {
    input,
    button,
    inputValue,
    setInputValue,
    ...inputUtils,
    ...buttonUtils,
  };
};

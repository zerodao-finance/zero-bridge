import React from "react";
import { render } from "@testing-library/react";
import { DefaultInput, PrimaryRoundedButton } from "../ui/atoms";

export const useMockComponents = () => {
  // Input Mocked Component
  const inputUtils = render(<DefaultInput />);
  const input = inputUtils.getByTestId("default-input");

  const btcInputUtils = render(
    <DefaultInput dataTestId="btc-input" type="text" />
  );
  const btcInput = btcInputUtils.getByTestId("btc-input");

  return {
    input,
    ...inputUtils,
    btcInput,
    ...btcInputUtils,
  };
};

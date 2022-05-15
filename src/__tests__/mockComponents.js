import React from "react";
import { render } from "@testing-library/react";
import { DefaultInput, PrimaryRoundedButton } from "../ui/atoms";
// import TokenDropdown from "../ui/atoms/dropdowns/dropdown.tokens";

export const useMockComponents = () => {
  // Input Mocked Component
  const inputUtils = render(<DefaultInput />);
  const input = inputUtils.getByTestId("default-input");

  const btcInputUtils = render(
    <DefaultInput dataTestId="btc-input" type="text" />
  );
  const btcInput = btcInputUtils.getByTestId("btc-input");

  // Token Dropdown Component
  // const tokenDropdownUtils = render(<TokenDropdown tokensDisabled={["ibBTC"]} />);
  // const tokenDropdown = tokenDropdownUtils.getByTestId("token-dropdown");

  return {
    input,
    ...inputUtils,
    btcInput,
    ...btcInputUtils,
    // tokenDropdown,
    // ...tokenDropdownUtils
  };
};

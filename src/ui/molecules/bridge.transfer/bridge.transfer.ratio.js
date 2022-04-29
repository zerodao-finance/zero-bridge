import { FaBtc, FaEthereum } from "react-icons/fa";
import { SliderInput } from "../../atoms/inputs/input.slider";

export const BridgeTransferRatio = ({ ratio, effect }) => {
  return (
    <div className="flex flex-col gap-2 self-center text-black dark:text-white scale-[0.8] md:scale-[1]">
      <div className="flex flex-row w-full justify-between items-center px-5">
        <span className="flex w-[55px] justify-start">
          <FaEthereum className="fill-gray-900 dark:fill-gray-300 h-[1.3rem] w-max text-xs pr-[0.5rem]" />
          <p className="text-xs">{`${ratio}%`}</p>
        </span>
        <SliderInput ratio={ratio} effect={effect} />
        <span className="flex w-[55px] justify-end">
          <p className="text-xs">{`${100 - ratio}%`}</p>
          <FaBtc className="fill-gray-900 dark:fill-gray-300 h-[1.3rem] w-max pl-[0.5rem]" />
        </span>
      </div>
    </div>
  );
};

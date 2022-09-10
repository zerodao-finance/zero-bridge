import * as React from "react";
import { ProgressDots } from "../../atoms/progress/progress.dots";
import { truncateAddress } from "../../../api/utils/textUtilities";
import { getExplorerRoot } from "../../../api/utils/chains";
import { CONTROLLER_DEPLOYMENTS } from "@zerodao/sdk";
import { getChainId } from "../../../api/utils/chains";
import { useEffect, useState } from "react";
import { safeEthersGetAddress } from "../../atoms/cards/card.manage.tx";

export const getCard = (_ref) => {
  switch (_ref.type) {
    case "error":
      return ErrorCard({ ..._ref });
    case "warning":
      return WarningCard({ ..._ref });
    case "success":
      return SuccessCard({ ..._ref });
    case "message":
      return MessageCard({ ..._ref });
    case "transfer":
      return TransferCard({ ..._ref });
    case "burnWaiting":
      return BurnWaitingCard({ ..._ref });
    case "burn":
      return BurnCard({ ..._ref });
    default:
      return MessageCard({ ..._ref });
  }
};

export const BurnCard = ({ id, close, data }) => {
  return (
    <div
      className="dark:bg-gray-500 text-black min-h-[50px] min-w-[100px] max-h-[200px] max-w-[250px] md:max-h-[1000px] md:max-w-[300px] p-5 rounded-md shadow-md text-xs md:text-sm"
      key={id}
    >
      <span
        className="absolute top-1 right-1 text-md text-badger-white-400 cursor-pointer"
        onClick={close}
      >
        &times;
      </span>
      <div className="text-black dark:text-badger-white-400">
        Release Transaction:
      </div>
      <div className="text-black dark:text-badger-white-400 flex flex-row gap-2">
        <span>View on Explorer</span>
        <span className="underline text-orange-500">
          <a
            href={
              getExplorerRoot(
                getChainId(
                  safeEthersGetAddress(CONTROLLER_DEPLOYMENTS[data?.hostTX?.to])
                ),
                "tx"
              ) + data.hostTX.transactionHash
            }
            target="_blank"
            rel="noreferrer"
          >
            {truncateAddress(data.hostTX.transactionHash)}
          </a>
        </span>
      </div>
      <div className="text-black dark:text-badger-white-400 flex flew-row gap-2">
        <span>Progress:</span>
        <span>
          {data.txo ? (
            <a
              href={`https://mempool.space/tx/${data.txo}`}
              target="_blank"
              rel="noreferrer"
            >
              {truncateAddress(data.txo)}
            </a>
          ) : (
            <p className="animate-pulse">pending</p>
          )}
        </span>
      </div>
    </div>
  );
};

export const TransferCard = ({ id, close, data, max, current }) => {
  const [confirmationTime, setConfirmationTime] = useState(60);

  useEffect(() => {
    let controller = new AbortController();
    const fetchConfirmationTimeEffect = async () => {
      try {
        const statsReponse = await fetch(
          `https://blockchain.info/stats?format=json&cors=true`,
          { signal: controller.signal }
        );
        const statsData = await statsReponse.json();
        setConfirmationTime(statsData.minutes_between_blocks || 60);
      } catch (e) {
        console.error(e);
      }
    };
    fetchConfirmationTimeEffect();
    return () => controller?.abort();
  }, []);

  return (
    <div
      className="dark:bg-gray-500 text-black min-h-[50px] min-w-[100px] max-h-[200px] max-w-[250px] md:max-h-[1000px] md:max-w-[300px] p-5 rounded-md shadow-md text-xs md:text-sm"
      key={id}
    >
      <span
        className="absolute top-1 right-1 text-md text-badger-white-400 cursor-pointer"
        onClick={close}
      >
        &times;
      </span>
      <div className="text-badger-white-400">{truncateAddress(data.to)}</div>
      {max <= 6 ? (
        <div className="grid justify-center">
          <ProgressDots current={current} max={max} />
          <p className="text-badger-white-400 mt-1 animate-pulse">
            {" "}
            ~{confirmationTime * (max - current + 1)} minutes remaining{" "}
          </p>
        </div>
      ) : (
        <p className="text-zero-neon-green-500 animate-pulse font-semibold text-lg">
          {" "}
          {current} / {max} confirmations
        </p>
      )}
    </div>
  );
};

export const ErrorCard = ({ message, id, close }) => {
  console.error(message);
  return (
    <div
      className="dark:bg-gray-500 min-h-[50px] min-w-[100px] max-h-[200px] max-w-[250px] md:max-h-[1000px] md:max-w-[300px] p-5 rounded-md shadow-md text-xs md:text-sm"
      key={id}
    >
      <span
        className="absolute top-1 right-1 text-md text-badger-white-400 cursor-pointer"
        onClick={close}
      >
        &times;
      </span>
      <div className="text-badger-white-400 text-ellipsis">{message}</div>
      <div className="bg-[#EC4B4B] h-[6px] w-full absolute bottom-0 left-0 rounded-b-md" />
    </div>
  );
};

export const MessageCard = ({ message, id, close }) => {
  return (
    <div
      className="dark:bg-gray-500 min-h-[50px] min-w-[100px] max-h-[200px] max-w-[250px] md:max-h-[1000px] md:max-w-[300px] p-5 rounded-md shadow-md text-xs md:text-sm"
      key={id}
    >
      <span
        className="absolute top-1 right-1 text-md text-badger-white-400 cursor-pointer"
        onClick={close}
      >
        &times;
      </span>
      <div className="text-badger-white-400 p-1">{message}</div>
      <div className="bg-[#59616D] dark:bg-gray-300 h-[6px] w-full absolute bottom-0 left-0 rounded-b-md" />
    </div>
  );
};

export const WarningCard = ({ message, id, close }) => {
  return (
    <div
      className="dark:bg-gray-500 min-h-[50px] min-w-[100px] max-h-[200px] max-w-[250px] md:max-h-[1000px] md:max-w-[300px] p-5 rounded-md shadow-md text-xs md:text-sm"
      key={id}
    >
      <span
        className="absolute top-1 right-1 text-md text-badger-white-400 cursor-pointer"
        onClick={close}
      >
        &times;
      </span>
      <div className="text-badger-white-400 p-1">{message}</div>
      <div className="bg-[#F9A825] h-[6px] w-full absolute bottom-0 left-0 rounded-b-md" />
    </div>
  );
};

export const SuccessCard = ({ message, id, close }) => {
  return (
    <div
      className="dark:bg-gray-500 min-h-[50px] min-w-[100px] max-h-[200px] max-w-[250px] md:max-h-[1000px] md:max-w-[300px]p-5 rounded-md shadow-md text-xs md:text-sm"
      key={id}
    >
      <span
        className="absolute top-1 right-1 text-md text-badger-white-400 cursor-pointer"
        onClick={close}
      >
        &times;
      </span>
      <div className="text-badger-white-400 p-1">{message}</div>
      <div className="bg-main-green h-[6px] w-full absolute bottom-0 left-0 rounded-b-md" />
    </div>
  );
};

export const BurnWaitingCard = ({ message, id, close }) => {
  return (
    <div
      className="dark:bg-gray-500 min-h-[50px] min-w-[100px] max-h-[200px] max-w-[250px] md:max-h-[1000px] md:max-w-[300px]p-5 rounded-md shadow-md text-xs md:text-sm"
      key={id}
    >
      <div className="w-full flex justify-end pr-0.5">
        <span
          className="text-sm md:text-lg text-badger-white-400 cursor-pointer"
          onClick={close}
        >
          &times;
        </span>
      </div>
      <div className="text-badger-white-400 animate-pulse px-4 pb-4 -mt-2">
        {message}
      </div>
      <div className="bg-main-green h-[6px] w-full absolute bottom-0 left-0 rounded-b-md" />
    </div>
  );
};

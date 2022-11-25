import { BiLoaderCircle } from "react-icons/bi";
export const LoadingIndicator = ({ title }) => {
  return (
    <div className="flex flex-col justify-center gap-12 items-center">
      <p className="text-gray-200 capitalize text-light text-lg tracking-wider">
        {title}
      </p>
      <div className="animate-[spin_5s_linear_infinite] animate-ping">
        <BiLoaderCircle className="fill-zero-neon-green text-[30px] animate-pulse animate-ping" />
      </div>
    </div>
  );
};

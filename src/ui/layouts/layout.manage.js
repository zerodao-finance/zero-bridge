export const ManageTransactionLayout = ({ children, title }) => {
  return (
    <div className="bg-slate-600 rounded-md flex flex-col min-h-[350px] min-w-[360px]">
      <span className="self-center dark:text-emerald-300 bg-slate-500 w-full text-center rounded-t-md">
        {title}
      </span>
      <div className="grid grid-cols-2  gap-1 py-3 px-1 overflow-scroll">
        {children}
      </div>
    </div>
  );
};

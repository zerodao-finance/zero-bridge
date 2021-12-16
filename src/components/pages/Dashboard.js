import ConversionTool from "../organisms/ConversionTool";
import Transactions from "../organisms/Transactions";
import AppBar from "../organisms/AppBar";

const Dashboard = () => {
  

  return (
        <div className="h-screen fixed bg-gradient-to-tl from-white via-slate-50 to-neutral-50">
          <AppBar />
          <div className="flex flex-col h-full items-center justify-center">
            <div className="grow"></div>
            <ConversionTool />
            <Transactions />
          </div>
        </div>
  );
};

export default Dashboard;

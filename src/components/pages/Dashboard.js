import ConversionTool from "../organisms/ConversionTool";
import Transactions from "../organisms/Transactions";
import AppBar from "../organisms/AppBar";
import { ConversionToolContext } from '../../context/Context'
const Dashboard = () => {
  

  return (
    <ConversionToolContext.Consumer>
      { value =>
        <div className="h-screen fixed bg-gradient-to-tr from-sky-50 via-gray-100 to-gray-50">
          <AppBar />
          <div className="flex flex-col h-full items-center justify-center">
            {/* <ToastContainer /> */}
            <div className="fixed top-0 left-0 w-[40rem] h-[40rem] mt-[6rem] z-0">
              {value.get.depositTx}
            </div>
            <div className="grow"></div>
            <ConversionTool />
            {/* <Transactions /> */}
          </div>
        </div>
        }
    </ConversionToolContext.Consumer>
  );
};

export default Dashboard;

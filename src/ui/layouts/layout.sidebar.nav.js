import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaRegWindowClose } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { DefaultNavigationSidebar } from "../molecules/navigation/navigation.sidebar.default";
import { MdClose } from "react-icons/md";

export function LayoutSidebarNavigation({ children, changeModule, module }) {
  const [open, setOpen] = useState(false);

  // Close mobile nav after click
  useEffect(() => {
    setTimeout(() => setOpen(false), 200);
  }, [children, module]);

  return (
    <>
      <div
        className={`w-min text-badger-white-400 right-0 px-2 absolute md:hidden items-center z-[50] ${
          open ? "hidden" : "flex"
        }`}
        onClick={() => setOpen(true)}
      >
        <AiOutlineMenu size="20px" />
      </div>
      <DefaultNavigationSidebar changeModule={changeModule} />
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden z-[50]"
          onClose={setOpen}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" />
            </Transition.Child>

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="pointer-events-auto max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll py-6 shadow-xl rounded-l-lg bg-gradient-to-b from-zero-green-500 to-zero-green-800">
                    <div className="pr-4 pl-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-badger-white-400">
                          {" "}
                          Menu{" "}
                        </Dialog.Title>
                        <button
                          className="text-badger-white-400 p-1"
                          onClick={() => setOpen(false)}
                        >
                          <MdClose size="24px" />
                        </button>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 pl-6 pr-8">
                      {/* Replace with your content */}
                      {children}
                      {/* /End replace */}
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { AiOutlineMenu } from 'react-icons/ai'
import { DefaultNavigationSidebar } from '../molecules/navigation/navigation.sidebar.default'

export function LayoutSidebarNavigation({children, changeModule}) {
  const [open, setOpen] = useState(false)

  return (
    <>  
        <div className={`w-min dark:text-white right-0 absolute md:hidden items-center gap-2 capitalize font-light text-lg ${open ? 'hidden' : 'flex'}`} onClick={() => setOpen(true)}>
            <span className="text-sm">menu</span>
            <AiOutlineMenu />
        </div>
        <DefaultNavigationSidebar changeModule={changeModule}/>
        <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 overflow-hidden " onClose={setOpen}>
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
                <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
                >
                <div className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl rounded-l-lg">
                    <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900"> Menu </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                            <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => setOpen(false)}
                            >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
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
  )
}
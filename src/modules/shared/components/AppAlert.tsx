// import { IconAlertCircleFilled } from '@tabler/icons-react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

interface Props {
  alertIsOpen: boolean
  setAlertIsOpen: (value: boolean) => void 
  title: string
  description: string
}

export default function AppAlert({ alertIsOpen, setAlertIsOpen, description, title }: Props) {
  return (
    <Transition appear show={alertIsOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setAlertIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl bg-rose-100">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>

                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {description}
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md text-rose-900 bg-rose-300 hover:bg-rose-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
                    onClick={() => setAlertIsOpen(false)}
                  >
                    Aceptar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

{/* <div className='flex flex-row items-center justify-between w-1/3 gap-4 px-12 py-4 mx-auto mt-4 transition rounded-lg shadow-lg bg-rose-300'>
      <IconAlertCircleFilled size={32} className={`text-rose-700 ${action}`} />

      <div className='w-full'>
        <h4 className='text-3xl font-bold text-rose-800'>
          {title}
        </h4>

        <p className='w-full text-lg text-rose-900'>
          {description}
        </p>
      </div>
    </div> */}
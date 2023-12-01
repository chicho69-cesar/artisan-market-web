import { Menu, Transition } from '@headlessui/react'
import { IconBasketFilled, IconBrandShopee, IconBuildingStore, IconChevronDown, IconLayoutDashboard, IconTableOptions } from '@tabler/icons-react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '@/modules/auth/store'
import { Roles } from '@/modules/shared/interfaces'

export default function MenuDropDown() {
  const auth = useAuth((state) => state)

  return (
    <span>
      <Menu as="span" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex items-center justify-center w-full gap-2 px-2 py-1 font-medium bg-white rounded-md text-gray hover:bg-semiWhite focus:outline-none focus-visible:ring-2">
            <IconTableOptions color='#25292e' size={20} />
            Panel
            <IconChevronDown color='#25292e' size={18} />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to='/orders-history'
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 gap-2 py-2 text-sm`}
                  >
                    <IconBrandShopee color={active ? '#f1f1f1' : '#25292e'} size={20} />
                    Mi historial de pedidos
                  </Link>
                )}
              </Menu.Item>
            </div>

            {(auth.isLoggedIn && auth.user?.role_id === Roles.seller) && (
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to='/dashboard'
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 gap-2 py-2 text-sm`}
                    >
                      <IconLayoutDashboard color={active ? '#f1f1f1' : '#25292e'} size={20} />
                      Dashboard
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to='/my-products'
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 gap-2 py-2 text-sm`}
                    >
                      <IconBuildingStore color={active ? '#f1f1f1' : '#25292e'} size={20} />
                      Mis productos
                    </Link>
                  )}
                </Menu.Item>
                
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to='/orders'
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 gap-2 py-2 text-sm`}
                    >
                      <IconBasketFilled color={active ? '#f1f1f1' : '#25292e'} size={20} />
                      Pedidos
                    </Link>
                  )}
                </Menu.Item>
              </div>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </span>
  )
}

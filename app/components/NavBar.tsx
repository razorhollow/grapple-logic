import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Form, NavLink } from '@remix-run/react'

import logoAssetUrl from 'app/assets/grapple-logic-logo.svg'
import { useOptionalUser } from '~/utils'

import { Button } from './ui/button'


export default function NavBar() {
    const user = useOptionalUser();
    return (
        <Disclosure as="nav" className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-10 md:h-16 justify-between">
                    <div className="flex">
                        <div className="-ml-2 mr-2 flex items-center md:hidden">
                            {/* Mobile menu button */}
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                                <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                            </DisclosureButton>
                        </div>
                        <div className="flex flex-shrink-0 items-center">
                            <img
                                alt="Grapple Logic"
                                src={logoAssetUrl}
                                className="h-8 w-auto"
                            />
                        </div>
                        <div className="hidden md:ml-6 md:flex md:space-x-8">
                            <NavLink
                                to="/calendar"
                                className={({ isActive }) =>
                                    isActive ?
                                        "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                                        :
                                        "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                }
                            >
                                Calendar
                            </NavLink>
                            <NavLink
                                to="/techniques"
                                className={({ isActive }) =>
                                    isActive ?
                                        "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                                        :
                                        "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                }
                            >
                                Library
                            </NavLink>
                            <NavLink
                                to="/notes"
                                className={({ isActive }) =>
                                    isActive ?
                                        "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                                        :
                                        "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                }
                            >
                                My Notes
                            </NavLink>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Button className='rounded-full sm:rounded-md' asChild>
                                <NavLink to="/techniques/new">
                                    <PlusIcon aria-hidden="true" className="-ml-0.5 h-5 w-5" />
                                    <span className='hidden sm:block'>New Technique</span>
                                </NavLink>
                            </Button>
                        </div>
                        <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        <UserIcon />
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    {user ? (
                                    <><MenuItem>
                                            <NavLink to="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                                Your Profile
                                            </NavLink>
                                        </MenuItem><MenuItem>
                                                <NavLink to="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                                    Settings
                                                </NavLink>
                                            </MenuItem><MenuItem>
                                            <Form method="post" action="/logout">
                                                <button type='submit' className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                                    Sign out
                                                </button>
                                            </Form>
                                            </MenuItem></>
                                    ) : (
                                    <MenuItem>
                                        <NavLink to="/login" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                            Sign in
                                        </NavLink>
                                    </MenuItem>
                                    )}
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="md:hidden">
                <div className="space-y-1 pb-3 pt-2">
                    {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                    <DisclosureButton
                        as={NavLink}
                        to="/calendar"
                        className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700 sm:pl-5 sm:pr-6"
                    >
                        Calendar
                    </DisclosureButton>
                    <DisclosureButton
                        as={NavLink}
                        to="/techniques"
                        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                    >
                        Library
                    </DisclosureButton>
                    <DisclosureButton
                        as={NavLink}
                        to="/notes"
                        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                    >
                        My Notes
                    </DisclosureButton>
                </div>
            </DisclosurePanel>
        </Disclosure>
    )
}

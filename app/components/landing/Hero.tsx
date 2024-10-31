import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink } from '@remix-run/react'
import { useState } from 'react'

import heroImgAssetUrl from 'app/assets/hero.png'

import GlassCard from '../GlassCard'
import { SparklesGradientIcon, ScienceBeakerIcon, SmartCalendarIcon, GrowthChartIcon } from '../icons/gradientIcons'


const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
]

export default function HeroSection() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="bg-gray-900">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                alt=""
                                src={heroImgAssetUrl}
                                className="h-8 w-auto"
                            />
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-white">
                                {item.name}
                            </a>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4 items-baseline">
                        <NavLink to="/login" className="text-xs/6 font-semibold text-white">
                            Sign In
                        </NavLink>
                        <NavLink to="/join" className="text-xs/6 font-semibold text-slate-800 bg-gradient-to-r from-white to-blue-200 rounded-sm px-2">
                            Sign Up
                        </NavLink>
                    </div>
                </nav>
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <div className="fixed inset-0 z-50" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img
                                    alt=""
                                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                    className="h-8 w-auto"
                                />
                            </a>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-400"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/25">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-800"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                                <div className="py-6">
                                    <NavLink
                                        to="/login"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-gray-800"
                                    >
                                        Sign in
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>

            {/* --- Hero Section --- */}

            <div className="relative isolate overflow-hidden pt-14">
                <img
                    alt=""
                    src={heroImgAssetUrl}
                    className="absolute inset-0 -z-20 h-full w-full object-cover"
                />
                <div className="absolute inset-0 -z-10 bg-black opacity-60"></div>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl py-8 sm:py-12 lg:py-14">
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                            <div className="relative rounded-md px-3 py-1 text-sm/6 text-gray-100 ring-1 ring-white/70 hover:ring-white/20 bg-white/10 backdrop-blur-md border border-white/20 shadow-md">
                                <span className='flex justify-between w-54 gap-2'>
                                    <SparklesGradientIcon />{'  '}Trusted By Champions
                                </span>
                            </div>

                        </div>
                        <div className="text-center">
                            <h1 className="text-balance text-5xl font-semibold tracking-tight bg-gradient-to-r from-[#FFFFFF] via-blue-500 to-[#7E3F98] bg-clip-text text-transparent sm:text-7xl">
                                Learn faster, retain more
                            </h1>
                            <p className="mt-8 text-pretty md:text-sm font-medium text-gray-300 sm:text-xl/8">
                                Unlock your true potential with Grapple Logic, the lesson planning app powered by cutting-edge science to effectively reinforce techniques and drills. Grapple Logic ensures you never forget a move by optimizing your training sessions and mastering new techniques faster.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <NavLink to="/register" className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">
                                    Get started
                                </NavLink>
                                <NavLink to="#" className="text-sm/6 font-semibold text-blue-300 ring-1 ring-blue-500/70 hover:ring-blue-400/90 border-blue-500 rounded-md px-3.5 py-2">
                                    Learn more
                                </NavLink>
                            </div>
                        </div>
                    </div>
                        <div id="feature-cards" className='grid grid-cols-3 gap-3 mb-8'>
                            <GlassCard icon={GrowthChartIcon} heading="Built For Growth" text="Whether you're a white belt starting out or a seasoned competitor, Grapple Logic adapts to your level to help you retain more and improve consistently." />
                            <GlassCard icon={SmartCalendarIcon} heading="Smart Scheduling" text="Train smarter, not harder. Grapple Logic generates lesson plans that revisit essential techniques at optimal intervals to engrain them in your muscle memory." />
                            <GlassCard icon={ScienceBeakerIcon} heading="Backed By Science" text="Visualize your journey from beginner to expert. Our science-backed spaced repetition algorithm highlights the optimal times to revisit techniques, ensuring you retain what you learn, making every training session count." />
                        </div>
                </div>
            </div>
        </div>
    )
}

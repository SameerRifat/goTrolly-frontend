import React, { useState } from 'react'
import { Dialog } from '@headlessui/react'
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../images/logo.png'
import { NavLink } from 'react-router-dom';

const navigation = [
    { name: 'flash sale', href: '/flashSale' },
    { name: 'new arrivals', href: '/newArrivals' },
    { name: 'products', href: '/products' },
    { name: 'top selling', href: '/topSelling' },
    { name: 'audio', href: '/audio' },
    { name: 'smart phones', href: '/smartPhones' },
    { name: 'charging and power', href: '/chargingAndPower' },
]

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
        <div className="bg-white">
            <nav className="flex items-center justify-between px-3 md:px-6 h-16 sm:h-20 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <NavLink to='/' className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                            className="w-36 sm:w-40 md:w-48"
                            src={logo}
                            alt="logo"
                        />
                    </NavLink>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <MenuIcon />
                    </button>
                </div>
                <div className="hidden lg:flex navItems lg:mt-6 lg:h-full">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            className={`${item.name === 'flash sale' || item.name === 'new arrivals' ? 'active-mustard' : 'active-black'} text-lg font-medium leading-6 text-gray-900 px-5 h-full pt-3.5`}
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-50" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src={logo}
                                alt=""
                            />
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
                            <CloseIcon />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-lg font-medium leading-7 text-gray-900 hover:bg-gray-50"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </div>
    )
}

export default Navbar
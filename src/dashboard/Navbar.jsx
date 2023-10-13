import React, { useState } from 'react'
import { Dialog } from '@headlessui/react'
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
// import logo from '../images/logo.png'
import avatar from '../images/avatar.jpg'
import { NavLink } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LightModeIcon from '@mui/icons-material/LightMode';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Avatar from '@mui/material/Avatar';
import { Button, useMediaQuery, Rating, Box } from '@mui/material';

const Navbar = () => {
    const isNonMobileScreens = useMediaQuery('(min-width:600px)');
    return (
        <div className="bg-white">
            <nav className="flex items-center justify-between px-3 md:px-6 h-16 sm:h-20 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <NavLink to='/' className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                            className="w-32 sm:w-40 md:w-48"
                            // src={logo}
                            src="/images/logo2.jpg"
                            alt="logo"
                        />
                    </NavLink>
                </div>
                {/* <div className="flex lg:hidden"> */}
                <div className="hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    // onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <MenuIcon />
                    </button>
                </div>
                <div className="flex text-black">
                    <Box
                        display='flex'
                        sx={{
                            '& .MuiButton-root': {
                                minWidth: isNonMobileScreens ? '64px' : '0px'
                            }
                        }}
                    >
                        <Button>
                            <CheckCircleOutlineIcon fontSize={isNonMobileScreens ? 'large' : 'small'} className='text-black' />
                        </Button>
                        <Button>
                            <LightModeIcon fontSize={isNonMobileScreens ? 'large' : 'small'} className='text-black' />
                        </Button>
                        <Button>
                            <NotificationsActiveIcon fontSize={isNonMobileScreens ? 'large' : 'small'} className='text-black' />
                        </Button>
                        <Avatar
                            alt="Remy Sharp"
                            src={avatar}
                            sx={{ width: isNonMobileScreens ? 56 : 36, height: isNonMobileScreens ? 56 : 36 }}
                        />
                    </Box>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
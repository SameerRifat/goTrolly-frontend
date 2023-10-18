import React, { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink, useNavigate } from 'react-router-dom';
// import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clear_errors, logout } from '../features/user/userSlice';
import { Avatar } from '@mui/material';
import { toast } from 'react-toastify';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const UserOptions = ({ user }) => {
    const navigate = useNavigate();
    // const alert = useAlert()
    const dispatch = useDispatch()
    const { loading, isAuthenticated, error } = useSelector((state) => state.user)
    const options = [
        { icon: <ListAltIcon style={{ color: 'gray' }} />, name: "Orders", func: orders },
        { icon: <PersonIcon style={{ color: 'gray' }} />, name: "Profile", func: account },
        { icon: <LogoutIcon style={{ color: 'gray' }} />, name: "Logout", func: logoutUser },
    ]
    if (user && user.role === "admin") {
        options.unshift({ icon: <DashboardIcon style={{ color: 'gray' }} />, name: "Dashboard", func: dashboard })
    }
    function orders() {
        navigate("/orders")
    }
    function account() {
        navigate("/account")
    }
    function logoutUser() {
        dispatch(logout())
        // alert.success("Logout Successfully");
        // alert("Logout Successfully")
        // navigate("/")
    }
    function dashboard() {
        navigate("/admin/products");
    }
    useEffect(() => {
        if (!isAuthenticated) {
            toast.error("Logged out Successfully", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/')
        }
        if (error) {
            toast.error(error, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(clear_errors());
        }
    }, [isAuthenticated, error, dispatch, navigate])
    return (
        <>
            {/* Profile dropdown */}
            <Menu as="div" className="relative">
                <div>
                    <Menu.Button className="flex rounded-full">
                        <span className="sr-only">Open user menu</span>
                        <div className='px-3 pr-0 py-1.5'>
                            {/* <img
                                className="h-8 w-8 rounded-full object-cover"
                                src={user.avatar.url ? user.avatar.url : "./images/profile.png"}
                                alt="avatar Preview"
                            /> */}
                            <Avatar className='' sx={{ bgcolor: '#FFFF00', color: '#000', textTransform: 'uppercase', fontSize: '15px', width: '34px', height: '34px' }}>
                                {user.name
                                    .split(' ') // Split the name into an array of words
                                    .map(word => word.substring(0, 1)) // Take the first character of each word
                                    .join('')} {/* Join the first characters of each word */}
                            </Avatar>
                            {/* <Avatar className='' sx={{bgcolor: '#FFFF00', color: '#000'}}>{user.name.substring(0,1)}</Avatar> */}
                        </div>
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition duration-4"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-4"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {options.map((item) => {
                            return <Menu.Item>
                                {({ active }) => (
                                    <div onClick={item.func} className={classNames(active ? 'bg-broom' : '', 'px-4 py-2 text-sm text-gray-700 flex items-center gap-2 cursor-pointer')}>
                                        {item.icon}
                                        <p>{item.name}</p>
                                    </div>
                                )}
                            </Menu.Item>
                        })}
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}

export default UserOptions
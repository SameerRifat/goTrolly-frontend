import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import MetaData from '../../components/MetaData'
import { Avatar, Tooltip } from '@mui/material'
// import Loader from '../Loader'
// import MetaData from '../MetaData'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
const backendUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Profile = () => {
    const { loading, user, isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login")
        }
    }, [isAuthenticated, navigate])
    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title={`${user.name}'s profile`} />
                    <div className='pt-10 pb-16'>
                        <div className="w-[90%] md:w-[400px] mx-auto grid grid-cols-1 border border-broom shadow-md rounded-sm p-5 relative">
                            <div className="col-span-full lg:col-span-3 flex flex-col gap-5 items-center">
                                <h2 className='text-xl md:text-2xl font-medium'>My Profile</h2>
                                <div className="flex rounded-full p-1 shadow-sm">
                                    {/* <img
                                        // src={user?.avatar?.url}
                                        src={`${backendUrl}${user?.avatar?.url}`}
                                        alt={user.name}
                                        className='h-60 w-60 rounded-full object-cover '
                                    /> */}
                                    <Avatar className='' sx={{ bgcolor: '#FFFF00', color: '#000', textTransform: 'uppercase', fontSize: '18px', width: '60px', height: '60px' }}>
                                        {user.name
                                            .split(' ') // Split the name into an array of words
                                            .map(word => word.substring(0, 1)) // Take the first character of each word
                                            .join('')} {/* Join the first characters of each word */}
                                    </Avatar>
                                </div>
                                {/* <NavLink to="/me/update" className='bg-broom inline-block w-60 md:w-72 p-3 text-center text-black font-medium shadow-sm'>Edit Profile</NavLink> */}
                            </div>
                            <div className="col-span-full lg:col-span-3 flex flex-col gap-5 justify-between">
                                <div>
                                    <h3 className='text-lg md:text-xl font-medium'>Full Name</h3>
                                    <p className=''>{user.name}</p>
                                </div>
                                <div>
                                    <h3 className='text-lg md:text-xl font-medium'>Email</h3>
                                    <p className=''>{user.email}</p>
                                </div>
                                <div>
                                    <h3 className='text-lg md:text-xl font-medium'>Joined On</h3>
                                    <p>{user.createdAt.slice(0, 10)}</p>
                                </div>
                                <div className='flex flex-col gap-5'>
                                    <NavLink to="/orders" className='w-full py-3 font-medium text-base sm:text-lg bg-broom text-center shadow-sm hover:shadow-md'>My Orders</NavLink>
                                    <NavLink to="/password/update" className='w-full py-3 font-medium text-base sm:text-lg bg-broom text-center shadow-sm hover:shadow-md'>Change Password</NavLink>
                                </div>
                            </div>
                            <NavLink to="/me/update" className='absolute right-3 top-3'>
                                <Tooltip title="Edit Profile">
                                    <EditOutlinedIcon />
                                </Tooltip>
                            </NavLink>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Profile
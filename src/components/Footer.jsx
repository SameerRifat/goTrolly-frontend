import React from 'react'
// import { BsFacebook } from "react-icons/bs";
// import { BsInstagram } from "react-icons/bs";
// import { BsTwitter } from "react-icons/bs";
// import { BsLinkedin } from "react-icons/bs";
// import { NavLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='bg-black pt-10 text-white uppercase'>
            <div className="w-[90%] mx-auto grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-20 text-center xs:text-left">
                <div className="footer-1">
                    <NavLink href="/" className="footer-logo"><h4 className='text-2xl font-medium uppercase'>Shop Go Trolly</h4></NavLink>
                    <ul className="flex flex-col gap-1 text-lg mt-5">
                        <li><NavLink to='' className='hover:underline'>Chargers</NavLink></li>
                        <li><NavLink to='' className='hover:underline'>wire</NavLink></li>
                        <li><NavLink to='' className='hover:underline'>cables</NavLink></li>
                        <li><NavLink to='' className='hover:underline'>Accessories</NavLink></li>
                        <li><NavLink to='' className='hover:underline'>Parts</NavLink></li>
                        <li><NavLink to='' className='hover:underline'>Terms of service</NavLink></li>
                        <li><NavLink to='' className='hover:underline'>refund policy</NavLink></li>
                    </ul>
                </div>
                <div className="footer-2">
                    <h4 className='mb-5 text-2xl font-medium uppercase'>Check This out</h4>
                    <ul className="flex flex-col gap-1 text-lg">
                        <li><NavLink to='' className='hover:underline'>Customer pics</NavLink></li>
                        <li><NavLink to='' className='hover:underline'>Reviews</NavLink></li>
                        <li><NavLink to='' className='hover:underline'>testimonials</NavLink></li>
                        <li><NavLink to='' className='hover:underline'>partnerships</NavLink></li>
                        <li><NavLink to='' className='hover:underline'>About us</NavLink></li>
                    </ul>
                </div>
                <div className="footer-3">
                    <h4 className='mb-5 text-2xl font-medium uppercase'>Customer Service</h4>
                    <ul className="flex flex-col gap-1 text-lg">
                        <li><NavLink to='' className='hover:underline'>About Us</NavLink></li>
                        <li><NavLink to='' className='hover:underline'>Contact us</NavLink></li>
                        <li><NavLink to='' className='hover:underline'>warranty</NavLink></li>
                        <li><NavLink to='' className='hover:underline'>shipping</NavLink></li>
                        <li><NavLink to='' className='hover:underline'>returns & exchanges</NavLink></li>
                        <li><NavLink to='' className='hover:underline'>faq's</NavLink></li>

                    </ul>
                </div>
                <div className="footer-4">
                    <h4 className='mb-5 text-2xl font-medium uppercase'>Contact us</h4>
                    <div className='text-lg'>
                        <p className='mb-4'>call 000-987-433-668</p>
                        <p>email: gotrolly@gmail.com</p>
                    </div>
                </div>
            </div>
            <div className="py-2 mt-5 lg:mt-16 border-t-2 border-white">
                <span className='ml-6'>All rights reserved 2023</span>
            </div>
        </div>
    )
}

export default Footer
import React, { useState } from 'react'
import { Dialog } from '@headlessui/react'
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
// import logo from '../images/logo.png'
import avatar from '../images/avatar.jpg'
import { NavLink, Outlet } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LightModeIcon from '@mui/icons-material/LightMode';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Avatar from '@mui/material/Avatar';
import { Button, useMediaQuery, Rating, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import img1 from '../images/ear-buds.jpg'
import img2 from '../images/sp2.jpg'
import img3 from '../images/sony-speaker.jpg'
import img4 from '../images/m9.jpg'
import img5 from '../images/audio-sold2.jpg'
import img6 from '../images/laptop-stand.jpg'
import img7 from '../images/hands-free.jpg'
import img8 from '../images/jbl-mini.jpg'
import img9 from '../images/speaker.jpg'
import img10 from '../images/smart-watch.jpg'
import img11 from '../images/ubl-speaker.jpg'
import img12 from '../images/data-cable.jpg'
import img13 from '../images/audio-sold6.jpg'
import Navbar from './Navbar';
import Filters from './Filters';
import ProductsGrid from './product/ProductsGrid';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#000',
  },
});

const mainOptions = [
  {
    id: '1',
    label: 'add product',
  },
  {
    id: '2',
    label: 'products',
  },
  {
    id: '3',
    label: 'categories',
  },
  {
    id: '4',
    label: 'brands',
  }
]
const otherOptions = [
  {
    id: '1',
    label: 'orders',
  },
  {
    id: '2',
    label: 'customers',
  },
  {
    id: '3',
    label: 'statics',
  },
  {
    id: '4',
    label: 'reviews',
  },
  {
    id: '3',
    label: 'transactions',
  },
  {
    id: '4',
    label: 'on demand orders',
  }
]

export const ratingOptions = [
  {
    size: "medium",
    value: 5,
    readOnly: true,
  },
  {
    size: "medium",
    value: 4,
    readOnly: true,
  },
  {
    size: "medium",
    value: 3.5,
    readOnly: true,
  },
]

const Dashboard = () => {
  const isNonMobileScreens = useMediaQuery('(min-width:640px)');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [selectedProductType, setSelectedProductType] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [ratings, setRatings] = useState(0)
  const handleRatingsChange = (option) => {
    setRatings(0)
    setRatings(option);
  }

  return (
    <>
      <div className='bg-black h-14 flex items-center justify-end px-3 md:px-6'>
        <div className='flex items-center'>
          <NavLink to="/" className="text-yellow uppercase text-lg font-medium border-r border-yellow px-3 py-1.5">Main page</NavLink>
          <NavLink to="/totalEarnings" className="text-yellow uppercase text-lg font-medium px-3 pr-0 py-1.5">total earnings</NavLink>
        </div>
      </div>
      <Navbar />
      <div className=''>
        <div className="bg-black min-h-screen">
          <main className="px-3 md:px-6">
            <div className='border-b-2 border-b-white flex justify-end items-center pt-5 sm:pt-8 pb-1 sm:pb-2 lg:hidden'>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-white hover:text-gray-500"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <MenuIcon fontSize={isNonMobileScreens ? 'large' : 'small'} />
              </button>
            </div>
            <section aria-labelledby="products-heading" className="pb-24 pt-8">
              <div className="lg:flex lg:gap-8">

                {/* Product grid */}
                <div className="lg:w-[70%]">
                  {/* <ProductsGrid /> */}
                  <Outlet />
                </div>

                {/* Filters */}
                <div className="hidden lg:block lg:w-[30%] lg:h-fit bg-broom py-2 px-5">
                  <Filters mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen}/>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  )
}

export default Dashboard
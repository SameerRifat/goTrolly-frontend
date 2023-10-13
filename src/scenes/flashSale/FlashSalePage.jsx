import React from 'react'
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import power from '../..//images/power.jpg'
import chargingCable from '../..//images/charging-cable.jpg'
import phoneCase from '../..//images/phone-case.jpg'
import cables from '../..//images/cables.jpg'
import dataCable1 from '../..//images/data-cable1.jpg'
import dataCable2 from '../..//images/data-cable.jpg'
import wire1 from '../..//images/wire1.jpg'
import headPhones from '../..//images/head-phones.jpg'
import banner2 from '../..//images/banner2.jpg'
import camera from '../..//images/camera.jpg'
import earBuds from '../..//images/ear-buds.jpg'
import headPhones2 from '../..//images/head-phones2.jpg'
import { NavLink } from 'react-router-dom';
const backendUrl = import.meta.env.VITE_REACT_APP_API_URL;
import Countdown from 'react-countdown';

import { flashSale, moreOffers } from '../../mock_APIs/data';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#000',
  },
  // '& .MuiRating-iconHover': {
  //   color: '#ff3d47',
  // },
});

const FlashSalePage = () => {
  const dispatch = useDispatch()
  const { fetProductsLoading, products, fetchProductError } = useSelector((state) => state.product);

  return (
    <div className='pb-8 sm:pb-10'>
      <div className='grid gap-4 sm:gap-x-6 gap-y-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-mustard py-5 pb-6 px-3 md:px-6'>
        {products
          .filter((product) => product.hasDiscount === true)
          .slice(0, 6)
          .map((sale, ind) => {
            const { _id, name, ratings, price, images, discountPercentage } = sale
            const options = {
              value: ratings,
              readOnly: true,
              precision: 0.5
            }
            const discountedPrice = price - (price * (discountPercentage / 100));
            const firstImageSrc = images?.[0] ? `${backendUrl}${images[0]}` : '';
            return (
              <div key={_id} className="flex items-center gap-4 p-2 bg-white">
                <div className="aspect-h-1 aspect-w-1 overflow-hidden lg:aspect-none group-hover:opacity-75 w-56 h-32 min-h-60">
                  <img
                    src={firstImageSrc}
                    alt={name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="h-full flex flex-col justify-between w-full">
                  <div>
                    <NavLink to={`/product/${_id}`} className='block text-xl sm:text-2xl md:text-3xl text-black font-medium'>{name}</NavLink>
                    {/* <h2 className='text-xl sm:text-2xl md:text-3xl text-black font-medium'>{name}</h2> */}
                    <StyledRating {...options} size='' className='text-black' />
                    {/* <Rating {...options} size='small' className='text-black' /> */}
                  </div>
                  <div className='flex items-center justify-between'>
                    <h2 className='text-xl md:text-2xl text-black font-medium'>{`Rs ${discountedPrice}`}</h2>
                    <span className='bg-mustard py-0.5 px-2 md:px-3 text-black text-base sm:xl md:text-2xl'>{`- ${discountPercentage}%`}</span>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
      {/* Big offer */}
      <div className='w-full h-[300px] md:h-[350px] lg:h-[440px] bg-black mt-5 flex'>
        <div className='w-[55%] h-full'>
          <img src={banner2} alt="banner" className='w-full h-full object-centerj object-cover' />
        </div>
        <div className='w-[45%] pr-1'>
          <div className='my-auto mt-12'>
            <h1 className='text-broom text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-7 textStyle'>Big offer!</h1>
            <h2 className='text-main text-xl sm:text-3xl md:text-4xl lg:text-5xl'>Camera lens now 10% off on entire Stoke!!!</h2>
          </div>
        </div>
      </div>
      {/* more offers */}
      <h2 className='text-center text-2xl sm:text-3xl md:text-4xl font-medium mt-4'>More offers</h2>
      {/* <div className='grid gap-3 sm:gap-x-4 md:gap-x-6 lg:gap-x-9 gap-y-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-5 pb-6 px-3 md:px-6'> */}
      <div className='pt-5 px-3 md:px-6'>
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 2
            },
            1024: {
              slidesPerView: 3
            }
          }}
          slidesPerView={1}
          spaceBetween={30}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
        // className="border-4 border-yellow"
        >
          {moreOffers.map((offer, ind) => {
            const { _id, productImage, offerName, offerTime } = offer
            return (
              <SwiperSlide key={_id}
                className='bg-mustard border-2 border-tulip-tree'
              >
                <NavLink to={`#`}
                // className=' text-white bg-mustard border-2 border-tulip-tree'
                >
                  <div className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden lg:aspect-none group-hover:opacity-75 h-80 sm:h-96 min-h-96">
                      <img
                        src={productImage}
                        alt={offerName}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className='mt-6 flex flex-col gap-3 px-2 pb-1'>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-center text-black">
                        {offerName}
                      </h3>
                      <div className=''>
                        {/* <h4 className='text-black text-lg sm:text-xl font-medium text-end'>Sale ending in 00:23:35</h4> */}
                        <CountdownTimer offerEndTime={7} />
                      </div>
                    </div>
                  </div>
                </NavLink>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
      {/* </div> */}
    </div>
  )
}

export default FlashSalePage

const CountdownTimer = ({ offerEndTime }) => {
  // Calculate the end time in milliseconds 
  const now = new Date();
  const endTime = new Date(now.getTime() + offerEndTime * 24 * 60 * 60 * 1000);

  // Calculate the duration in milliseconds
  const duration = endTime - now;

  const renderer = ({ days, hours, minutes, seconds }) => (
    <h4 className="text-black text-lg sm:text-xl font-medium text-end">
      Sale ending in {days}:{hours}:{minutes}:{seconds}
    </h4>
  );

  return (
    <Countdown
      date={Date.now() + duration} // Pass the end time as a Date object
      renderer={renderer} // Render function to display the timer
    />
  );
};
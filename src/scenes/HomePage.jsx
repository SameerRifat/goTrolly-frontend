import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import banner1 from '..//images/banner1.jpg'

import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import { products1, reviews } from '../mock_APIs/data'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import { fetchProducts } from '../features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#000',
  },
});

const HomePage = () => {
  const dispatch = useDispatch()
  const { fetProductsLoading, products, fetchProductError } = useSelector((state) => state.product);


  useEffect(() => {
    dispatch(fetchProducts({}))
  }, [])
  return (
    <div className='pb-10'>
      <div className='bg-main h-[40vh] sm:h-[60vh] md:h-[70vh]'>
        <img src={banner1} alt="banner" className='w-full h-full sm:object-center object-cover' />
      </div>
      <div className='px-3 md:px-6 py-4'>
        <div className='flex items-center text-lg md:text-2xl lg:text-3xl font-medium'>
          <NavLink to='/' className='pr-4 border-r-2 border-black'>daily deals</NavLink>
          <NavLink to='/' className='px-4 border-r-2 border-black'>flash sales</NavLink>
          <NavLink to='/' className='px-4'>view more</NavLink>
        </div>
        {fetProductsLoading ? <Loader /> : (
          <div
            className="mt-6"
          >
            <Swiper
              breakpoints={{
                768: {
                  slidesPerView: 3
                },
                1024: {
                  slidesPerView: 4
                }
              }}
              slidesPerView={2}
              spaceBetween={0}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              modules={[Pagination, Autoplay]}
              
            // className=" bg-black p-1 md:p-5 pb-1 mt-6"
            >
              {products.length > 0 ? (
                products
                .filter((product) => product.hasDiscount === true)
                .map((product) => {
                  return (
                    <SwiperSlide key={product._id} className=' bg-black p-1 md:p-4 pb-1'>
                      <ProductCard product={product} />
                    </SwiperSlide>
                  )
                })
              ) :
                <p className='text-center'>No Product Found</p>
              }
            </Swiper>
          </div>
        )}
        {/* <div className="mt-6 grid gap-4 sm:gap-x-6 gap-y-6 sm:gap-y-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8 bg-black p-1 md:p-5 pb-1">
          {products.length > 0 ? (
            products.map((product) => {
              return <ProductCard key={product._id} product={product} />
            })
          ) :
            <p className='text-center'>No Product Found</p>
          }
        </div> */}
        <div className=''>
          <h2 className='text-center text-3xl font-medium py-6'>Customer Rievews</h2>
          <div className='grid gap-4 sm:gap-x-6 gap-y-6 sm:gap-y-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {reviews.map((review, ind) => {
              const { _id, name, rating, comment, productImage } = review
              const options = {
                value: rating,
                readOnly: true,
                precision: 0.5
              }
              return (
                <div key={_id} className="border-[3px] border-tulip-tree flex items-center gap-4 p-2 pr-0">
                  <div className="aspect-h-1 aspect-w-1 overflow-hidden lg:aspect-none group-hover:opacity-75 w-60 h-32 min-h-60">
                    <img
                      src={productImage}
                      alt={name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <h2 className='text-xl md:text-2xl text-black font-medium'>{name}</h2>
                      <StyledRating {...options} size='' className='text-black' />
                      {/* <Rating {...options} size='small' className='text-black' /> */}
                    </div>
                    <p className='text-sm font-medium leading-4'>{comment}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
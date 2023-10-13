import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import ProductCard from '../../components/ProductCard'
import banner2 from '../../images/banner2.png'
import banner2Cameras from '../../images/banner2.jpg'
import banner5 from '../../images/banner5.jpg'
import banner4 from '../../images/banner4.jpg'
import watch from '../../images/watch.jpg'

import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import { products1, topSelling } from '../../mock_APIs/data'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import { fetchProducts, getAdminProducts } from '../../features/product/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#000',
  },
});

const TopSelling = () => {
  const dispatch = useDispatch()
  const { fetProductsLoading, products, fetchProductError } = useSelector((state) => state.product);
  const { getAdminProductsLoading, adminProducts, getAdminProductsError } = useSelector((state) => state.product)


  useEffect(() => {
    dispatch(fetchProducts({}))
    dispatch(getAdminProducts())
  }, [])

  return (
    <div className='pb-12 sm:pb-16'>
      <div className='bg-black relative'>
        <div className='bg-black sm:h-[50vh] md:h-[75vh] w-full lg:w-2/3'>
          <img src={banner2} alt="banner" className='w-full h-full sm:object-center object-cover' />
        </div>
        <div className='absolute top-8 md:top-20 right-16'>
          <h1 className='text-2xl sm:text-3xl md:text-6xl xl:text-7xl mb-3 md:mb-7 textStyle'>featured products</h1>
          <h2 className='text-main text-xl sm:text-2xl md:text-3xl lg:text-4xl'>Order Yours Now!</h2>
        </div>
      </div>
      {fetProductsLoading || getAdminProductsLoading ? <Loader /> : (
        <>
          <div
            className="px-3 md:px-6 py-3 pt-4 mt-6 grid gap-x-3 sm:gap-x-6 gap-y-4 sm:gap-y-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8 bg-mustard"
          >
            {adminProducts.length > 0 ? (
              adminProducts
                .filter((product) => product.category.category === 'top selling')
                .map((product) => (
                  <ProductCard product={product} isTopSelling key={product._id} />
                ))
            ) : (
              <p className="text-center">No Product Found</p>
            )}
          </div>
          <div className='px-3 md:px-6 py-4'>
            <div className='flex items-center justify-center text-lg md:text-2xl lg:text-3xl font-medium'>
              <h2 className='text-lg md:text-2xl lg:text-3xl font-medium'>Last Chance to buy</h2>
            </div>
            <div
              // className="mt-6 grid gap-4 sm:gap-x-6 gap-y-6 sm:gap-y-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8 bg-black p-1 md:p-5 pb-1"
              // className=" bg-black p-1 md:p-5 pb-1 mt-6"
              className="mt-4"
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
                    if (product.hasDiscount) {
                      return (
                        <SwiperSlide key={product._id} className=' bg-black p-1 md:p-4 pb-1'>
                          <ProductCard product={product} />
                        </SwiperSlide>
                      )
                    }
                  })
                ) :
                  <p className='text-center'>No Product Found</p>
                }
              </Swiper>
            </div>
          </div>
        </>
      )}
      <div>
        <div className='flex items-center justify-center text-lg md:text-2xl lg:text-3xl font-medium'>
          <h2 className='text-lg md:text-2xl lg:text-3xl font-medium'>Shop by categories</h2>
        </div>
        <div className='mt-8 h-[280px] md:h-[330px] bg-black flex justify-between relative'>
          <div className='h-full w-[35%] sm:w-[45%] flex'>
            <div className='w-full sm:w-1/2 h-[280px] md:h-[330px]'>
              <img src={banner5} alt="banner" className='object-center object-cover w-full h-full' />
            </div>
            <div className='hidden sm:block sm:w-1/2 h-[280px] md:h-[330px]'>
              <img src={banner4} alt="banner" className='object-center object-cover w-full h-full' />
            </div>
          </div>
          <div className='w-[25%] sm:w-[20%] h-[280px] md:h-[330px]'>
            <img src={watch} alt="banner" className='object-center object-cover w-full h-full' />
          </div>
          <div className='w-[45%] sm:w-[40%] h-[310px] md:h-[370px] absolute top-1/2 right-[19%] -translate-y-1/2 border-4 border-main'>
            <img src={banner2Cameras} alt="banner" className='object-center object-cover w-full h-full' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopSelling
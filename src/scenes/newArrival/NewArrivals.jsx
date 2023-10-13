import React from 'react'
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import banner3 from '../..//images/banner3.jpg'
import audionicEarPhones from '../..//images/audionic-ear-phones.jpg'
import phoneCase1 from '../..//images/phone-case1.jpg'
import phoneCase2 from '../..//images/phone-case2.jpg'
import { NavLink } from 'react-router-dom';

import { newArrivals, categories } from '../../mock_APIs/data';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#000',
    },
    // '& .MuiRating-iconHover': {
    //   color: '#ff3d47',
    // },
});

const NewArrivals = () => {
    return (
        <div className='pb-8 sm:pb-10'>
            <div className='grid gap-4 sm:gap-x-8 gap-y-6 sm:gap-y-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-mustard py-5 pb-6 px-3 md:px-6'>
                {newArrivals.map((product, ind) => {
                    const { _id, productName, rating, price, productImage } = product
                    const options = {
                        value: rating,
                        readOnly: true,
                        precision: 0.5
                    }
                    return (
                        <div key={_id} className="flex items-center gap-4 p-2 bg-white">
                            <div className="aspect-h-1 aspect-w-1 overflow-hidden lg:aspect-none group-hover:opacity-75 w-64 h-52 min-h-48">
                                <img
                                    src={productImage}
                                    alt={productName}
                                    className="h-full w-full object-contain object-center"
                                />
                            </div>
                            <div className="h-full flex flex-col justify-around w-full">
                                <div>
                                    <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-black font-medium'>{productName}</h2>
                                    <StyledRating {...options} size='' className='text-black' />
                                    {/* <Rating {...options} size='small' className='text-black' /> */}
                                </div>
                                <h2 className='text-2xl sm:text-3xl md:text-4xl text-black font-medium'>{`Rs ${price}`}</h2>
                                {/* <div className='flex items-center justify-between'>
                                    <span className='bg-mustard py-0.5 px-2 md:px-3 text-black text-base sm:xl md:text-2xl'>{`- ${offValue}%`}</span>
                                </div> */}
                            </div>
                        </div>
                    )
                })}
            </div>
            <h2 className='text-center my-5 text-2xl sm:text-3xl font-mediumf'>Trending now</h2>
            <div className='flex flex-col gap-10'>
                <div className='w-full h-[400px] md:h-[350px] bg-black grid grid-cols-1 md:grid-cols-2'>
                    <div className=''>
                        <img src={banner3} alt="banner" className='object-center object-cover w-full h-full' />
                    </div>
                    <div className='flex items-center justify-center md:justify-start'>
                        <div className='text-center md:text-start'>
                            <h1 className='text-yellow text-4xl md:text-6xl xl:text-7xl mb-3 md:mb-7 textStyle'>Samsung phones</h1>
                            <h2 className='text-main text-2xl md:text-3xl lg:text-4xl'>only 7 left in stock</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-[420px] sm:h-[380px] bg-mustard grid grid-cols-1 sm:grid-cols-5 my-6'>
                <div className='col-span-3 flex items-start sm:items-center justify-center order-2 sm:order-1 h-[100%]'>
                    <div>
                        <h1 className=' text-broom text-3xl sm:text-4xl md:5xl lg:text-6xl xl:text-7xl mb-3 md:mb-7 textStyle2 pl-1'>Audionic ear phones</h1>
                        <h2 className='text-black text-2xl md:text-3xl lg:text-4xl pl-1'>owned by 79k people now!</h2>
                    </div>
                </div>
                <div className='h-[280px] sm:h-[380px] col-span-2 order-1 sm:order-2'>
                    <img src={audionicEarPhones} alt="banner" className='object-center object-cover lg:object-contain w-full h-full' />
                </div>
            </div>
            <div className='w-full h-[350px] md:h-[380px] bg-black flex flex-col md:flex-row justify-between relative mb-6'>
                <div className=' w-full h-full md:w-[44%]'>
                    <img src={phoneCase1} alt="phone case" className='w-full h-full object-center object-cover' />
                </div>
                <div className='hidden md:block h-full w-[44%]'>
                    <img src={phoneCase2} alt="phone case" className='w-full h-full object-center object-cover' />
                </div>
                <div className='md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 text-center block bg-black md:bg-transparent py-2 md:pb-0'>
                    <h1 className='text-yellow text-4xl md:text-6xl xl:text-7xl mb-3 md:mb-7 textStyle'>Phone Cases</h1>
                    <h2 className='text-main text-2xl md:text-3xl lg:text-4xl'>Owned by 150k people now!</h2>
                </div>
            </div>

            {/* Categories */}
            <h2 className='text-center text-2xl sm:text-3xl md:text-4xl font-medium mt-4'>More offers</h2>
            <div className='grid gap-3 sm:gap-x-4 md:gap-x-6 lg:gap-x-9 gap-y-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-5 pb-6 px-3 md:px-6'>
                {categories.map((category, ind) => {
                    const { _id, categoryImage, categoryName} = category
                    return (
                        <NavLink key={_id} to={`#`}
                        className=' text-white bg-mustard border-2 border-tulip-tree'
                        >
                            <div className="group relative">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden lg:aspect-none group-hover:opacity-75 h-80 sm:h-96 min-h-96">
                                    <img
                                        src={categoryImage}
                                        alt={categoryName}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className='text-center my-6'>
                                    <h3 className="text-2xl md:text-3xl lg:text-5xl font-medium text-center text-black">
                                        {categoryName}
                                    </h3>
                                </div>
                            </div>
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
}

export default NewArrivals
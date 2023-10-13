import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Rating from '@mui/material/Rating';
// import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
const backendUrl = import.meta.env.VITE_REACT_APP_API_URL;

const ProductCard = ({ product, isTopSelling=false }) => {
    const { _id, name, price, images, discountPercentage } = product
    const discountedPrice = price - (price * (discountPercentage / 100));
    const firstImageSrc = images?.[0] ? `${backendUrl}${images[0]}` : '';
    return (
        <NavLink to={`/product/${_id}`} className={`pb-3 ${isTopSelling ? 'text-black' : 'text-white'}`}>
            <div className="group relative flex flex-col">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden lg:aspect-none group-hover:opacity-75 h-64 md:h-96 min-h-64 md:min-h-96">
                    <img
                        src={firstImageSrc}
                        alt={name}
                        className="h-full w-full object-cover object-center"
                    />
                </div>
                <div className='flex flex-col justify-around relative h-[90px]'>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-medium overflow-ellipsis">
                        {name}
                    </h3>
                    <div className='flex gap-1'>
                        <p className={`text-base sm:text-2xl md:text-3xl font-medium ${isTopSelling ? '' : 'line-through'}`}>{`Rs ${price}`}</p>
                        {!isTopSelling && <p className="text-sm sm:text-lg font-medium self-end">{`Rs. ${discountedPrice.toFixed(2)}`}</p>}
                    </div>
                    {!isTopSelling && <span className='bg-tulip-tree py-0.5 px-2 md:px-3 text-black text-sm sm:text-lg md:text-2xl absolute bottom-0.5 sm:bottom-0 right-1'>{`- ${discountPercentage}%`}</span> }
                </div>
            </div>
        </NavLink>
    )
}

export default ProductCard
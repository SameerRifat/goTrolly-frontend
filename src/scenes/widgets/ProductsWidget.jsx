import React from 'react'
import { NavLink } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import { Rating, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const backendUrl = import.meta.env.VITE_REACT_APP_API_URL;

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#000',
    },
});

const ProductsWidget = ({
    products,
    selectedProductType = '',
    setSelectedProductType = '',
    selectedBrand,
    setSelectedBrand,
    price,
    setPrice,
    ratings,
    handleRatingsChange,
    clearAllFilters,
    isSmartPhones = false
}) => {
    const isNonMobileScreens = useMediaQuery('(min-width:640px)');
    return (
        <>
            <div className={`${Object.keys(selectedProductType).length !== 0 || Object.keys(selectedBrand).length !== 0 || ratings !== 0 || price[0] !== 0 || price[1] !== 100000 ? 'flex' : 'hidden'} gap-2 flex-wrap p-2 mb-2`}>
                {price[0] === 0 && price[1] === 100000 ? '' :
                    <div className='bg-broom flex gap-1 items-center py-2 px-2 rounded-3xl'>
                        <span className='text-sm'>{price[0]} - {price[1]}</span>
                        <button onClick={() => setPrice([0, 100000])} className='flex items-center justify-center bg-white rounded-full p-0.5'>
                            <CloseIcon style={{ fontSize: '16px' }} />
                        </button>
                    </div>
                }
                {selectedProductType && Object.keys(selectedProductType).length > 0 &&
                    <div className='bg-broom flex gap-1 items-center py-2 px-2 rounded-3xl'>
                        <span className='text-sm'>{selectedProductType.productType}</span>
                        <button onClick={() => setSelectedProductType({})} className='flex items-center justify-center bg-white rounded-full p-0.5'>
                            <CloseIcon style={{ fontSize: '16px' }} />
                        </button>
                    </div>
                }
                {selectedBrand && Object.keys(selectedBrand).length > 0 &&
                    <div className='bg-broom flex gap-1 items-center py-2 px-2 rounded-3xl'>
                        <span className='text-sm'>{selectedBrand.brandName}</span>
                        <button onClick={() => setSelectedBrand({})} className='flex items-center justify-center bg-white rounded-full p-0.5'>
                            <CloseIcon style={{ fontSize: '16px' }} />
                        </button>
                    </div>
                }
                {ratings !== 0 &&
                    <div className='bg-broom flex gap-1 items-center py-2 px-2 rounded-3xl'>
                        <span className='text-sm'>ratings {ratings} & above</span>
                        <button onClick={() => handleRatingsChange(0)} className='flex items-center justify-center bg-white rounded-full p-0.5'>
                            <CloseIcon style={{ fontSize: '16px' }} />
                        </button>
                    </div>
                }
                {selectedProductType !== '' || selectedBrand !== '' || ratings !== 0 || price[0] !== 0 || price[1] !== 100000 ?
                    <button onClick={clearAllFilters} className='bg-mustard text-black text-sm py-1.5 px-2 rounded-lg'>
                        Clear Filters
                    </button>
                    : ''
                }
            </div>
            <div className="grid gap-x-3 sm:gap-x-6 gap-y-5 sm:gap-y-10 grid-cols-2 above-md:grid-cols-3 lg:grid-cols-3 xl:gap-x-8">
                {
                    products && products.length > 0 ? (
                        products && products.map((product) => {
                            const { _id, name, images, price, ratings } = product
                            const options = {
                                value: ratings,
                                readOnly: true,
                                precision: 0.5
                            }
                            return (
                                <NavLink to={`/product/${_id}`} key={_id} className=' bg-white'>
                                    <div className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden lg:aspect-none group-hover:opacity-75 h-[170px] min-h-[170px] sm:h-[200px] sm:min-h-[200px] md:h-[270px] md:min-h-[270px] lg:h-[280px] lg:min-h-[280px] lg:max-h-[280px]">
                                            <img
                                                src={`${backendUrl}${images[0]}`}
                                                alt={name}
                                                className={`h-full w-full ${isSmartPhones ? 'object-contain' : 'object-cover'} object-center`}
                                            />
                                        </div>
                                        <div className='bg-broom py-2 sm:py-4 pl-1 sm:pl-3 flex flex-col gap-1 sm:gap-2 relative'>
                                            <h3 className="text-lg sm:text-2xl md:text-3xl font-medium overflow-ellipsis overflow-hidden whitespace-nowrap">
                                                {name}
                                            </h3>
                                            <StyledRating {...options} size={isNonMobileScreens ? 'medium' : 'small'} className='text-black' />
                                            <span className='text-base sm:text-2xl md:text-3xl font-medium absolute bottom-0.5 md:bottom-2 right-2 sm:right-3'>{`Rs ${price}`}</span>
                                        </div>
                                    </div>
                                </NavLink>
                            )
                        })
                    ) :
                        <p className='text-white text-xl font-medium'>No Product Found</p>
                }
            </div>
        </>
    )
}

export default ProductsWidget
import React, { useEffect, useState } from 'react'
// import { Fragment, useState } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Rating from '@mui/material/Rating';
import { IconButton, useMediaQuery } from '@mui/material';
// import { clearErrors, fetchProductDetails } from '../../features/product/productDetailsSlice'
// import { useAlert } from 'react-alert';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// import { addItemsToCart } from '../../features/cart/cartSlice';
// import ProductCard from './ProductCard';

import chargingCable from '../../images/charging-cable.jpg';
import powerBank from '../../images/power.jpg';
import cables from '../../images/cables.jpg';
import cameraStand from '../../images/camera-stand.jpg';
import watches from '../../images/watches.jpg';
import phoneCase1 from '../../images/phone-case1.jpg';
import phoneCase2 from '../../images/phone-case2.jpg';
import watch from '../../images/watch.jpg';
import earPhones from '../../images/ear-phones.jpg';
import Loader from '../../components/Loader';
import { getProductDetails } from '../../features/product/productSlice';
import { addItemsToCart } from '../../features/cart/cartSlice';
import styled from '@emotion/styled';
const backendUrl = import.meta.env.VITE_REACT_APP_API_URL;

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const imageUrl = 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'

const reviews = [
    {
        id: 1,
        name: 'Hacton Gribbon',
        reviewedAt: 'july 2, 2021',
        rating: 3,
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique necessitatibus omnis, ducimus, expedita ab commodi fugit nisi consequatur perspiciatis modi eum molestiae reiciendis, laboriosam laudantium magni eos quia ipsa earum.'
    },
    {
        id: 2,
        name: 'Hacton Gribbon',
        reviewedAt: 'july 2, 2021',
        rating: 4,
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ducimus, expedita ab commodi fugit nisi consequatur perspiciatis modi eum molestiae reiciendis, laboriosam laudantium magni eos quia ipsa earum.'
    },
    {
        id: 3,
        name: 'Gorgia',
        reviewedAt: 'july 2, 2021',
        rating: 2,
        comment: 'Similique necessitatibus omnis, ducimus, expedita ab commodi fugit nisi consequatur perspiciatis modi eum molestiae reiciendis, laboriosam laudantium magni eos quia ipsa earum.'
    },
    {
        id: 4,
        name: 'Hacton Gribbon',
        reviewedAt: 'july 2, 2021',
        rating: 5,
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique necessitatibus omnis, ducimus, expedita ab commodi fugit nisi consequatur perspiciatis modi eum molestiae reiciendis, laboriosam laudantium magni eos quia ipsa earum.'
    }
]

const options = {
    size: 'medium',
    value: 4,
    readOnly: true,
    precision: 0.5
}

const productImages = [
    {
        id: 1,
        image: chargingCable,
    },
    {
        id: 2,
        image: powerBank,
    },
    {
        id: 3,
        image: cables,
    },
    {
        id: 4,
        image: watches,
    },
    {
        id: 5,
        image: earPhones,
    },
]

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#000',
    },
});

const ProductDetails = () => {
    const isNonMobileScreens = useMediaQuery('(min-width:640px)');
    const { id } = useParams();
    const dispatch = useDispatch();
    const { getProductDetailsLoading, productDetails, relatedProducts, getProductDetailsError } = useSelector((state) => state.product)
    const { user } = useSelector((state) => state.user)
    const [quantity, setQuantity] = useState(1)
    const [mainImage, setMainImage] = useState('')
    const [selectedColor, setSelectedColor] = useState('')
    const increaseQuantity = (e) => {
        e.preventDefault()
        if (productDetails.stock <= quantity) return
        const qty = quantity + 1
        setQuantity(qty)
    }
    const decreaseQuantity = (e) => {
        e.preventDefault()
        if (quantity <= 1) return
        const qty = quantity - 1
        setQuantity(qty)
    }
    const handleSubmit = (e) => {
        const cartData = {
            id,
            quantity,
            color: selectedColor && selectedColor
        }
        e.preventDefault()
        dispatch(addItemsToCart(cartData))
        toast.success('Item added to cart', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    // useEffect(() => {
    //     if (product) {
    //         setMainImage(product.images ? product.images[0] : {})
    //         setSelectedColor(product.colors ? product.colors[0] : {})
    //         setSelectedSize(product.sizes ? product.sizes[0] : {})
    //     }
    // }, [product])
    useEffect(() => {
        if (Object.keys(productDetails).length > 0) {
            setMainImage(productDetails.images.length > 0 ? productDetails.images[0] : '')
            setSelectedColor(productDetails.colors.length > 0 ? productDetails.colors[0] : '')
        }
    }, [productDetails])
    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch, id])

    return (
        <>
            {getProductDetailsLoading ? <Loader /> :
                <>
                    <div className="relative flex w-full items-center overflow-hidden bg-white px-4 sm:px-6 lg:px-28 py-10">
                        {Object.keys(productDetails).length > 0 && (
                            <>
                                <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 sm:gap-x-8 md:gap-x-14 lg:gap-x-20">
                                    <div className='sm:col-span-4 lg:col-span-5'>
                                        <div className="aspect-h-2 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 border border-main shadow-sm">
                                            <img src={`${backendUrl}${mainImage}`} alt='product image' className="w-full h-full object-cover object-center" />
                                        </div>
                                        <div className='mt-2 grid grid-cols-3 lg:grid-cols-4 gap-2'>
                                            {productDetails.images.map((img, ind) => {
                                                return (
                                                    <div key={ind} onClick={() => setMainImage(img)} className="aspect-w-1 w-full overflow-hidden rounded-md h-24 cursor-pointer bg-gray-100 border border-main shadow-sm">
                                                        <img
                                                            src={`${backendUrl}${img}`}
                                                            alt={productDetails.name}
                                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="sm:col-span-8 lg:col-span-7">
                                        <h2 className="text-2xl md:text-3xl font-medium text-black sm:pr-12">{productDetails.name}</h2>

                                        <section aria-labelledby="information-heading" className="mt-2">
                                            <h3 id="information-heading" className="sr-only">
                                                Product information
                                            </h3>

                                            <p className="text-lg sm:text-2xl font-medium sm:font-semibold text-main">Rs. {productDetails.price}</p>

                                            <div className="mt-6">
                                                <h4 className="sr-only">Reviews</h4>
                                                <div className="flex items-center">
                                                    <Rating
                                                        size='medium'
                                                        value={productDetails.ratings}
                                                        readOnly
                                                        precision='0.5'
                                                    />
                                                    <p className="sr-only">{productDetails.ratings} out of 5 stars</p>
                                                    <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                                        {productDetails.numOfReviews} reviews
                                                    </a>
                                                </div>
                                            </div>
                                        </section>

                                        <section aria-labelledby="options-heading" className="mt-10">
                                            <h3 id="options-heading" className="sr-only">
                                                Product options
                                            </h3>

                                            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                                                {productDetails.colors.length > 0 &&
                                                    <div>
                                                        <h4 className="text-sm font-semibold text-gray-600">Color:</h4>

                                                        <RadioGroup value={selectedColor} onChange={setSelectedColor} className="my-4">
                                                            <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                                            <span className="flex items-center space-x-3">
                                                                {productDetails.colors.map((color, ind) => (
                                                                    <RadioGroup.Option
                                                                        key={ind}
                                                                        value={color}
                                                                        className={({ active, checked }) =>
                                                                            classNames(
                                                                                active && checked ? 'ring ring-offset-1' : '',
                                                                                !active && checked ? 'ring-2' : '',
                                                                                'focus:outline-none rounded-sm'
                                                                            )
                                                                        }
                                                                    >
                                                                        <RadioGroup.Label as="div" className="sr-only">
                                                                            <img src={`${backendUrl}${color}`} alt='color images' />
                                                                        </RadioGroup.Label>
                                                                        <div className="aspect-w-1 min-w-[64px] overflow-hidden h-16 cursor-pointer bg-gray-100 border border-broom">
                                                                            <img
                                                                                src={`${backendUrl}${color}`}
                                                                                alt='product colors preview'
                                                                                className="h-full w-full object-cover object-center"
                                                                            />
                                                                        </div>
                                                                    </RadioGroup.Option>
                                                                ))}
                                                            </span>
                                                        </RadioGroup>
                                                    </div>
                                                }

                                                <div className='py-5 mb-2 flex items-center gap-7 border-y border-main'>
                                                    <div className='border border-gray-200 rounded-sm'>
                                                        <button onClick={decreaseQuantity} className='bg-gray-100 p-2 hover:bg-gray-200 transition-all'>
                                                            <RemoveIcon />
                                                        </button>
                                                        <input type="number" readOnly value={quantity} className='border-none w-14 text-center p-1 pl-4' />
                                                        <button onClick={increaseQuantity} className='bg-gray-100 p-2 hover:bg-gray-200 transition-all'>
                                                            <AddIcon />
                                                        </button>
                                                    </div>
                                                    <button type='submit' disabled={5 < 1 ? true : false} className='font-medium bg-broom py-3 px-7 text-black hover:scale-105 hover:shadow-md shadow-sm'>Add to Cart</button>
                                                </div>
                                                <p>
                                                    Status:
                                                    <span className={productDetails.stock < 1 ? "text-red-500" : "text-green-500"}>
                                                        {productDetails.stock < 1 ? " Out of Stock" : " In Stock"}
                                                    </span>
                                                </p>
                                                {/* <p className='my-4'> <span className='font-medium'>Description: </span> {productDetails.description} </p> */}
                                                <p className='my-4'>
                                                    <span className='font-medium'>Description: </span>
                                                    <span dangerouslySetInnerHTML={{ __html: productDetails.description }} />
                                                </p>
                                            </form>
                                        </section>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    {/* <section className='py-6 px-4 sm:px-6 lg:px-28'>
                        <div className='w-full md:w-[80%] lg:w-[60%]'>
                            <h1 className='text-lg font-bold text-gray-600 px-1 border-b-2 border-gray-300 w-fit'>Reviews</h1>
                            {product.reviews.map((review, ind) => {
                                const { _id, name, rating, comment, reviewedAt } = review
                                const options = {
                                    value: rating,
                                    readOnly: true,
                                    precision: 0.5
                                }
                                return (
                                    <div key={_id} className="relative mt-9 flex items-center gap-x-4 border-b last:border-b-0 border-gray-200 pb-4">
                                        <img
                                            src={user?.avatar?.url ? user.avatar.url : "./images/profile.png"}
                                            alt="avatar"
                                            className="h-12 w-12 flex-none rounded-full bg-gray-50 self-start"
                                        />
                                        <div className="text-sm leading-6">
                                            <p className="font-semibold text-gray-900">
                                                {name}
                                            </p>
                                            <p>{reviewedAt.slice(0, 10)}</p>
                                            <Rating {...options} size='small' className='my-3' />
                                            <p>{comment}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                    */}
                    {relatedProducts.length > 0 && (
                        <section className="bg-black">
                            <div className="mx-auto max-w-2xl px-4 py-16 pt-5 sm:px-6 sm:py-24 sm:pt-8 lg:max-w-7xl lg:px-8">
                                <h2 className="text-2xl font-medium tracking-tight text-white">You May Also Like</h2>

                                <div
                                    className="mt-6 grid grid-cols-2 gap-x-3 gap-y-5 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8"
                                    // className="mt-6 grid gap-x-3 sm:gap-x-6 gap-y-5 sm:gap-y-10 grid-cols-2 above-md:grid-cols-3 lg:grid-cols-3 xl:gap-x-8"
                                >
                                    {relatedProducts.map((product) => {
                                        const { _id, name, images, price, ratings } = product
                                        const options = {
                                            value: ratings,
                                            readOnly: true,
                                            precision: 0.5
                                        }
                                        const firstImageSrc = images?.[0] ? `${backendUrl}${images[0]}` : '';
                                        return (
                                            <NavLink to={`/product/${_id}`} key={_id} className=' bg-white'>
                                                <div className="group relative">
                                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden lg:aspect-none group-hover:opacity-75 h-[170px] min-h-[170px] sm:h-[200px] sm:min-h-[200px] md:h-[270px] md:min-h-[270px] lg:h-[280px] lg:min-h-[280px]">
                                                        <img
                                                            src={firstImageSrc}
                                                            alt={name}
                                                            className={`h-full w-full object-cover object-center`}
                                                        />
                                                    </div>
                                                    <div className='bg-broom py-2 sm:py-4 pl-1 sm:pl-3 flex flex-col gap-1 sm:gap-2 relative'>
                                                        <h3 className="text-lg sm:text-2xl md:text-3xl font-medium whitespace-nowrap overflow-hidden overflow-ellipsis">
                                                            {name}
                                                        </h3>
                                                        <StyledRating {...options} size={isNonMobileScreens ? 'medium' : 'small'} className='text-black' />
                                                        <span className='text-base sm:text-2xl md:text-3xl font-medium absolute bottom-0.5 md:bottom-2 right-2 sm:right-3'>{`Rs ${price}`}</span>
                                                    </div>
                                                </div>
                                            </NavLink>
                                        )
                                    })}
                                    {
                                    }
                                </div>
                            </div>
                        </section>
                    )}
                </>
            }
        </>
    )
}

export default ProductDetails
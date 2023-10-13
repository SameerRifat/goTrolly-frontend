import React, { useEffect } from 'react'
import { useState } from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import sp1 from '../../images/m1.jpg';
import sp2 from '../../images/sp2.png';
import sp3 from '../../images/sp3.jpg';
import sp4 from '../../images/m9.jpg';
import sp5 from '../../images/m14.jpg';
import sp6 from '../../images/m12.jpg';
import sp7 from '../../images/m14.jpg';

import { smartPhonesProducts, ratingOptions, smartPhonesBrandOptions } from '../../mock_APIs/data'
import FiltersWidget from '../widgets/FiltersWidget';
import MobileFiltersDialog from '../widgets/MobileFiltersDialog';
import ProductsWidget from '../widgets/ProductsWidget';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { fetchProducts } from '../../features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../../features/brand/brandSlice';
import { getCategories } from '../../features/category/categorySlice';
import Loader from '../../components/Loader';
const backendUrl = import.meta.env.VITE_REACT_APP_API_URL;

const SmartPhones = () => {
    const dispatch = useDispatch()
    const isNonMobileScreens = useMediaQuery('(min-width:640px)');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    let { keyword } = useParams();
    const [selectedProductType, setSelectedProductType] = useState('')
    const [selectedBrand, setSelectedBrand] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 100000])
    const [ratings, setRatings] = useState(0)
    const [order, setOrder] = useState('')
    const [productsToShow, setProductsToShow] = useState([])
    const [brandsToShow, setBrandsToShow] = useState([])
    const { fetProductsLoading, products, fetchProductError } = useSelector((state) => state.product)
    const { getCategoriesLoading, categories, getCategoriesError } = useSelector((state) => state.category)
    const { getBrandsLoading, brands, getBrandsError } = useSelector((state) => state.brand)
    const clearAllFilters = () => {
        setSelectedProductType('')
        setSelectedBrand({})
        setPrice([0, 100000])
        setRatings(0)
    }
    const handleRatingsChange = (option) => {
        setRatings(0)
        setRatings(option);
        setMobileFiltersOpen(false)
        // console.log("ratings: ", ratings)
    }
    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }
    if (!keyword) {
        keyword = ''
    }
    const priceHandler = (event, newValue) => {
        setPrice(newValue);
    }
    const applyPriceFilter = () => {
        // dispatch(fetchProducts(data))
    }
    useEffect(() => {
        dispatch(getCategories());
        dispatch((getBrands()));
    }, [])
    useEffect(() => {
        const data = {
            keyword,
            brand: Object.keys(selectedBrand).length > 0 ? selectedBrand._id : '',
            currentPage,
            price,
            ratings,
            // order
        }
        dispatch(fetchProducts(data))
    }, [dispatch, price, ratings, selectedBrand])

    useEffect(() => {
        const category = categories.find((category) => category.category === 'smart phones');

        if (category) {
            setProductsToShow(products.filter((product) => product.category._id === category._id));
            setBrandsToShow(brands.filter((brand) => brand.categoryId._id === category._id))
        }
    }, [categories, products, brands]);
    return (
        <div className="bg-black min-h-screen">
            <div>
                {/* Mobile filter dialog */}
                <MobileFiltersDialog
                    mobileFiltersOpen={mobileFiltersOpen}
                    setMobileFiltersOpen={setMobileFiltersOpen}
                    brandOptions={brandsToShow}
                    selectedBrand={selectedBrand}
                    setSelectedBrand={setSelectedBrand}
                    price={price}
                    priceHandler={priceHandler}
                    sliderMax='50000'
                    minPrice='RS-2000 - Rs 10000'
                    maxPrice='Rs 10000+'
                    ratingOptions={ratingOptions}
                    ratings={ratings}
                    handleRatingsChange={handleRatingsChange}
                />
                <main className="px-3 md:px-6">
                    <div className='border-b-2 border-b-white flex justify-end items-center pt-5 sm:pt-8 pb-1 sm:pb-2 lg:hidden'>
                        <button
                            type="button"
                            className="-m-2 ml-4 p-2 text-white hover:text-gray-500"
                            onClick={() => setMobileFiltersOpen(true)}
                        >
                            <span className="sr-only">Filters</span>
                            <FilterAltIcon fontSize={isNonMobileScreens ? 'large' : 'small'} />
                        </button>
                    </div>
                    <section aria-labelledby="products-heading" className="pb-24 pt-8">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className=" lg:flex lg:gap-8">
                            {/* Product grid */}
                            <div className="lg:w-[70%]">
                                {fetProductsLoading ? <Loader /> : (
                                    <ProductsWidget
                                        products={productsToShow}
                                        selectedBrand={selectedBrand}
                                        setSelectedBrand={setSelectedBrand}
                                        price={price}
                                        setPrice={setPrice}
                                        ratings={ratings}
                                        handleRatingsChange={handleRatingsChange}
                                        clearAllFilters={clearAllFilters}
                                        isSmartPhones
                                    />
                                )}
                            </div>
                            {/* Filters */}
                            <form className="hidden lg:block lg:w-[30%] lg:h-fit bg-broom py-2 px-5">
                                <FiltersWidget
                                    brandOptions={brandsToShow}
                                    selectedBrand={selectedBrand}
                                    setSelectedBrand={setSelectedBrand}
                                    price={price}
                                    priceHandler={priceHandler}
                                    sliderMax={50000}
                                    minPrice='RS-2000 - Rs 10000'
                                    maxPrice='Rs 10000+'
                                    ratingOptions={ratingOptions}
                                    ratings={ratings}
                                    handleRatingsChange={handleRatingsChange}
                                />
                                <div className='my-3'>
                                    <h5 className='text-2xl font-medium'>Sold out:</h5>
                                    <div className='grid grid-cols-2 gap-6'>
                                        <div className='w-full h-40'>
                                            <img src={sp1} alt="product" className='w-full h-full object-cover object-center' />
                                        </div>
                                        <div className='w-full h-40'>
                                            <img src={sp2} alt="product" className='w-full h-full object-cover object-center' />
                                        </div>
                                        <div className='w-full h-40'>
                                            <img src={sp3} alt="product" className='w-full h-full object-cover object-center' />
                                        </div>
                                        <div className='w-full h-40'>
                                            <img src={sp4} alt="product" className='w-full h-full object-cover object-center' />
                                        </div>
                                    </div>
                                    <div className='w-full h-auto my-6'>
                                        <img src={sp5} alt="product" className='w-full h-auto object-cover object-center' />
                                    </div>
                                    <div className='grid grid-cols-2 gap-6'>
                                        <div className='w-full h-40'>
                                            <img src={sp6} alt="product" className='w-full h-full object-cover object-center' />
                                        </div>
                                        <div className='w-full h-40'>
                                            <img src={sp7} alt="product" className='w-full h-full object-cover object-center' />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default SmartPhones
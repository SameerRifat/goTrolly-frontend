import React, { useEffect } from 'react'
import { useState } from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import chargingCable from '../../images/charging-cable.jpg';
import powerBank from '../../images/power.jpg';
import cables from '../../images/cables.jpg';
import cameraStand from '../../images/camera-stand.jpg';
import watches from '../../images/watches.jpg';
import phoneCase1 from '../../images/phone-case1.jpg';
import phoneCase2 from '../../images/phone-case2.jpg';
import watch from '../../images/watch.jpg';
import earPhones from '../../images/ear-phones.jpg';

import { products, ratingOptions, productTypeOptions, brandOptions } from '../../mock_APIs/data'
import FiltersWidget from '../widgets/FiltersWidget';
import MobileFiltersDialog from '../widgets/MobileFiltersDialog';
import ProductsWidget from '../widgets/ProductsWidget';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { getCategories } from '../../features/category/categorySlice';
import { getProductTypes } from '../../features/productType/productTypeSlice';
import { getBrands } from '../../features/brand/brandSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/product/productSlice';
import Loader from '../../components/Loader';

const ProductsPage = () => {
    const dispatch = useDispatch()
    const isNonMobileScreens = useMediaQuery('(min-width:640px)');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    let { keyword } = useParams();
    const [selectedProductType, setSelectedProductType] = useState('')
    const [selectedBrand, setSelectedBrand] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 100000])
    const [ratings, setRatings] = useState(0)
    const [order, setOrder] = useState('')
    const [productsToShow, setProductsToShow] = useState([])
    const [brandsToShow, setBrandsToShow] = useState([])
    const [productTypesToShow, setProductTypesToShow] = useState([])

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
    const { getCategoriesLoading, categories, getCategoriesError } = useSelector((state) => state.category)
    const { fetProductsLoading, products, fetchProductError } = useSelector((state) => state.product)
    const { getProductTypesLoading, productTypes, getProductTypesError } = useSelector((state) => state.productType)
    const { getBrandsLoading, brands, getBrandsError } = useSelector((state) => state.brand)

    const applyPriceFilter = () => {
        // dispatch(fetchProducts(data))
    }

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getProductTypes());
        dispatch(getBrands());
    }, [])

    useEffect(() => {
        const data = {
            keyword,
            productType: Object.keys(selectedProductType).length > 0 ? selectedProductType._id : '',
            brand: Object.keys(selectedBrand).length > 0 ? selectedBrand._id : '',
            currentPage,
            price,
            ratings,
            // order
        }
        dispatch(fetchProducts(data))
    }, [dispatch, price, ratings, selectedBrand, selectedProductType])


    useEffect(() => {
        const category = categories.find((category) => category.category === 'products');

        if (category) {
            setProductsToShow(products.filter((product) => product.category._id === category._id));
            // console.log('productsToShow: ', products.map((product) => product.category))
            // Now, you can access category in the second useEffect as well
            setProductTypesToShow(productTypes.filter((productType) => productType.categoryId._id === category._id))
            setBrandsToShow(brands.filter((brand) => brand.categoryId._id === category._id))
        }
        console.log('categroy: ', category)
    }, [categories, products, productTypes]);

    return (
        <div className="bg-black min-h-screen">
            <div>
                {/* Mobile filter dialog */}
                <MobileFiltersDialog
                    mobileFiltersOpen={mobileFiltersOpen}
                    setMobileFiltersOpen={setMobileFiltersOpen}
                    productTypeOptions={productTypesToShow}
                    selectedProductType={selectedProductType}
                    setSelectedProductType={setSelectedProductType}
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
                                        selectedProductType={selectedProductType}
                                        setSelectedProductType={setSelectedProductType}
                                        selectedBrand={selectedBrand}
                                        setSelectedBrand={setSelectedBrand}
                                        price={price}
                                        setPrice={setPrice}
                                        ratings={ratings}
                                        handleRatingsChange={handleRatingsChange}
                                        clearAllFilters={clearAllFilters}
                                    />
                                )}
                            </div>
                            {/* Filters */}
                            <form className="hidden lg:block lg:w-[30%] lg:h-fit bg-broom py-2 px-5">
                                <FiltersWidget
                                    productTypeOptions={productTypesToShow}
                                    selectedProductType={selectedProductType}
                                    setSelectedProductType={setSelectedProductType}
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
                                <div>
                                    <h5 className='text-2xl font-medium'>memory</h5>
                                    <div className='mt-2 flex items-center gap-2'>
                                        <span className='bg-black text-broom text-lg font-medium py-1 px-2'>16 gb</span>
                                        <span className='bg-black text-broom text-lg font-medium py-1 px-2'>32 gb</span>
                                        <span className='bg-black text-broom text-lg font-medium py-1 px-2'>62 gb</span>
                                        <span className='bg-black text-broom text-lg font-medium py-1 px-2'>132 gb</span>
                                        <span className='bg-black text-broom text-lg font-medium py-1 px-2'>250 gb</span>
                                    </div>
                                </div>
                                <div className='my-3'>
                                    <h5 className='text-2xl font-medium'>Sold out:</h5>
                                    <div className='grid grid-cols-2 gap-x-6 gap-y-5'>
                                        <div className='w-full h-48'>
                                            <img src={chargingCable} alt="product" className='w-full h-full object-cover object-center' />
                                        </div>
                                        <div className='w-full h-48 max-h-48'>
                                            <img src={powerBank} alt="product" className='w-full h-full object-cover object-center' />
                                        </div>
                                        <div className='w-full h-48 max-h-48'>
                                            <img src={cables} alt="product" className='w-full h-full object-cover object-center' />
                                        </div>
                                        <div className='w-full h-48 max-h-48'>
                                            <img src={cameraStand} alt="product" className='w-full h-full object-cover object-center' />
                                        </div>
                                    </div>
                                    <div className='my-5 w-full h-52 border-4 border-white'>
                                        <img src={watches} alt="" className='w-full h-full object-cover object-center' />
                                    </div>
                                    <div className='grid grid-cols-2 gap-x-6 gap-y-5'>
                                        <div className='w-full h-32 border-4 border-white'>
                                            <img src={phoneCase1} alt="product" className='w-full h-full object-cover object-center' />
                                        </div>
                                        <div className='w-full h-32 max-h-48 border-4 border-white'>
                                            <img src={phoneCase2} alt="product" className='w-full h-full object-cover object-center' />
                                        </div>
                                        <div className='w-full h-32 max-h-48 border-4 border-white'>
                                            <img src={watch} alt="product" className='w-full h-full object-cover object-center' />
                                        </div>
                                        <div className='w-full h-32 max-h-48 border-4 border-white'>
                                            <img src={earPhones} alt="product" className='w-full h-full object-cover object-center' />
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

export default ProductsPage
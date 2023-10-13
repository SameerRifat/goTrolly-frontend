import React, { useEffect } from 'react'
import { useState } from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import audioSold1 from '../../images/audio-sold1.jpg';
import audioSold2 from '../../images/audio-sold2.jpg';
import audioSold3 from '../../images/audio-sold3.jpg';
import audioSold4 from '../../images/audio-sold4.jpg';
import audioSold5 from '../../images/audio-sold5.jpg';
import audioSold6 from '../../images/audio-sold6.jpg';
import audioSold7 from '../../images/audio-sold7.jpg';
import audioSold8 from '../../images/audio-sold8.jpg';

import { chargingAndPower, ratingOptions, chargingAndPowerProductTypeOptions } from '../../mock_APIs/data'
import FiltersWidget from '../widgets/FiltersWidget';
import MobileFiltersDialog from '../widgets/MobileFiltersDialog';
import ProductsWidget from '../widgets/ProductsWidget';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { fetchProducts } from '../../features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { getCategories } from '../../features/category/categorySlice';
import { getProductTypes } from '../../features/productType/productTypeSlice';

const ChargingAndPower = () => {
  const dispatch = useDispatch()
  const isNonMobileScreens = useMediaQuery('(min-width:640px)');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  let { keyword } = useParams();
  const [selectedProductType, setSelectedProductType] = useState({})
  const [selectedBrand, setSelectedBrand] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([0, 100000])
  const [ratings, setRatings] = useState(0)
  const [order, setOrder] = useState('')
  const [productsToShow, setProductsToShow] = useState([])
  const [productTypesToShow, setProductTypesToShow] = useState([])
  const { fetProductsLoading, products, fetchProductError } = useSelector((state) => state.product)
  const { getCategoriesLoading, categories, getCategoriesError } = useSelector((state) => state.category)
  const { getProductTypesLoading, productTypes, getProductTypesError } = useSelector((state) => state.productType)
  const { getBrandsLoading, brands, getBrandsError } = useSelector((state) => state.brand)
  const clearAllFilters = () => {
    setSelectedProductType('')
    setSelectedBrand('')
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
  // const data = {
  //   keyword,
  //   selectedProductType,
  //   selectedBrand,
  //   currentPage,
  //   price,
  //   ratings,
  //   // order
  // }
  const applyPriceFilter = () => {
    // dispatch(fetchProducts(data))
  }
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProductTypes());
  }, [])
  useEffect(() => {
    const data = {
      keyword,
      productType: Object.keys(selectedProductType).length > 0 ? selectedProductType._id : '',
      selectedBrand,
      currentPage,
      price,
      ratings,
      // order
    }
    dispatch(fetchProducts(data))
  }, [dispatch, selectedProductType, price, ratings])
  // const dispatch = useDispatch()
  // useEffect(() => {
  //     dispatch(getAllCategories());
  // }, [])
  // useEffect(() => {
  //     if (error) {
  //         return alert.error(error)
  //     }
  //     // console.log(data)
  //     dispatch(fetchProducts(data))
  // }, [dispatch, error, productCount, keyword, currentPage, price, category, ratings, order])
  // const category = categories.find((category) => category.category === 'charging and power')
  // const productTypesToShow = productTypes.filter((productType) => productType.categoryId._id === category._id)
  // const brandsToShow = brands.filter((brand) => brand.categoryId._id === category._id)
  // const productsToShow = products.filter((product) => product.categoryId._id === category._id)
  // console.log('category: ', category)
  useEffect(() => {
    const category = categories.find((category) => category.category === 'charging and power');

    if (category) {
      setProductsToShow(products.filter((product) => product.category._id === category._id));

      // Now, you can access category in the second useEffect as well
      setProductTypesToShow(productTypes.filter((productType) => productType.categoryId._id === category._id))
    }
  }, [categories, products, productTypes]);
  // console.log('products: ', products)
  // console.log('productsToShow: ', productsToShow)
  // console.log('productTypesToShow: ', productTypesToShow)

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
                {/* {fetProductsLoading ? <Loader /> : (
                  <p className='text-white'>
                  {products && products.length > 0 && products.map((p) => p.name)}
                </p>
                )} */}
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
                {/* {productsToShow && productsToShow.length > 0 ? (
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
                ) : (
                  <p className='text-white text-xl font-medium'>No product found</p>
                )} */}
              </div>
              {/* Filters */}
              <form className="hidden lg:block lg:w-[30%] lg:h-fit bg-broom py-2 px-5">
                <FiltersWidget
                  productTypeOptions={productTypesToShow}
                  selectedProductType={selectedProductType}
                  setSelectedProductType={setSelectedProductType}
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
                  <div className='grid grid-cols-2 gap-x-6 gap-y-5'>
                    <div className='w-full h-auto'>
                      <img src={audioSold1} alt="product" className='w-full h-auto object-cover object-center' />
                    </div>
                    <div className='w-full h-auto'>
                      <img src={audioSold2} alt="product" className='w-full h-auto object-cover object-center' />
                    </div>
                    <div className='w-full h-auto'>
                      <img src={audioSold3} alt="product" className='w-full h-auto object-cover object-center' />
                    </div>
                    <div className='w-full h-auto'>
                      <img src={audioSold4} alt="product" className='w-full h-auto object-cover object-center' />
                    </div>
                    <div className='w-full h-auto'>
                      <img src={audioSold5} alt="product" className='w-full h-auto object-cover object-center' />
                    </div>
                    <div className='w-full h-auto'>
                      <img src={audioSold6} alt="product" className='w-full h-auto object-cover object-center' />
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

export default ChargingAndPower
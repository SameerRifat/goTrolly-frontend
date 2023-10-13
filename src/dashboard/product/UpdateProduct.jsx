import React, { useEffect, useState } from 'react'
import { Form, Formik } from 'formik';
import * as yup from 'yup'
import { Box, Button, FormControl, Grid, MenuItem, Select, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getCategories } from '../../features/category/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../../features/brand/brandSlice';
import { clear_create_product_error, createProduct, create_product_reset, getAdminProducts, getProductDetails, updateProduct, update_product_reset } from '../../features/product/productSlice';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/Loader';
import { getProductTypes } from '../../features/productType/productTypeSlice';
const backendUrl = import.meta.env.VITE_REACT_APP_API_URL;

// let initialValues = {
//   name: "",
//   price: Number,
//   stock: Number,
// }
const productSchema = yup.object().shape({
  name: yup.string().required("required"),
  price: yup.number().positive().integer().required("required"),
  stock: yup.number().positive().integer().required("required"),
})

const UpdateProduct = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([])
  const [category, setCategory] = useState('')
  const [productType, setProductType] = useState('')
  const [brand, setBrand] = useState('')
  const [description, setDescription] = useState('')
  const { getCategoriesLoading, categories } = useSelector((state) => state.category)
  const { updateProductLoading, isProductUpdated, updateProductError, getProductDetailsLoading, productDetails, getProductDetailsError } = useSelector((state) => state.product)
  const { getProductTypesLoading, productTypes, getProductTypesError } = useSelector((state) => state.productType)
  const { getBrandsLoading, brands } = useSelector((state) => state.brand)

  let formData = new FormData();

  const imageChangeEvent = (e) => {
    const files = e.target.files
    setImages([])
    setImagesPreview([])
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      setImages((prevImages) => [...prevImages, file])
    }
    // console.log('images: ', images)
    // console.log('files: ', e.target.files)
    // const files = Array.from(e.target.files);
    // setImages([]);
    const filesArray = Array.from(e.target.files);
    filesArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
        }
      }
      reader.readAsDataURL(file);
    })
  }
  // console.log('images: ', images)
  // console.log('imagesPreview: ', imagesPreview)
  const [colorImages, setColorImages] = useState([]);
  const [colorImagesPreview, setColorImagesPreview] = useState([])
  const ColorImageChangeEvent = (e) => {
    const files = e.target.files
    setColorImages([])
    setColorImagesPreview([])
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      setColorImages((prevImages) => [...prevImages, file])
    }

    const filesArray = Array.from(e.target.files);
    filesArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setColorImagesPreview((old) => [...old, reader.result]);
        }
      }
      reader.readAsDataURL(file);
    })
  }
  const handleFormSubmit = async (values, actions) => {
    const { name, price, stock } = values
    const formData = new FormData();
    formData.append("name", name)
    formData.set("price", price)
    formData.set("description", description)
    formData.set("category", category)
    if (productType) {
      formData.set("productType", productType)
    }
    if (brand) {
      formData.set("brand", brand)
    }
    formData.set("stock", stock)
    if (images && images.length > 0) {
      images.forEach((image, index) => {
        formData.append(`productImages`, image);
      });
    }
    if (colorImages && colorImages.length > 0) {
      colorImages.forEach((image, index) => {
        formData.append(`colorImages`, image);
      });
    }
    // for (const [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }

    // for (let pair of formData) {
    //   console.log(pair[0], pair[1]);
    // }
    dispatch(updateProduct({ id: productDetails._id, formData }))
  }
  useEffect(() => {
    dispatch(getProductDetails(id))
    dispatch(getCategories())
    dispatch(getProductTypes())
    dispatch(getBrands())
  }, [])
  useEffect(() => {
    if (isProductUpdated) {
      toast.success('Product Updated Successfully', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setImages([])
      setColorImages([])
      setColorImagesPreview([])
      setImagesPreview([])
      setCategory('')
      setBrand('')
      // setImage(null)
      dispatch(update_product_reset())
      navigate('/admin/products')
    }
    if (updateProductError) {
      toast.error(updateProductError, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(clear_create_product_error())
    }
  }, [dispatch, isProductUpdated, updateProductError])
  useEffect(() => {
    setDescription(Object.keys(productDetails).length > 0 ? productDetails.description : '')
    setCategory(Object.keys(productDetails).length > 0 ? productDetails.category._id : '')
    setProductType(Object.keys(productDetails).length > 0 ? (productDetails.productType ? productDetails.productType._id : '') : '')
    // setProductType(Object.keys(productDetails).length > 0 ? productDetails.productType._id : '')
    setDescription(Object.keys(productDetails).length > 0 ? productDetails.description : '')
    setImagesPreview(Object.keys(productDetails).length > 0 ? productDetails.images : [])
    setColorImagesPreview(Object.keys(productDetails).length > 0 ? productDetails.colors : [])
    setBrand(Object.keys(productDetails).length > 0 ? (productDetails.brand ? productDetails.brand._id : '') : '');
  }, [productDetails])

  let productTypesToShow = productTypes.filter((productType) => productType.categoryId._id == category) || []
  let brandsToShow = brands.filter((brand) => brand.categoryId._id == category) || []

  return (
    <>
      {getProductDetailsLoading ? <Loader /> : (
        <div className='bg-white p-5'>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={{
              name: Object.keys(productDetails).length > 0 ? productDetails.name : '',
              price: Object.keys(productDetails).length > 0 ? productDetails.price : '',
              stock: Object.keys(productDetails).length > 0 ? productDetails.stock : ''
            }}
            validationSchema={productSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit} encType='multipart/form-data'>
                <Grid container spacing={3}
                >
                  <Grid item sm={12} md={6}>
                    <label htmlFor="email" className="block text-lg uppercase font-medium leading-6 text-black">
                      Name
                    </label>
                    <Box mt='3px'
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: '0px'
                        }
                      }}
                    >
                      <TextField
                        fullWidth
                        size='small'
                        variant='outlined'
                        autoComplete='off'
                        placeholder='Product Name'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        name='name'
                        error={!!touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                      />
                    </Box>
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <label htmlFor="email" className="block text-lg uppercase font-medium leading-6 text-black">
                      category
                    </label>
                    <Box mt='3px'
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: '0px'
                        }
                      }}
                    >
                      <FormControl fullWidth>
                        <Select
                          value={category}
                          size='small'
                          placeholder='Porduct Category'
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          {categories && categories.length > 0 && categories.map((category) => {
                            return (
                              <MenuItem value={category._id}>{category.category}</MenuItem>
                            )
                          })}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <label htmlFor="email" className="block text-lg uppercase font-medium leading-6 text-black">
                      Product Type
                    </label>
                    <Box mt='3px'
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: '0px'
                        }
                      }}
                    >
                      <FormControl fullWidth>
                        <Select
                          value={productType}
                          size='small'
                          placeholder='Porduct Brand'
                          onChange={(e) => setProductType(e.target.value)}
                        >
                          {productTypesToShow && productTypesToShow.length > 0 && productTypesToShow.map((productType) => {
                            return (
                              <MenuItem value={productType._id}>{productType.productType}</MenuItem>
                            )
                          })}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <label htmlFor="email" className="block text-lg uppercase font-medium leading-6 text-black">
                      brand
                    </label>
                    <Box mt='3px'
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: '0px'
                        }
                      }}
                    >
                      <FormControl fullWidth>
                        <Select
                          value={brand}
                          size='small'
                          placeholder='Porduct Brand'
                          onChange={(e) => setBrand(e.target.value)}
                        >
                          {brandsToShow && brandsToShow.length > 0 && brandsToShow.map((brand) => {
                            return (
                              <MenuItem value={brand._id}>{brand.brandName}</MenuItem>
                            )
                          })}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item sm={12} md={6} >
                    <label htmlFor="email" className="block text-lg uppercase font-medium leading-6 text-black">
                      price
                    </label>
                    <Box mt='3px'
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: '0px'
                        }
                      }}
                    >
                      <TextField
                        fullWidth
                        size='small'
                        variant='outlined'
                        autoComplete='off'
                        placeholder='Product price'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.price}
                        name='price'
                        error={!!touched.price && !!errors.price}
                        helperText={touched.price && errors.price}
                      />
                    </Box>
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <label htmlFor="email" className="block text-lg uppercase font-medium leading-6 text-black">
                      stock
                    </label>
                    <Box mt='3px'
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: '0px'
                        }
                      }}
                    >
                      <TextField
                        fullWidth
                        size='small'
                        variant='outlined'
                        autoComplete='off'
                        placeholder='Product Stock'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.stock}
                        name='stock'
                        error={!!touched.stock && !!errors.stock}
                        helperText={touched.stock && errors.stock}
                      />
                    </Box>
                  </Grid>

                  {/* <Grid item sm={12} rowSpan={3}>
                  <div style={{ maxHeight: '300px', overflow: 'auto' }}>
                    <ReactQuill
                      theme="snow"
                      value={values.description}
                      onChange={handleChange}
                    />
                  </div>
                </Grid> */}
                  <Grid item sm={12} lg={8} minHeight='88px'>
                    <div style={{ border: `1px dashed #EAD820`, borderRadius: '8px' }} className='flex gap-2 overflow-x-auto p-2'>
                      {imagesPreview.length > 0 ? (
                        imagesPreview.map((image, ind) => (
                          <div key={ind} className="aspect-w-1 min-w-[80px] overflow-hidden rounded-md h-20 cursor-pointer bg-gray-200 border-2 border-broom">
                            <img
                              src={image.includes('public') ? `${backendUrl}${image}` : image}
                              alt='product colors preview'
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                        ))
                      ) : (
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUc9A3lU2z__DzLc_FaJVc8AKs8SWRzF9ilE7Q-HAhowAjpNndg2uZKcseeYSWRRQowss&usqp=CAU" alt="Placeholder Image" className="h-20 w-20" />
                      )}
                    </div>
                  </Grid>

                  <Grid item sm={12} lg={4}>
                    <Box id='product-images' sx={{
                      '& input::-webkit-file-upload-button': {
                        cursor: 'pointer',
                        width: '100%',
                        maxWidth: '110px',
                        border: 'none',
                        // border: '4px solid red',
                        height: '33px',
                        zIndex: 2,
                        padding: '0 10px',
                        backgroundColor: 'lightgray',
                        transition: 'all 0.4s',
                        overflow: 'hidden'
                      },
                      '& input::-webkit-file-upload-button:hover': {
                        backgroundColor: 'lightgray'
                      }
                    }}>
                      <label htmlFor="images">Select product images</label>
                      <input type="file" name="images" accept='image/*' multiple onChange={imageChangeEvent} />
                    </Box>
                  </Grid>
                  <Grid item sm={12} lg={8} minHeight='88px'>
                    <div style={{ border: `1px dashed #EAD820`, borderRadius: '8px' }} className='flex gap-2 overflow-x-auto p-2'>
                      {colorImagesPreview.length > 0 ? (
                        colorImagesPreview.map((image, ind) => (
                          <div key={ind} className="aspect-w-1 min-w-[80px] overflow-hidden rounded-md h-20 cursor-pointer bg-gray-200 border-2 border-broom">
                            <img
                              // src={`${backendUrl}${image}`}
                              src={image.includes('public') ? `${backendUrl}${image}` : image}
                              alt='product colors preview'
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                        ))
                      ) : (
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUc9A3lU2z__DzLc_FaJVc8AKs8SWRzF9ilE7Q-HAhowAjpNndg2uZKcseeYSWRRQowss&usqp=CAU" alt="Placeholder Image" className="h-20 w-20" />
                      )}
                    </div>
                  </Grid>
                  <Grid item sm={12} lg={4}>
                    <Box id='product-images' sx={{
                      '& input::-webkit-file-upload-button': {
                        cursor: 'pointer',
                        width: '100%',
                        maxWidth: '110px',
                        border: 'none',
                        height: '33px',
                        zIndex: 2,
                        padding: '0 10px',
                        backgroundColor: 'lightgray',
                        transition: 'all 0.4s'
                      },
                      '& input::-webkit-file-upload-button:hover': {
                        backgroundColor: 'lightgray'
                      }
                    }}>
                      <label htmlFor="colors">Select product colors <span className='text-sm text-mustard'>(optional)</span></label>
                      <input type="file" name="colors" accept='image/*' multiple onChange={ColorImageChangeEvent} />
                    </Box>
                  </Grid>
                </Grid>
                <div className='mt-5'>
                  <label htmlFor="email" className="block text-lg uppercase font-medium leading-6 text-black">
                    Description
                  </label>
                  <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                    style={{ height: '300px' }}
                  />
                </div>
                <Box display='flex' justifyContent='end' mt='70px'>
                  
                  {/* <Button
                    type='submit'
                    sx={{
                      backgroundColor: '#EAD820',
                      color: 'black',
                      ':hover': {
                        bgcolor: '#ead920a6'
                      }
                    }}
                    size='large'
                  >
                    Update product
                  </Button> */}
                  <LoadingButton loading={updateProductLoading} variant="contained"
                    type='submit'
                    sx={{
                      backgroundColor: '#EAD820',
                      color: 'black',
                      ':hover': {
                        bgcolor: '#ead920a6'
                      },
                      ":disabled": {
                        bgcolor: '#ead920ed',
                      }
                    }}
                  >
                    Update Product
                  </LoadingButton>
                </Box>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  )
}

export default UpdateProduct
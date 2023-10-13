import React, { useEffect, useState } from 'react'
import { dashboardProducts } from '../../mock_APIs/data'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, InputLabel, MenuItem, Select, useMediaQuery } from '@mui/material'
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clear_delete_product_error, clear_get_admin_products_error, deleteProducts, delete_product_reset, getAdminProducts } from '../../features/product/productSlice';
import { toast } from 'react-toastify';
const backendUrl = import.meta.env.VITE_REACT_APP_API_URL;
import Loader from '../../components/Loader'
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';

const ProductsGrid = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isNonMobileScreens = useMediaQuery('(min-width:600px)');
  const [category, setCategory] = React.useState('');
  const [keyword, setKeyword] = React.useState('');
  const [productId, setProductId] = useState('');
  const submitHandler = () => {
    alert('keyword: ' + keyword)
    setKeyword('')
  }
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const [lastAdded, setLastAdded] = React.useState('');

  const handleLastAddedChange = (event) => {
    setLastAdded(event.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (id) => {
    setProductId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { getAdminProductsLoading, adminProducts, getAdminProductsError, deleteProductLoading, isProductDeleted, deleteProductError } = useSelector((state) => state.product)
  useEffect(() => {
    dispatch(getAdminProducts())
  }, [dispatch])
  useEffect(() => {
    if (getAdminProductsError) {
      toast.error(getAdminProductsError, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(clear_get_admin_products_error())
    }
  }, [dispatch, getAdminProductsError])

  useEffect(() => {
    if (isProductDeleted) {
      toast.success('Products Deleted Successfully', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setProductId('')
      dispatch(delete_product_reset())
      setOpen(false)
    }
    if (deleteProductError) {
      toast.error(deleteProductError, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(clear_delete_product_error())
    }
  }, [dispatch, isProductDeleted, deleteProductError])

  return (
    <>
      <div className='text-white'>
        <div>
          <h2 className='text-broom text-2xl sm:text-3xl font-medium'>products grid</h2>
          <div className='flex h-9 min-h-[36px] border-2  sm:border-[3px] md:border-4 border-broom my-4'>
            <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} className='flex-1 w-[90%] outline-none border-none text-black p-2' />
            <button type='submit' onClick={submitHandler} className='bg-broom w-[10%] min-w-[70px] text-lg font-medium text-black border-none outline-none'>search</button>
          </div>
          <div className='flex justify-end items-center'>
            <button className='border-2 md:border-[3px] border-broom py-1 px-2 sm:px-4 mr-4 text-broom text-base sm:text-lg font-medium'>export</button>
            <button className='border-2 md:border-[3px] border-broom py-1 px-2 sm:px-4 text-broom text-base sm:text-lg font-medium' onClick={() => navigate('/admin/product')}>create new</button>
          </div>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            gap={isNonMobileScreens ? '20px' : '10px'}
            mb='20px'
          >
            <Box
              sx={{
                '& .MuiFormControl-root': {
                  minWidth: isNonMobileScreens ? '120px' : '100px'
                },
                '& .MuiInputLabel-root': {
                  color: '#EAD820 !important',
                  fontSize: isNonMobileScreens ? '20px' : '15px'
                },
                '& .MuiSvgIcon-root': {
                  color: '#EAD820 !important',
                  fontSize: '40px'
                },
                '& .MuiInput-input': {
                  color: 'white !important',
                  fontSize: isNonMobileScreens ? '16px' : '12px'
                }
              }}
            >
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120, color: 'white' }}>
                <InputLabel id="demo-simple-select-standard-label">category</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={category}
                  onChange={handleChange}
                  label="Category"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Value 1</MenuItem>
                  <MenuItem value={20}>Value 2</MenuItem>
                  <MenuItem value={30}>Value 3</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120, color: 'white' }}>
                <InputLabel id="demo-simple-select-standard-label">last added</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={lastAdded}
                  onChange={handleLastAddedChange}
                  label="Category"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Value 1</MenuItem>
                  <MenuItem value={20}>Value 2</MenuItem>
                  <MenuItem value={30}>Value 3</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box display='flex' alignItems='center' gap='10px'>
              <Tooltip title="grid view">
                <NavLink to="">
                  <ViewModuleIcon fontSize='medium' />
                </NavLink>
              </Tooltip>
              <Tooltip title="table view">
                <NavLink to="/admin/productsList">
                  <TableRowsIcon fontSize='medium' />
                </NavLink>
              </Tooltip>
            </Box>
          </Box>
        </div>
        {getAdminProductsLoading ? <Loader /> : (
          <div className="grid gap-x-3 sm:gap-x-6 gap-y-5 sm:gap-y-10 grid-cols-2 above-md:grid-cols-3 lg:grid-cols-3 xl:gap-x-8">
            {
              adminProducts.length > 0 ? (
                adminProducts.map((product) => {
                  const { _id, name, sold, images } = product
                  return (
                    <div onClick={() => navigate(`/admin/productDetails/${_id}`)} key={_id} className=' bg-white cursor-pointer'>
                      <div className="group relative">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden lg:aspect-none group-hover:opacity-75 h-[170px] min-h-[170px] sm:h-[230px] sm:min-h-[230px] md:h-[270px] md:min-h-[270px] lg:h-[250px] lg:min-h-[250px]">
                          <img
                            src={`${backendUrl}${images[0]}`}
                            alt={name}
                            className={`h-full w-full object-cover object-center`}
                          />
                        </div>
                        <div className='bg-broom flex flex-col justify-around relative h-[100px] w-full overflow-hidden whitespace-nowrap px-3'>
                          <h3 className="text-lg sm:text-2xl md:text-3xl font-medium overflow-ellipsis overflow-hidden text-black">
                            {name}
                          </h3>
                          <span className='text-lg sm:text-2xl font-medium text-black'>{`${sold} sold`}</span>
                          {/* <div className='my-auto pl-2'>
                        <h3 className="text-lg sm:text-2xl md:text-3xl font-medium overflow-ellipsis text-black mb-1.5">
                          {name}
                        </h3>
                        <span className='text-2xl font-medium text-black'>{`${sold} sold`}</span>
                      </div> */}
                          <div className='absolute bottom-1.5 right-1.5 flex items-center'>
                            <div onClick={(e) => e.stopPropagation()}>
                              <button
                                className="border-[1px] sm:border-[3px] border-black px-2 bg-white mr-2 text-black text-sm sm:text-base font-medium"
                                onClick={(e) => { e.stopPropagation(); navigate(`/admin/product/${_id}`) }}
                              // onClick={() => navigate(`/admin/product/${_id}`)}
                              >
                                Edit
                              </button>
                            </div>
                            {/* <button
                          className=' border-[1px] sm:border-[3px] border-black px-2 bg-white mr-2 text-black text-sm sm:text-base font-medium'
                          onClick={(e) => {(e) => e.stopPropagation(); navigate(`/admin/product/${_id}`)}}
                        >
                          Edit
                        </button> */}
                            <button
                              onClick={(e) => { e.stopPropagation(); handleClickOpen(_id) }}
                              className=' border-[1px] sm:border-[3px] border-black px-2 bg-white text-black text-sm sm:text-base font-medium'
                            >
                              delete
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  )
                })
              ) :
                <p className='text-center'>No Product Found</p>
            }
          </div>
        )}
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}
        sx={{
          '& .MuiPaper-root': {
            width: '450px'
          },
          '& .MuiDialogTitle-root': {
            padding: '15px 10px',
            background: '#EAD820',
            color: 'black'
          },
          // '& .MuiDialogContent-root': {
          //     padding: '25px 10px',
          //     background: 'white',
          //     color: 'black',
          //     borderBottom: '1px solid lightGray'
          // },
          '& .MuiDialogActions-root': {
            padding: '12px 10px',
            background: 'white',
          }
        }}
      >
        <DialogTitle className='flex justify-between'>
          <p className='font-medium'>Delete Product</p>
          <button onClick={handleClose}>
            <CloseIcon />
          </button>
        </DialogTitle>
        <DialogContent>
          <Box mt='15px'>
            <p>Are you sure you want to delete the seleted asset?</p>
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions>
          {/* <Button className='bg-broom' variant='outlined' color='warning' onClick={() => dispatch(deleteProducts( [productId] ))}>
            Delete
          </Button> */}
          <LoadingButton loading={deleteProductLoading} variant="contained"
            onClick={() => dispatch(deleteProducts( [productId] ))}
            type='submit'
            sx={{
              backgroundColor: '#EAD820',
              color: 'black',
              ':hover': {
                bgcolor: '#ead920a6'
              },
              ":disabled": {
                bgcolor: '#ead920ed',
              },
              marginRight: '15px'
            }}
          >
            Delete
          </LoadingButton>
          <Button onClick={() => { setOpen(false); setProductId('') }}>
            {/* <ProcessingLoader /> */}
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ProductsGrid
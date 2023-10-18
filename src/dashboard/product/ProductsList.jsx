import React, { useEffect } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Avatar, Badge, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Rating, Tooltip, Typography, styled, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clear_delete_product_error, clear_get_admin_products_error, deleteProducts, delete_product_reset, getAdminProducts } from '../../features/product/productSlice';
import { toast } from 'react-toastify';
import UpdateDiscount from './UpdateDiscountDialog';
import Loader from '../../components/Loader';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
const backendUrl = import.meta.env.VITE_REACT_APP_API_URL;

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    // color: 'white',
    color: '#FFFF00',
  },
});

const ProductsList = () => {
  const isNonMobileScreens = useMediaQuery('(min-width:640px)');
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowsData, setSelectedRowsData] = useState([]);
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
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      // width: 90 
      flex: 1,
      sortable: false,
      minWidth: 210,
    },
    {
      field: 'images',
      headerName: 'Image',
      flex: 1,
      minWidth: 70,
      // disableColumnMenu: true,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <>
            <div className='w-10 h-10'>
              <img src={`${backendUrl}${params.row.images[0]}`} alt={params.row.name} className='w-full h-full object-cover object-center' />
            </div>
          </>
        );
      },
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 200,
      // disableColumnMenu: true,
      sortable: false
    },
    {
      field: 'stock',
      headerName: 'Stock',
      flex: 0.5,
      sortable: false,
      minWidth: 85,
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 0.5,
      minWidth: 90,
      type: 'number',
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'ratings',
      headerName: 'Ratings',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
      minWidth: 200,
      flex: 1,
      renderCell: (params) => {
        const options = {
          value: params.row.ratings,
          // value: 4,
          readOnly: true,
          precision: 0.5
        }
        return (
          <>
            <div className='flex items-center gap-2'>
              <StyledRating {...options} size={isNonMobileScreens ? 'medium' : 'small'}
                emptyIcon={<StarIcon style={{ opacity: 0.8, color: 'white' }} fontSize="inherit" />}
              />
              <span className='text-white font-medium text-xl'>{params.row.ratings}</span>
            </div>
          </>
        );
      },
    },
    {
      field: 'discountPercentage',
      headerName: 'Discount',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
      minWidth: 100,
      flex: 0.5,
      renderCell: (params) => {
        const id = params.row.id;
        return (
          <>
            <Typography color='white'>{params.row.discountPercentage}%</Typography>
          </>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      // flex: 0.7,
      headerAlign: 'right',
      align: 'right',
      flex: 0.5,
      // width: 80,
      minWidth: 90,
      disableColumnMenu: true,
      renderCell: (params) => {
        const id = params.row.id;
        return (
          <>
            <NavLink to={`/admin/product/${id}`} onClick={(event) => event.stopPropagation()}>
              <EditOutlinedIcon size='18' color='white' style={{ color: 'white' }} />
            </NavLink>
          </>
        );
      },
    },
  ];
  const rows = []
  adminProducts && adminProducts.forEach((item, index) => {
    rows.push({
      id: item._id,
      name: item.name,
      images: item.images,
      stock: item.stock,
      price: item.price,
      ratings: item.ratings,
      discountPercentage: item.discountPercentage,
      product: item,
    })
  });
  const handleSelectionModelChange = (newSelection) => {
    setSelectedRows(newSelection)
    setSelectedRows(newSelection);
    const selectedRowData = newSelection.map((selectedRowId) => {
      const selectedRow = rows.find((row) => row.id === selectedRowId);
      return selectedRow;
    });
    setSelectedRowsData(selectedRowData);
  };

  const [discountDialogOpen, setDiscountDialogOpen] = useState(false);
  const discountToggle = () => {
    setDiscountDialogOpen(!discountDialogOpen);
  };
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (id) => {
    setProductId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
      setSelectedRows()
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
      <h2 className='mb-4 font-medium text-2xl text-white'>Products</h2>
      {getAdminProductsLoading ? <Loader /> : (
        <Box
          sx={{
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.336)',
            maxWidth: '100%',
            overflowX: 'auto',
            color: 'white',
            '& .MuiDataGrid-root': {
              border: 'none'
            },
            '& .MuiDataGrid-cellContent': {
              color: 'white'
            },
            '& .MuiDataGrid-columnHeaders': {
              background: '#EAD820',
              borderBottom: 'none',
              borderRadius: '0'
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontSize: '16px',
              color: 'black',
            },
            '& .MuiCheckbox-root': {
              // padding: mdUp ? '9px' : '2px'
              color: 'white'
            },
            '& .MuiTablePagination-root, MuiButtonBase-root': {
              // padding: mdUp ? '9px' : '2px'
              color: 'white'
            },
            // '& .MuiSvgIcon-root': {
            //   width: mdUp ? '24px' : smUp ? '22px' : '20px',
            //   height: mdUp ? '24px' : smUp ? '22px' : '20px',
            // },
          }}
        >
          <div className='flex justify-between items-center p-2 pr-3'>
            <Box display='flex' alignItems='center' gap='20px'>
              <Tooltip title="delete products">
                <IconButton
                  sx={{
                    ":hover": {
                      backgroundColor: '#777777'
                    }
                  }}
                  disabled={selectedRows.length <= 0}
                  onClick={() => setOpen(true)}
                >
                  <DeleteOutlineOutlinedIcon fontSize='medium' style={{ color: 'white' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="set discount">
                <button className='flex items-center gap-1'
                  disabled={selectedRows.length <= 0}
                  onClick={discountToggle}
                >
                  <DiscountOutlinedIcon fontSize='medium' style={{ color: 'white' }} />
                  <Typography color='white'>Set Discount</Typography>
                </button>
              </Tooltip>
            </Box>
            <Box display='flex' alignItems='center' gap='10px'>
              <Tooltip title="grid view">
                <NavLink to="/admin/products">
                  <ViewModuleIcon fontSize='medium' />
                </NavLink>
              </Tooltip>
              <Tooltip title="table view">
                <NavLink to="/admin/productsList">
                  <TableRowsIcon fontSize='medium' />
                </NavLink>
              </Tooltip>
            </Box>
          </div>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={handleSelectionModelChange}
            rowSelectionModel={selectedRows}
            rowHeight={80}
          />
        </Box>
      )}
      <UpdateDiscount modal={discountDialogOpen} toggle={discountToggle} selectedRowData={selectedRowsData} />

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
          <p className='font-medium'>Delete Products</p>
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
          {/* <Button className='bg-broom' variant='outlined' onClick={() => dispatch(deleteProduct(productId))}>
            Delete
          </Button> */}
          <LoadingButton loading={deleteProductLoading} variant="contained"
            onClick={() => dispatch(deleteProducts(selectedRows))}
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

export default ProductsList

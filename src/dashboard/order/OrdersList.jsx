import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Avatar, Badge, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { clear_errors, deleteOrders, getAdminOrders } from '../../features/order/orderSlice';
import MetaData from '../../components/MetaData';
const backendUrl = import.meta.env.VITE_REACT_APP_API_URL;

const OrdersList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowsData, setSelectedRowsData] = useState([]);
  const { getAdminOrdersLoading, adminOrders, getAdminOrdersError } = useSelector((state) => state.order)
  useEffect(() => {
    dispatch(getAdminOrders())
  }, [dispatch])
  useEffect(() => {
    if (getAdminOrdersError) {
      toast.error(getAdminOrdersError, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(clear_errors())
    }
  }, [dispatch, getAdminOrdersError])
  const columns = [
    {
      field: 'id',
      headerName: 'Order ID',
      flex: 1,
      sortable: false,
      minWidth: 210,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 100,
      // cellClassName: (params) => {
      //   return params.row.status === "Delivered" ? "text-green" : "text-red";
      // },
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: "number",
      headerAlign: 'left',
      align: 'left',
      minWidth: 150,
      flex: 0.7,
      sortable: false
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      headerAlign: 'left',
      align: 'left',
      minWidth: 150,
      flex: 0.7,
      // sortable: false,
    },
    {
      field: "date",
      headerName: "Date",
      type: "number",
      headerAlign: 'left',
      align: 'left',
      minWidth: 150,
      flex: 0.7,
      // sortable: false,
      renderCell: (params) => {
        return (
          <>
            <div className='flex items-center gap-4'>
              <p className='text-white'>{params.row.date.slice(0, 10)}</p>
              <p className='text-white text-sm'>{params.row.date.slice(11, 16)}</p>
            </div>
          </>
        )
      }
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
            <NavLink to={`/admin/order/${id}`} onClick={(event) => event.stopPropagation()}>
              <EditOutlinedIcon size='18' color='white' style={{ color: 'white' }} />
            </NavLink>
          </>
        );
      },
    },
  ];
  const rows = []
  adminOrders && adminOrders.forEach((item, index) => {
    rows.push({
      id: item._id,
      status: item.orderStatus,
      itemsQty: item.orderItems.length,
      amount: item.totalPrice,
      date: item.createdAt,
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

  // useEffect(() => {
  //   if (isProductDeleted) {
  //     toast.success('Products Deleted Successfully', {
  //       position: "bottom-center",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //     setSelectedRows()
  //     dispatch(delete_product_reset())
  //     setOpen(false)
  //   }
  //   if (deleteProductError) {
  //     toast.error(deleteProductError, {
  //       position: "bottom-center",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //     dispatch(clear_delete_product_error())
  //   }
  // }, [dispatch, isProductDeleted, deleteProductError])

  return (
    <>
      <MetaData title="All Orders - Admin" />
      <h2 className='mb-4 font-medium text-2xl text-white'>Orders</h2>
      {getAdminOrdersLoading ? <Loader /> : (
        adminOrders.length > 0 ? (
          <Box
            sx={{
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.336)',
              maxWidth: '100%',
              overflowX: 'auto',
              color: 'white',
              '& .MuiDataGrid-root': {
                border: 'none'
              },
              // '& .MuiDataGrid-cellContent': {
              //   color: 'white'
              // },
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
              '& .MuiButtonBase-root.Mui-disabled': {
                // padding: mdUp ? '9px' : '2px'
                color: 'white'
              },
              // '& .MuiSvgIcon-root': {
              //   width: mdUp ? '24px' : smUp ? '22px' : '20px',
              //   height: mdUp ? '24px' : smUp ? '22px' : '20px',
              // },
            }}
          >
            <Box display='flex' alignItems='center' gap='20px' p='10px'>
              <Tooltip title="delete orders">
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
              {/* <Tooltip title="Update Status">
              <button className='flex items-center gap-1'
                disabled={selectedRows.length <= 0}
                onClick={discountToggle}
              >
                <DiscountOutlinedIcon fontSize='medium' style={{ color: 'white' }} />
                <Typography color='white'>Update Status</Typography>
              </button>
            </Tooltip> */}
            </Box>
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
              getCellClassName={(params) => {
                if (params.field === 'status') {
                  return params.value === 'Delivered' ? 'text-green' : params.value === 'Shipped' ? 'text-blue' : 'text-red';
                } else {
                  return 'text-white'
                }
              }}
            />
          </Box>
        ) : (
          <p className='text-white font-medium text-lg text-center'>No Order Found</p>
        )
      )}
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
          <p className='font-medium'>Delete Orders</p>
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
          <LoadingButton loading={false} variant="contained"
            onClick={() => dispatch(deleteOrders(selectedRows))}
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
          <Button onClick={() => { setOpen(false); }}>
            {/* <ProcessingLoader /> */}
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default OrdersList

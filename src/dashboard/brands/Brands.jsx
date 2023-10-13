import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Divider, IconButton, TextField } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ProcessingLoader from '../../components/ProcessingLoader';
import CreateBrand from './CreateBrand';
import { useDispatch, useSelector } from 'react-redux';
import { clear_delete_brand_error, clear_get_brands_error, deleteBrand, delete_brand_reset, getBrands } from '../../features/brand/brandSlice';
import Loader from '../../components/Loader';
import Dropzone from 'react-dropzone';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { toast } from 'react-toastify';
import UpdateBrand from './UpdateBrand';
// import { clear_delete_brand_error, delete_brand_reset } from '../../features/brand/brandSlice';
const backendUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Brands = () => {
    const dispatch = useDispatch()
    const [updateValue, setUpdateValue] = React.useState('');
    const [brandId, setBrandId] = useState('');
    const [keyword, setKeyword] = React.useState('');
    const submitHandler = () => {
        alert('keyword: ' + keyword)
        setKeyword('')
    }

    const [updateBrandOpen, setUpdateBrandOpen] = React.useState(false);
    const [updateBrandData, setUpdateBrandData] = React.useState(null);
    const handleUpdateBrandClickOpen = (row) => {
        setUpdateBrandData(row);
        setUpdateBrandOpen(true);
    };
    const handleUpdateBrandClose = () => {
        setUpdateBrandOpen(false);
    };
    
    //delete category dialog
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = (id) => {
        setBrandId(id);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }

    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const hanleOpenEditDialog = (row) => {
        setBrandId(row._id);
        setUpdateValue(row.category)
        setImage(row.categoryImage)
        setOpenEditDialog(true);
    };
    const { getBrandsLoading, brands, getBrandsError, deleteBrandLoading, isBrandDeleted, deleteBrandError } = useSelector((state) => state.brand)
    useEffect(() => {
        dispatch(getBrands())
    }, [])
    useEffect(() => {
        if (isBrandDeleted) {
            toast.success('Brand Deleted Successfully', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setBrandId('')
            dispatch(delete_brand_reset())
            setOpen(false)

        }
        if (getBrandsError) {
            toast.error(getBrandsError, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(clear_get_brands_error())
        }
        if (deleteBrandError) {
            toast.error(deleteBrandError, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(clear_delete_brand_error())
        }
    }, [dispatch, isBrandDeleted, getBrandsError, deleteBrandError])
    const columns = [
        {
            field: 'id',
            headerName: 'Brand ID',
            minWidth: 120,
            flex: 0.9
        },
        {
            field: 'brandName',
            headerName: 'Brand Name',
            // type: 'number',
            headerAlign: 'left',
            align: 'left',
            minWidth: 150,
            flex: 1
        },
        {
            field: 'category',
            headerName: 'Category',
            // type: 'number',
            headerAlign: 'left',
            align: 'left',
            minWidth: 150,
            flex: 1
        },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            flex: 0.6,
            headerAlign: 'right',
            align: 'right',
            minWidth: 80,
            renderCell: (params) => {
                const id = params.row.id;
                return (
                    <>
                        {/* <NavLink to={`/admin/product/${id}`}>
                            <IconButton><EditOutlinedIcon style={{ color: colors.blueAccent[500] }} /></IconButton>
                        </NavLink> */}
                        {/* <UpdateBrand row={params.row} /> */}
                        <IconButton onClick={() => handleUpdateBrandClickOpen(params.row)}>
                            <EditOutlinedIcon />
                        </IconButton>
                        <IconButton onClick={() => handleClickOpen(id)}>
                            <DeleteOutlineOutlinedIcon color='white' />
                        </IconButton>
                    </>
                );
            },
        },
    ]

    const rows = []
    brands && brands.forEach((item, index) => {
        rows.push({
            id: item._id,
            brandName: item.brandName,
            category: item.categoryId.category,
            categoryId: item.categoryId._id,
        })
    });

    return (
        <>
            <div className='mb-8'>
                <h2 className='text-broom text-2xl sm:text-3xl font-medium'>brands</h2>
                {/* <div className='flex h-9 min-h-[36px] border-2  sm:border-[3px] md:border-4 border-broom my-4'>
                    <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} className='flex-1 w-[90%] outline-none border-none text-black p-2' />
                    <button type='submit' onClick={submitHandler} className='bg-broom w-[10%] min-w-[70px] text-lg font-medium text-black border-none outline-none'>search</button>
                </div> */}
                <div className='flex justify-end items-center'>
                    <button className='border-2 md:border-[3px] border-broom py-1 px-2 sm:px-4 mr-4 text-broom text-base sm:text-lg font-medium'>export</button>
                    {/* <button className='border-2 md:border-[3px] border-broom py-1 px-2 sm:px-4 text-broom text-base sm:text-lg font-medium'>create new</button> */}
                    <CreateBrand />
                </div>
            </div>
            <Box
                mt='10px'
                height='80vh'
                sx={{
                    '& .MuiDataGrid-root': {
                        // border: 'none'
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none'
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        borderBottom: 'none',
                        backgroundColor: '#EAD820'
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontSize: '15px'
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        backgroundColor: 'transparent',
                        color: 'white'
                    },
                    '& .MuiToolbar-gutters ': {
                        color: 'white'
                    },
                    '& .MuiButtonBase-root': {
                        color: 'white'
                    },
                    '& .MuiButtonBase-root:hover': {
                        backgroundColor: '#3B3B3B',
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: '#1F1F1F',
                    },
                    '& .MuiSvgIcon-root': {
                        color: 'white'
                    },
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    slots={{
                        toolbar: GridToolbar
                    }}
                />
            </Box>
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
                    <p className='font-medium'>Delete Category</p>
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
                    <Button className='bg-broom' variant='outlined' color='warning' onClick={() => dispatch(deleteBrand(brandId))}>
                        {/* <ProcessingLoader /> */}
                        Delete
                    </Button>
                    <Button onClick={() => { setOpen(false); setBrandId('') }}>
                        {/* <ProcessingLoader /> */}
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <UpdateBrand row={updateBrandData} updateBrandOpen={updateBrandOpen} handleUpdateBrandClose={handleUpdateBrandClose}/>
        </>
    )
}

export default Brands
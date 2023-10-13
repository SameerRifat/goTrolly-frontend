import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Divider, IconButton, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ProcessingLoader from '../../components/ProcessingLoader';
import CreateCategory from './CreateCategory';
import { useDispatch, useSelector } from 'react-redux';
import { clear_delete_category_error, clear_get_categories_error, deleteCategory, delete_category_reset, getCategories } from '../../features/category/categorySlice';
import Loader from '../../components/Loader';
import Dropzone from 'react-dropzone';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { toast } from 'react-toastify';
import UpdateCategory from './UpdateCategory';
const backendUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Categories = () => {
    const dispatch = useDispatch()
    const [updateValue, setUpdateValue] = React.useState('');
    const [categoryId, setCategoryId] = useState('');
    const [keyword, setKeyword] = React.useState('');
    const [image, setImage] = useState(null)
    const submitHandler = () => {
        alert('keyword: ' + keyword)
        setKeyword('')
    }

    //delete category dialog
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = (id) => {
        setCategoryId(id);
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
        setCategoryId(row._id);
        setUpdateValue(row.category)
        setImage(row.categoryImage)
        setOpenEditDialog(true);
    };
    const { getCategoriesLoading, categories, getCategoriesError, deleteCategoryLoading, isCategoryDeleted, deleteCategoryError } = useSelector((state) => state.category)
    useEffect(() => {
        dispatch(getCategories())
    }, [])
    useEffect(() => {
        if (isCategoryDeleted) {
            toast.success('Category Deleted Successfully', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setCategoryId('')
            dispatch(delete_category_reset())
            setOpen(false)
        }
        if (getCategoriesError) {
            toast.error(getCategoriesError, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(clear_get_categories_error())
        }
        if (deleteCategoryError) {
            toast.error(deleteCategoryError, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(clear_delete_category_error())
        }
    }, [dispatch, isCategoryDeleted, getCategoriesError, deleteCategoryError])
    const columns = [
        {
            field: 'id',
            headerName: 'Category ID',
            minWidth: 120,
            flex: 0.9
        },
        {
            field: 'image',
            headerName: 'Image',
            minWidth: 120,
            flex: 0.7,
            renderCell: (params) => {
                const imageUrl = `${backendUrl}${params.row.image}`;
                return (
                    <img
                        src={imageUrl}
                        alt={params.row.category}
                        className='w-12 h-12 object-center object-cover'
                    />
                );
            }
        },
        {
            field: 'category',
            headerName: 'Category Name',
            type: 'number',
            headerAlign: 'left',
            align: 'left',
            minWidth: 150,
            flex: 1
        },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            flex: 0.4,
            headerAlign: 'right',
            align: 'right',
            minWidth: 40,
            renderCell: (params) => {
                const id = params.row.id;
                return (
                    <>
                        {/* <NavLink to={`/admin/product/${id}`}>
                            <IconButton><EditOutlinedIcon style={{ color: colors.blueAccent[500] }} /></IconButton>
                        </NavLink> */}
                        <UpdateCategory row={params.row} />
                        <IconButton onClick={() => handleClickOpen(id)}>
                            <DeleteOutlineOutlinedIcon style={{}} color='white' />
                        </IconButton>
                    </>
                );
            },
        },
    ]

    const rows = []
    categories && categories.forEach((item, index) => {
        rows.push({
            id: item._id,
            image: item.categoryImage,
            category: item.category,
        })
    });

    return (
        <>
            <div className='mb-8'>
                <h2 className='text-broom text-2xl sm:text-3xl font-medium'>categories</h2>
                {/* <div className='flex h-9 min-h-[36px] border-2  sm:border-[3px] md:border-4 border-broom my-4'>
                    <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} className='flex-1 w-[90%] outline-none border-none text-black p-2' />
                    <button type='submit' onClick={submitHandler} className='bg-broom w-[10%] min-w-[70px] text-lg font-medium text-black border-none outline-none'>search</button>
                </div> */}
                <div className='flex justify-end items-center'>
                    <button className='border-2 md:border-[3px] border-broom py-1 px-2 sm:px-4 mr-4 text-broom text-base sm:text-lg font-medium'>export</button>
                    {/* <button className='border-2 md:border-[3px] border-broom py-1 px-2 sm:px-4 text-broom text-base sm:text-lg font-medium'>create new</button> */}
                    <CreateCategory />
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
                    },
                    '& .MuiLoadingButton-root': {
                        border: '1px solid rgba(237, 108, 2, 0.5)'
                    },
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
                    {/* <Button className='bg-broom' variant='outlined' color='warning' onClick={() => dispatch(deleteCategory(categoryId))}>
                        Delete
                    </Button> */}
                    <LoadingButton loading={deleteCategoryLoading} variant="outlined" color='warning'
                        onClick={() => dispatch(deleteCategory(categoryId))}
                    >
                        Delete
                    </LoadingButton>
                    <Button onClick={() => { setOpen(false); setCategoryId('') }}>
                        {/* <ProcessingLoader /> */}
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Categories
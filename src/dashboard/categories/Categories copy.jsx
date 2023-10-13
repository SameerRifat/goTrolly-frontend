import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Divider, IconButton, TextField } from '@mui/material';
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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const categoriesData = [
    { id: 'c1', category: 'LG' },
    { id: 'c2', category: 'Apple' },
    { id: 'c3', category: 'samsung' },
    { id: 'c4', category: 'oppo' },
    { id: 'c5', category: 'infinix' },
    { id: 'c6', category: 'canon' },
    { id: 'c7', category: 'nokia' },
    { id: 'c8', category: 'sony' },
    { id: 'c9', category: 'redmi' },
    { id: 'c10', category: 'nikon' },
    { id: 'c11', category: 'amazon' },
    { id: 'c12', category: 'amoi' },
    { id: 'c13', category: 'bird' },
    { id: 'c14', category: 'blackberry' },
    { id: 'c15', category: 'huawei' },
    { id: 'c16', category: 'lenovo' },
    { id: 'c17', category: 'realme' },
    { id: 'c18', category: 'sony ericsson' },
    { id: 'c19', category: 'vivo' },
    { id: 'c20', category: 'xiaomi' },
    { id: 'c21', category: 'alcatel' },
    { id: 'c22', category: 'allview' },
];

const Categories = () => {
    const dispatch = useDispatch()
    const [updateValue, setUpdateValue] = React.useState('');
    const [categoryId, setCategoryId] = useState('');
    const [keyword, setKeyword] = React.useState('');
    const [image, setImage] = useState(null)
    const { getCategoriesLoading, categories, getCategoriesError, deleteCategoryLoading, isCategoryDeleted, deleteCategoryError } = useSelector((state) => state.category)
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
    return (
        <>
            <div className='mb-8'>
                <h2 className='text-broom text-2xl sm:text-3xl font-medium'>categories</h2>
                <div className='flex h-9 min-h-[36px] border-2  sm:border-[3px] md:border-4 border-broom my-4'>
                    <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} className='flex-1 w-[90%] outline-none border-none text-black p-2' />
                    <button type='submit' onClick={submitHandler} className='bg-broom w-[10%] min-w-[70px] text-lg font-medium text-black border-none outline-none'>search</button>
                </div>
                <div className='flex justify-end items-center'>
                    <button className='border-2 md:border-[3px] border-broom py-1 px-2 sm:px-4 mr-4 text-broom text-base sm:text-lg font-medium'>export</button>
                    {/* <button className='border-2 md:border-[3px] border-broom py-1 px-2 sm:px-4 text-broom text-base sm:text-lg font-medium'>create new</button> */}
                    <CreateCategory />
                </div>
            </div>
            {/* <img src={`http://localhost:4000/public/assets/1693752318005_info2.jpeg`} alt="img" /> */}
            <Box sx={{
                '& .MuiTableContainer-root': {
                    backgroundColor: 'black',
                },
                '& .MuiTableRow-head .MuiTableCell-head': {
                    color: 'black',
                    fontSize: '18px',
                    borderBottom: 'none'
                },
                '& .MuiTableCell-root': {
                    color: 'white'
                },
                '& .MuiButtonBase-root': {
                    color: 'white'
                },
                '& .MuiTableHead-root': {
                    backgroundColor: '#EAD820',
                    // '&:hover': {
                    //     backgroundColor: 'red', 
                    // },
                },
                '& .MuiTableHead-root .MuiTableRow-root:hover': {
                    backgroundColor: '#ead920ea',
                },
                '& .MuiTableRow-root:hover': {
                    backgroundColor: '#1F1F1F',
                },
                '& .MuiButtonBase-root:hover': {
                    backgroundColor: '#3B3B3B',
                    // color: 'black',
                },

            }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-category="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        minWidth: 120,
                                        flex: 0.7
                                    }}
                                >
                                    ID
                                </TableCell>
                                <TableCell
                                    sx={{
                                        minWidth: 120,
                                        flex: 0.7
                                    }}
                                >
                                    Image
                                </TableCell>
                                <TableCell
                                    sx={{
                                        minWidth: 150,
                                        flex: 1
                                    }}
                                >
                                    Category Name
                                </TableCell>
                                <TableCell align="right"
                                    sx={{
                                        minWidth: 40,
                                        maxWidth: 50,
                                        flex: 0.4
                                    }}
                                >
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {getCategoriesLoading ? <Loader /> : categories.length > 0 && categories.map((row) => {
                                return (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        hover
                                    >
                                        <TableCell component="th" scope="row">
                                            {row._id}
                                        </TableCell>
                                        <TableCell component="th" scope="row" >
                                            <img src={`${backendUrl}${row.categoryImage}`} alt={row.category} className='w-14 h-14 object-center object-cover' />
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.category}
                                        </TableCell>
                                        {categories.length > 0 && (
                                            <TableCell align="right">
                                                {/* <IconButton onClick={() => hanleOpenEditDialog(row)}>
                                                    <EditOutlinedIcon />
                                                </IconButton> */}
                                                <UpdateCategory row={row}/>
                                                <IconButton onClick={() => handleClickOpen(row._id)}>
                                                    <DeleteOutlineOutlinedIcon style={{}} color='white' />
                                                </IconButton>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
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
                    <Button className='bg-broom' variant='outlined' color='warning' onClick={() => dispatch(deleteCategory(categoryId))}>
                        {/* <ProcessingLoader /> */}
                        Delete
                    </Button>
                    <Button onClick={() => { setOpen(false); setCategoryId('') }}>
                        {/* <ProcessingLoader /> */}
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Categories
// import React, { useEffect, useState } from 'react'
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { Box, Button, Divider, IconButton, TextField } from '@mui/material';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// import CloseIcon from '@mui/icons-material/Close';
// import ProcessingLoader from '../../components/ProcessingLoader';
// import CreateCategory from './CreateCategory';
// import { useDispatch, useSelector } from 'react-redux';
// import { clear_delete_category_error, clear_get_categories_error, deleteCategory, delete_category_reset, getCategories } from '../../features/category/categorySlice';
// import Loader from '../../components/Loader';
// import Dropzone from 'react-dropzone';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
// import { toast } from 'react-toastify';
// import UpdateCategory from './UpdateCategory';
// const backendUrl = import.meta.env.VITE_REACT_APP_API_URL;

// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }

// const Categories = () => {
//     const dispatch = useDispatch()
//     const [updateValue, setUpdateValue] = React.useState('');
//     const [categoryId, setCategoryId] = useState('');
//     const [keyword, setKeyword] = React.useState('');
//     const [image, setImage] = useState(null)
//     const { getCategoriesLoading, categories, getCategoriesError, deleteCategoryLoading, isCategoryDeleted, deleteCategoryError } = useSelector((state) => state.category)
//     const submitHandler = () => {
//         alert('keyword: ' + keyword)
//         setKeyword('')
//     }

//     //delete category dialog
//     const [open, setOpen] = React.useState(false);
//     const handleClickOpen = (id) => {
//         setCategoryId(id);
//         setOpen(true);
//     };
//     const handleClose = () => {
//         setOpen(false);
//     };
//     const deleteProductHandler = (id) => {
//         dispatch(deleteProduct(id))
//     }

//     const [openEditDialog, setOpenEditDialog] = React.useState(false);
//     const hanleOpenEditDialog = (row) => {
//         setCategoryId(row._id);
//         setUpdateValue(row.category)
//         setImage(row.categoryImage)
//         setOpenEditDialog(true);
//     };
//     useEffect(() => {
//         dispatch(getCategories())
//     }, [dispatch])
//     useEffect(() => {
//         if (isCategoryDeleted) {
//             toast.success('Category Deleted Successfully', {
//                 position: "bottom-center",
//                 autoClose: 2000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "light",
//             });
//             setCategoryId('')
//             dispatch(delete_category_reset())
//             setOpen(false)
//         }
//         if (getCategoriesError) {
//             toast.error(getCategoriesError, {
//                 position: "bottom-center",
//                 autoClose: 2000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "light",
//             });
//             dispatch(clear_get_categories_error())
//         }
//         if (deleteCategoryError) {
//             toast.error(deleteCategoryError, {
//                 position: "bottom-center",
//                 autoClose: 2000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "light",
//             });
//             dispatch(clear_delete_category_error())
//         }
//     }, [dispatch, isCategoryDeleted, getCategoriesError, deleteCategoryError])
//     return (
//         <>
//             <div className='mb-8'>
//                 <h2 className='text-broom text-2xl sm:text-3xl font-medium'>categories</h2>
//                 <div className='flex h-9 min-h-[36px] border-2  sm:border-[3px] md:border-4 border-broom my-4'>
//                     <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} className='flex-1 w-[90%] outline-none border-none text-black p-2' />
//                     <button type='submit' onClick={submitHandler} className='bg-broom w-[10%] min-w-[70px] text-lg font-medium text-black border-none outline-none'>search</button>
//                 </div>
//                 <div className='flex justify-end items-center'>
//                     <button className='border-2 md:border-[3px] border-broom py-1 px-2 sm:px-4 mr-4 text-broom text-base sm:text-lg font-medium'>export</button>
//                     {/* <button className='border-2 md:border-[3px] border-broom py-1 px-2 sm:px-4 text-broom text-base sm:text-lg font-medium'>create new</button> */}
//                     <CreateCategory />
//                 </div>
//             </div>
//             {/* <img src={`http://localhost:4000/public/assets/1693752318005_info2.jpeg`} alt="img" /> */}
//             <Box sx={{
//                 '& .MuiTableContainer-root': {
//                     backgroundColor: 'black',
//                 },
//                 '& .MuiTableRow-head .MuiTableCell-head': {
//                     color: 'black',
//                     fontSize: '18px',
//                     borderBottom: 'none'
//                 },
//                 '& .MuiTableCell-root': {
//                     color: 'white'
//                 },
//                 '& .MuiButtonBase-root': {
//                     color: 'white'
//                 },
//                 '& .MuiTableHead-root': {
//                     backgroundColor: '#EAD820',
//                     // '&:hover': {
//                     //     backgroundColor: 'red', 
//                     // },
//                 },
//                 '& .MuiTableHead-root .MuiTableRow-root:hover': {
//                     backgroundColor: '#ead920ea',
//                 },
//                 '& .MuiTableRow-root:hover': {
//                     backgroundColor: '#1F1F1F',
//                 },
//                 '& .MuiButtonBase-root:hover': {
//                     backgroundColor: '#3B3B3B',
//                     // color: 'black',
//                 },

//             }}>
//                 <TableContainer component={Paper}>
//                     <Table sx={{ minWidth: 650 }} aria-category="simple table">
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell
//                                     sx={{
//                                         minWidth: 120,
//                                         flex: 0.7
//                                     }}
//                                 >
//                                     ID
//                                 </TableCell>
//                                 <TableCell
//                                     sx={{
//                                         minWidth: 120,
//                                         flex: 0.7
//                                     }}
//                                 >
//                                     Image
//                                 </TableCell>
//                                 <TableCell
//                                     sx={{
//                                         minWidth: 150,
//                                         flex: 1
//                                     }}
//                                 >
//                                     Category Name
//                                 </TableCell>
//                                 <TableCell align="right"
//                                     sx={{
//                                         minWidth: 40,
//                                         maxWidth: 50,
//                                         flex: 0.4
//                                     }}
//                                 >
//                                     Actions
//                                 </TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {getCategoriesLoading ? <Loader /> : categories.length > 0 && categories.map((row) => {
//                                 return (
//                                     <TableRow
//                                         key={row._id}
//                                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                                         hover
//                                     >
//                                         <TableCell component="th" scope="row">
//                                             {row._id}
//                                         </TableCell>
//                                         <TableCell component="th" scope="row" >
//                                             <img src={`${backendUrl}${row.categoryImage}`} alt={row.category} className='w-14 h-14 object-center object-cover' />
//                                         </TableCell>
//                                         <TableCell component="th" scope="row">
//                                             {row.category}
//                                         </TableCell>
//                                         {categories.length > 0 && (
//                                             <TableCell align="right">
//                                                 {/* <IconButton onClick={() => hanleOpenEditDialog(row)}>
//                                                     <EditOutlinedIcon />
//                                                 </IconButton> */}
//                                                 <UpdateCategory row={row}/>
//                                                 <IconButton onClick={() => handleClickOpen(row._id)}>
//                                                     <DeleteOutlineOutlinedIcon style={{}} color='white' />
//                                                 </IconButton>
//                                             </TableCell>
//                                         )}
//                                     </TableRow>
//                                 )
//                             })}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Box>
//             <Dialog open={open} onClose={() => setOpen(false)}
//                 sx={{
//                     '& .MuiPaper-root': {
//                         width: '450px'
//                     },
//                     '& .MuiDialogTitle-root': {
//                         padding: '15px 10px',
//                         background: '#EAD820',
//                         color: 'black'
//                     },
//                     // '& .MuiDialogContent-root': {
//                     //     padding: '25px 10px',
//                     //     background: 'white',
//                     //     color: 'black',
//                     //     borderBottom: '1px solid lightGray'
//                     // },
//                     '& .MuiDialogActions-root': {
//                         padding: '12px 10px',
//                         background: 'white',
//                     }
//                 }}
//             >
//                 <DialogTitle className='flex justify-between'>
//                     <p className='font-medium'>Delete Category</p>
//                     <button onClick={handleClose}>
//                         <CloseIcon />
//                     </button>
//                 </DialogTitle>
//                 <DialogContent>
//                     <Box mt='15px'>
//                         <p>Are you sure you want to delete the seleted asset?</p>
//                     </Box>
//                 </DialogContent>
//                 <Divider />
//                 <DialogActions>
//                     <Button className='bg-broom' variant='outlined' color='warning' onClick={() => dispatch(deleteCategory(categoryId))}>
//                         {/* <ProcessingLoader /> */}
//                         Delete
//                     </Button>
//                     <Button onClick={() => { setOpen(false); setCategoryId('') }}>
//                         {/* <ProcessingLoader /> */}
//                         Cancel
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </>
//     );
// }

// export default Categories

import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import Dropzone from 'react-dropzone';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { clear_create_productType_error, createProductType, create_productType_reset } from '../../features/productType/productTypeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCategories } from '../../features/category/categorySlice';
import Loader from '../../components/Loader';

const CreateProductType = () => {
    const dispatch = useDispatch()
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setProductType('')
        setCategory('')
    };
    const [productType, setProductType] = useState('')
    const [category, setCategory] = useState('')
    // const [image, setImage] = useState(null)
    const handleSubmit = (e) => {
        e.preventDefault()
        // const formData = new FormData();
        // formData.set("productTypeName", productType)
        // formData.set("categoryId", category);'
        const formData = {
            productType: productType,
            categoryId: category
        };
        dispatch(createProductType(formData))
    }
    const { createProductTypeLoading, isCreated, createProductTypeError } = useSelector((state) => state.productType)
    const { getCategoriesLoading, categories } = useSelector((state) => state.category)
    useEffect(() => {
        if (isCreated) {
            toast.success('ProductType Created Successfully', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setProductType('')
            // setImage(null)
            dispatch(create_productType_reset())
            setOpen(false)
            setCategory('')
        }
        if (createProductTypeError) {
            toast.error(createProductTypeError, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(clear_create_productType_error())
        }
    }, [dispatch, isCreated, createProductTypeError])
    useEffect(() => {
        dispatch(getCategories())
    }, [])
    return (
        <>
            <button
                className='border-2 md:border-[3px] border-broom py-1 px-2 sm:px-4 text-broom text-base sm:text-lg font-medium'
                onClick={handleClickOpen}
            >
                create new
            </button>
            {getCategoriesLoading ? <Loader /> : (
                <Dialog open={open} onClose={handleClose}
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                >
                    <DialogTitle>create new ProductType</DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText> */}
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email" className="block text-lg uppercase font-medium leading-6 text-black">
                                ProductType
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
                                    value={productType}
                                    placeholder='ProductType Name'
                                    className='border-4 border-red-500'
                                    onChange={(e) => setProductType(e.target.value)}
                                />
                            </Box>
                            <Box mt='20px'
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: '0px'
                                    }
                                }}
                            >
                                <label htmlFor="email" className="block text-lg uppercase font-medium leading-6 text-black">
                                    Category
                                </label>
                                <FormControl fullWidth>
                                    {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={category}
                                        // label="Age"
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        {categories && categories.length > 0 && categories.map((category)=> {
                                            return (
                                                <MenuItem value={category._id}>{category.category}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Box>
                            {/* <DialogActions sx={{ justifyContent: 'flex-start', px: '24px', mb: '10px' }}> */}
                            <div className='mt-5 flex items-center gap-3'>
                                <Button
                                    type='submit'
                                    sx={{
                                        backgroundColor: '#EAD820',
                                        color: 'black',
                                        ':hover': {
                                            bgcolor: '#ead920a6'
                                        }
                                    }}
                                >
                                    Submit
                                </Button>
                                <Button onClick={handleClose}
                                    sx={{
                                        color: 'black',
                                        ":hover": {
                                            background: '#ebdf60',
                                        }
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                            {/* </DialogActions> */}
                        </form>
                        {/* )} */}

                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}

export default CreateProductType
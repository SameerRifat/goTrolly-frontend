import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, IconButton, MenuItem, Select } from '@mui/material';
import Dropzone from 'react-dropzone';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { clear_update_productType_error, createProductType, create_productType_reset, updateProductType, update_productType_reset } from '../../features/productType/productTypeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCategories } from '../../features/category/categorySlice';

const UpdateProductType = ({ row, updateProductTypeOpen, handleUpdateProductTypeClose }) => {
    console.log('row: ', row)
    const dispatch = useDispatch()
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [open, setOpen] = React.useState(false);
    const [productType, setProductType] = useState('')
    const [category, setCategory] = useState('')
    // const [image, setImage] = useState(null)
    // const [newImage, setNewImage] = useState(null)
    // const handleClickOpen = (row) => {
    //     setProductType(row.productType)
    //     setCategory(row.categoryId)
    //     // setImage(row.image ? row.image.split('\\').pop().split('_').pop(): null)
    //     setOpen(true);
    // };
    const handleClose = () => {
        setOpen(false);
        setProductType('')
        setCategory('')
        handleUpdateProductTypeClose()
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        // const formData = new FormData();
        // formData.set("productType", productType)
        // if(newImage){
        //     formData.set("file", newImage);
        // }
        // for(let obj of formData){
        //     console.log(obj)
        // }
        const formData = {
            productType: productType,
            categoryId: category
        };
        dispatch(updateProductType({ id: row.id, formData }))
    }
    const { updateProductTypeLoading, isProductTypeUpdated, updateProductTypeError } = useSelector((state) => state.productType)
    const { getCategoriesLoading, categories } = useSelector((state) => state.category)
    useEffect(() => {
        if (isProductTypeUpdated) {
            // toast.success('productType Updated Successfully', {
            //     position: "bottom-center",
            //     autoClose: 2000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light",
            // });
            setProductType('')
            // setImage(null)
            dispatch(update_productType_reset())
            handleUpdateProductTypeClose()
        }
        if (updateProductTypeError) {
            toast.error(updateProductTypeError, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(clear_update_productType_error())
        }
    }, [dispatch, isProductTypeUpdated, updateProductTypeError])
    useEffect(() => {
        if (row) {
            setProductType(row.productType)
            setCategory(row.categoryId)
        }
    }, [row])
    return (
        <>
            {/* <IconButton onClick={() => handleClickOpen(row)}>
                <EditOutlinedIcon />
            </IconButton> */}
            <Dialog open={updateProductTypeOpen} onClose={handleClose}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <DialogTitle>Update productType</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText> */}
                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                        <label htmlFor="email" className="block text-lg sm:text-xl uppercase font-medium leading-6 text-black">
                            productType
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
                                    {categories && categories.length > 0 && categories.map((category) => {
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
        </>
    )
}

export default UpdateProductType
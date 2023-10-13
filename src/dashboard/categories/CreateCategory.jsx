import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, IconButton } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Dropzone from 'react-dropzone';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { clear_create_category_error, createCategory, create_category_reset } from '../../features/category/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const CreateCategory = () => {
    const dispatch = useDispatch()
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [category, setCategory] = useState('')
    const [image, setImage] = useState(null)
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.set("category", category)
        formData.set("file", image);
        dispatch(createCategory(formData))
    }
    const { createCategoryLoading, isCreated, createCategoryError } = useSelector((state) => state.category)
    useEffect(() => {
        if (isCreated) {
            toast.success('Category Created Successfully', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setCategory('')
            setImage(null)
            dispatch(create_category_reset())
            setOpen(false)
        }
        if (createCategoryError) {
            toast.error(createCategoryError, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(clear_create_category_error())
        }
    }, [dispatch, isCreated, createCategoryError])
    return (
        <>
            <button
                className='border-2 md:border-[3px] border-broom py-1 px-2 sm:px-4 text-broom text-base sm:text-lg font-medium'
                onClick={handleClickOpen}
            >
                create new
            </button>
            <Dialog open={open} onClose={handleClose}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <DialogTitle>create new category</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText> */}
                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                        <label htmlFor="email" className="block text-lg sm:text-xl uppercase font-medium leading-6 text-black">
                            Category
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
                                value={category}
                                placeholder='Category Name'
                                className='border-4 border-red-500'
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Box>
                        {/* {isImage && ( */}
                        <Box
                            border={`1px solid lightGray`}
                            // borderRadius="5px"
                            mt="1rem"
                            p="1rem"
                        >
                            <Dropzone
                                acceptedFiles=".jpg, .jpeg, .png"
                                multiple={false}
                                onDrop={(acceptedFiles) =>
                                    setImage(acceptedFiles[0])
                                }
                            >
                                {({ getRootProps, getInputProps }) => {
                                    return (
                                        <div className='flex justify-between items-center'>
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed #EAD820`}
                                                p="1rem"
                                                width="100%"
                                                sx={{
                                                    "&:hover": {
                                                        cursor: "pointer"
                                                    }
                                                }}
                                            >
                                                <input {...getInputProps()} />
                                                {!image ? (
                                                    <div className='flex gap-1 items-center'>
                                                        <ImageOutlinedIcon />
                                                        <p>Add category Image</p>
                                                    </div>
                                                ) : (
                                                    <div className='flex justify-between items-center'>
                                                        {/* <Typography>{image.name}</Typography> */}
                                                        <span>{image.name}</span>
                                                        <EditOutlinedIcon />
                                                    </div>
                                                )}
                                            </Box>
                                            {image && (
                                                <Box width="15%" display="flex" justifyContent="center" alignItems="center">
                                                    <IconButton
                                                        // sx={{ width: "15%" }}
                                                        onClick={() => setImage(null)}
                                                    >
                                                        <DeleteOutlinedIcon />
                                                    </IconButton>
                                                </Box>
                                            )}
                                        </div>
                                    )
                                }}
                            </Dropzone>
                        </Box>
                        {/* <DialogActions sx={{ justifyContent: 'flex-start', px: '24px', mb: '10px' }}> */}
                        <div className='mt-5 flex items-center gap-3'>
                            {/* <Button
                                type='submit'
                                sx={{
                                    backgroundColor: '#EAD820',
                                    color: 'black',
                                    ':hover': {
                                        bgcolor: '#ead920a6'
                                    }
                                }}
                            >
                                {createCategoryLoading ? "Creating..." : "Create"}
                            </Button> */}
                            <LoadingButton loading={createCategoryLoading} variant="contained"
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
                                Submit
                            </LoadingButton>
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

export default CreateCategory
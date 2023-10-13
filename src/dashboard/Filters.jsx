import React, { Fragment, useState } from 'react'
import { Button, useMediaQuery, Rating, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import img1 from '../images/ear-buds.jpg'
import img2 from '../images/sp2.jpg'
import img3 from '../images/sony-speaker.jpg'
import img4 from '../images/m9.jpg'
import img5 from '../images/audio-sold2.jpg'
import img6 from '../images/laptop-stand.jpg'
import img7 from '../images/hands-free.jpg'
import img8 from '../images/jbl-mini.jpg'
import img9 from '../images/speaker.jpg'
import img10 from '../images/smart-watch.jpg'
import img11 from '../images/ubl-speaker.jpg'
import img12 from '../images/data-cable.jpg'
import img13 from '../images/audio-sold6.jpg'
import { useNavigate } from 'react-router-dom';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#000',
    },
});

const mainOptions = [
    {
        id: '1',
        label: 'add product',
    },
    {
        id: '2',
        label: 'products',
    },
    {
        id: '3',
        label: 'categories',
    },
    {
        id: '4',
        label: 'brands',
    },
    {
        id: '5',
        label: 'product types',
    },
]
const otherOptions = [
    {
        id: '6',
        label: 'orders',
    },
    {
        id: '7',
        label: 'customers',
    },
    {
        id: '8',
        label: 'statics',
    },
    {
        id: '9',
        label: 'reviews',
    },
    {
        id: '10',
        label: 'transactions',
    },
    {
        id: '11',
        label: 'on demand orders',
    }
]

export const ratingOptions = [
    {
        size: "medium",
        value: 5,
        readOnly: true,
    },
    {
        size: "medium",
        value: 4,
        readOnly: true,
    },
    {
        size: "medium",
        value: 3.5,
        readOnly: true,
    },
]

const Filters = ({ mobileFiltersOpen, setMobileFiltersOpen, }) => {
    const isNonMobileScreens = useMediaQuery('(min-width:640px)');
    const navigate = useNavigate()
    const [selectedOption, setSelectedOption] = useState('')
    console.log('selectedOption: ', selectedOption)
    const [ratings, setRatings] = useState(0)
    const handleRatingsChange = (option) => {
        setRatings(0)
        setRatings(option);
    }

    const handleCheckboxChange = (label) => {
        setSelectedOption(label);
        // Add navigation logic here based on the selected option's label
        switch (label) {
            case 'add product':
                navigate('/admin/product');
                break;
            case 'products':
                navigate('/admin/products');
                break;
            case 'brands':
                navigate('/admin/brands');
                break;
            case 'categories':
                navigate('/admin/categories');
                break;
            case 'product types':
                navigate('/admin/productTypes');
                break;
            case 'orders':
                navigate('/admin/orders');
                break;
            case 'customers':
                navigate('/admin/users');
                break;
            case 'statics':
                navigate('/admin/statics');
                break;
            case 'reviews':
                navigate('/admin/reviews');
                break;
            case 'transactions':
                navigate('/admin/transactions');
                break;
            case 'on demand orders':
                navigate('/admin/on-demand-orders');
                break;
            default:
                navigate('/admin/products');
        }
    };

    return (
        <>
            {/* Mobile filter dialog */}
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                <div className="flex items-center justify-between px-4">
                                    <h2 className="text-lg font-medium text-gray-900">dashboard options</h2>
                                    <button
                                        type="button"
                                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                        onClick={() => setMobileFiltersOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <CloseIcon />
                                    </button>
                                </div>

                                <form className="mt-4 border-t border-gray-200">
                                    <>
                                        <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-mx-2 -my-3 flow-root">
                                                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-900">Product Type</span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                                ) : (
                                                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6 pl-2">
                                                        <Box display='grid' gridTemplateColumns='1fr 1fr'
                                                            sx={{
                                                                '& .MuiButtonBase-root': {
                                                                    py: '0px'
                                                                },
                                                                '& .MuiTypography-root': {
                                                                    fontSize: isNonMobileScreens ? '16px' : '14px'
                                                                },
                                                                '& .MuiSlider-root': {
                                                                    color: 'black !important',
                                                                    border: '4px solid red'
                                                                },
                                                                '& .MuiSlider-colorPrimary': {
                                                                    color: 'black !important'
                                                                },
                                                            }}
                                                        >
                                                            {mainOptions.map((option, index) => (
                                                                <FormControlLabel
                                                                    key={index}
                                                                    control={<Checkbox />}
                                                                    label={option.label}
                                                                    checked={selectedOption === option.label}
                                                                    onChange={() => handleCheckboxChange(option.label)}
                                                                />
                                                            ))}
                                                        </Box>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    </>

                                    <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-mx-2 -my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">other options</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6 pl-2">
                                                    <Box display='grid' gridTemplateColumns='1fr 1fr' mt='8px'
                                                        sx={{
                                                            '& .MuiButtonBase-root': {
                                                                py: '0px'
                                                            },
                                                            '& .MuiTypography-root': {
                                                                fontSize: isNonMobileScreens ? '16px' : '14px'
                                                            },
                                                            '& .MuiSlider-root': {
                                                                color: 'black !important',
                                                                border: '4px solid red'
                                                            },
                                                            '& .MuiSlider-colorPrimary': {
                                                                color: 'black !important'
                                                            },
                                                        }}
                                                    >
                                                        {otherOptions.map((option, index) => (
                                                            <FormControlLabel
                                                                key={index}
                                                                control={<Checkbox />}
                                                                label={option.label}
                                                                checked={selectedOption === option.label}
                                                                onChange={() => handleCheckboxChange(option.label)}
                                                            />
                                                        ))}
                                                    </Box>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>

                                    <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-mx-2 -my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">Ratings</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6 pl-2">
                                                    <div className="space-y-6">
                                                        {ratingOptions.map((rating, ind) => (
                                                            <div key={rating.value} className="flex items-center" style={{ marginTop: '5px' }}
                                                                onClick={() => handleRatingsChange(rating.value)}
                                                            >
                                                                <label
                                                                    htmlFor={`rating-option-${ind}`}
                                                                    className="min-w-0 flex-1 flex items-center gap-1"
                                                                >
                                                                    <StyledRating {...rating} precision='0.5' size='medium' />
                                                                    <span className='mx-2 text-lg font-medium'>{rating.value}/5</span>
                                                                    <span className='text-xl font-medium'>{ratings === rating.value && '✓'}</span>
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                    <div className='px-4'> 
                                        <span className="font-medium text-gray-900">appearance</span>
                                        <Box
                                            display='grid'
                                            gridTemplateColumns='1fr'
                                            mt='8px'
                                            sx={{
                                                '& .MuiButtonBase-root': {
                                                    py: '0px'
                                                },
                                                '& .MuiTypography-root': {
                                                    fontSize: isNonMobileScreens ? '16px' : '14px'
                                                },
                                                '& .MuiSlider-root': {
                                                    color: 'black !important',
                                                    border: '4px solid red'
                                                },
                                                '& .MuiSlider-colorPrimary': {
                                                    color: 'black !important'
                                                },
                                            }}
                                        >
                                            <FormControlLabel
                                                // key={index}
                                                control={<Checkbox />}
                                                label='light mode'
                                            // checked={selectedProductType === option.label}
                                            // onChange={() => setSelectedOption(option.label)}
                                            />
                                            <FormControlLabel
                                                // key={index}
                                                control={<Checkbox />}
                                                label='dark mode'
                                            // checked={selectedOption === option.label}
                                            // onChange={() => setSelectedOption(option.label)}
                                            />
                                        </Box>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Filters */}
            <h2 className='text-3xl font-medium'>Dash Board:</h2>
            <div>
                <h5 className='text-2xl font-medium'>main options:</h5>
                <Box
                    display='grid'
                    gridTemplateColumns='1fr'
                    sx={{
                        '& .MuiButtonBase-root': {
                            py: '0px'
                        },
                        '& .MuiTypography-root': {
                            fontSize: '18px'
                        },
                        '& .MuiSlider-root': {
                            color: 'black !important',
                            border: '4px solid red'
                        },
                        '& .MuiSlider-colorPrimary': {
                            color: 'black !important'
                        },
                    }}
                >
                    {mainOptions.map((option, index) => (
                        <FormControlLabel
                            key={index}
                            control={<Checkbox />}
                            label={option.label}
                            checked={selectedOption === option.label}
                            onChange={() => handleCheckboxChange(option.label)}
                        />
                    ))}
                </Box>
            </div>
            <div className='my-3'>
                <h5 className='text-2xl font-medium'>other options:</h5>
                <Box
                    display='grid'
                    gridTemplateColumns='1fr'
                    sx={{
                        '& .MuiButtonBase-root': {
                            py: '0px'
                        },
                        '& .MuiTypography-root': {
                            fontSize: '18px'
                        },
                        '& .MuiSlider-root': {
                            color: 'black !important',
                            border: '4px solid red'
                        },
                        '& .MuiSlider-colorPrimary': {
                            color: 'black !important'
                        },
                    }}
                >
                    {otherOptions.map((option, index) => (
                        <FormControlLabel
                            key={index}
                            control={<Checkbox />}
                            label={option.label}
                            checked={selectedOption === option.label}
                            onChange={() => handleCheckboxChange(option.label)}
                        />
                    ))}
                </Box>
            </div>
            <div className='my-3'>
                <p className="text-xl font-medium">ratings</p>
                {ratingOptions.map((rating, ind) => (
                    <div key={rating.value} className="flex items-center" style={{ marginTop: '5px' }}
                        onClick={() => handleRatingsChange(rating.value)}
                    >
                        <label
                            htmlFor={`rating-option-${ind}`}
                            className="min-w-0 flex-1 flex items-center gap-1"
                        >
                            <StyledRating {...rating} precision='0.5' size='medium' />
                            <span className='mx-2 text-lg font-medium'>{rating.value}/5</span>
                            <span className='text-xl font-medium'>{ratings === rating.value && '✓'}</span>
                        </label>
                    </div>
                ))}
            </div>
            <div>
                <h5 className='text-2xl font-medium'>appearance:</h5>
                <Box
                    display='grid'
                    gridTemplateColumns='1fr'
                    sx={{
                        '& .MuiButtonBase-root': {
                            py: '0px'
                        },
                        '& .MuiTypography-root': {
                            fontSize: '18px'
                        },
                        '& .MuiSlider-root': {
                            color: 'black !important',
                            border: '4px solid red'
                        },
                        '& .MuiSlider-colorPrimary': {
                            color: 'black !important'
                        },
                    }}
                >
                    <FormControlLabel
                        // key={index}
                        control={<Checkbox />}
                        label='light mode'
                    // checked={selectedOption === option.label}
                    // onChange={() => setSelectedOption(option.label)}
                    />
                    <FormControlLabel
                        // key={index}
                        control={<Checkbox />}
                        label='dark mode'
                    // checked={selectedOption === option.label}
                    // onChange={() => setSelectedOption(option.label)}
                    />
                </Box>
            </div>
            <div className='my-3'>
                <h5 className='text-2xl font-medium mb-2'>best sales:</h5>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-5'>
                        <div className='w-full h-auto'>
                            <img src={img1} alt="product" className='w-full h-auto object-center object-cover' />
                        </div>
                        <div className='w-full h-auto'>
                            <img src={img3} alt="product" className='w-full h-auto object-center object-cover' />
                        </div>
                        <div className='w-full h-auto'>
                            <img src={img5} alt="product" className='w-full h-auto object-center object-cover' />
                        </div>
                        <div className='w-full h-auto'>
                            <img src={img7} alt="product" className='w-full h-auto object-center object-cover' />
                        </div>
                        <div className='w-full h-auto'>
                            <img src={img9} alt="product" className='w-full h-auto object-center object-cover' />
                        </div>
                        <div className='w-full h-auto'>
                            <img src={img11} alt="product" className='w-full h-auto object-center object-cover' />
                        </div>
                        <div className='w-full h-auto'>
                            <img src={img13} alt="product" className='w-full h-auto object-center object-cover' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <div className='w-full h-auto'>
                            <img src={img2} alt="product" className='w-full h-auto object-center object-cover' />
                        </div>
                        <div className='w-full h-auto'>
                            <img src={img4} alt="product" className='w-full h-auto object-center object-cover' />
                        </div>
                        <div className='w-full h-auto'>
                            <img src={img6} alt="product" className='w-full h-auto object-center object-cover' />
                        </div>
                        <div className='w-full h-auto'>
                            <img src={img8} alt="product" className='w-full h-auto object-center object-cover' />
                        </div>
                        <div className='w-full h-auto'>
                            <img src={img10} alt="product" className='w-full h-auto object-center object-cover' />
                        </div>
                        <div className='w-full h-auto'>
                            <img src={img12} alt="product" className='w-full h-auto object-center object-cover' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Filters
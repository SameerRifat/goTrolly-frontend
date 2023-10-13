import React from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import CloseIcon from '@mui/icons-material/Close';
import { Box, Checkbox, FormControlLabel, IconButton, Rating, Slider } from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { styled } from '@mui/material/styles';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#000',
    },
});

const BlackSlider = styled(Slider)({
    color: '#000',
});


const MobileFiltersDialog = ({
    mobileFiltersOpen,
    setMobileFiltersOpen,
    productTypeOptions = [],
    selectedProductType = '',
    setSelectedProductType = '',
    brandOptions = [],
    selectedBrand = '',
    setSelectedBrand = '',
    price,
    priceHandler,
    sliderMax,
    minPrice,
    maxPrice,
    ratingOptions,
    ratings,
    handleRatingsChange,
}) => {
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
                                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
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
                                    {productTypeOptions && productTypeOptions.length > 0 && (
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
                                                                        fontSize: '12px'
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
                                                                {productTypeOptions.map((option, index) => (
                                                                    <FormControlLabel
                                                                        key={option._id}
                                                                        control={<Checkbox />}
                                                                        label={option.productType}
                                                                        checked={selectedProductType._id === option._id}
                                                                        onChange={() => setSelectedProductType(option)}
                                                                    />
                                                                ))}
                                                            </Box>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        </>
                                    )}

                                    {productTypeOptions.length === 0 && (
                                        <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-mx-2 -my-3 flow-root">
                                                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-900">Brands</span>
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
                                                                    fontSize: '12px'
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
                                                            {brandOptions.map((option, index) => (
                                                                <FormControlLabel
                                                                    key={option._id}
                                                                    control={<Checkbox />}
                                                                    label={option.brandName}
                                                                    checked={selectedBrand._id === option._id}
                                                                    onChange={() => setSelectedBrand(option)}
                                                                />
                                                            ))}
                                                        </Box>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    )}

                                    <div className='border-t border-gray-200 px-4 py-5'>
                                        <p className="text-xl font-medium">Prize</p>
                                        <div className='px-6 flex items-center pt-2'>
                                            <BlackSlider
                                                value={price}
                                                onChange={priceHandler}
                                                valueLabelDisplay="auto"
                                                min={0}
                                                max={sliderMax}
                                            />
                                        </div>
                                        <div className='flex justify-between'>
                                            <span className='text-lg font-medium'>{minPrice}</span>
                                            <span className='text-lg font-medium'>{maxPrice}</span>
                                        </div>
                                    </div>
                                    {productTypeOptions.length > 0 && brandOptions.length > 0 && (
                                        <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-mx-2 -my-3 flow-root">
                                                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-900">Brands</span>
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
                                                                    fontSize: '12px'
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
                                                            {brandOptions.map((option, index) => (
                                                                <FormControlLabel
                                                                    key={option._id}
                                                                    control={<Checkbox />}
                                                                    label={option.brandName}
                                                                    checked={selectedBrand._id === option._id}
                                                                    onChange={() => setSelectedBrand(option)}
                                                                />
                                                            ))}
                                                        </Box>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    )}

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
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}

export default MobileFiltersDialog
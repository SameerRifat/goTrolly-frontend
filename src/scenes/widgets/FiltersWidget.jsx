import React from 'react'
import { Box, IconButton, Rating, Slider } from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#000',
    },
});
const BlackSlider = styled(Slider)({
    color: '#000',
});

const FiltersWidget = ({
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
    isChargingAndPower=false
}) => {
    return (
        <>
            {/* Filters */}
            {/* <div className="hidden lg:block lg:w-[30%] bg-broom py-2 px-5"> */}
            <h3 className='text-3xl font-medium'>Filters:</h3>
            {productTypeOptions && productTypeOptions.length > 0 && (
                <>
                    <div>
                        <h5 className='text-2xl font-medium'>Product Type</h5>
                        <Box display='grid' gridTemplateColumns='1fr 1fr'
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
                    </div>
                </>
            )}
            {productTypeOptions.length === 0 && brandOptions.length > 0 && (
                <div className='my-3'>
                    <h5 className='text-2xl font-medium'>brands</h5>
                    <Box display='grid' gridTemplateColumns='1fr 1fr' mt='8px'
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
                </div>
            )}
            <div className='py-3'>
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
            <div className="">
                <p className="text-xl font-medium">ratings</p>
                {ratingOptions.map((rating, ind) => (
                    <div key={rating.value} className="flex items-center" style={{ marginTop: '5px' }}
                        onClick={() => handleRatingsChange(rating.value)}
                    >
                        <label
                            htmlFor={`rating-option-${ind}`}
                            className="min-w-0 flex-1 flex items-center gap-1"
                        >
                            <StyledRating {...rating} precision='0.5' size='large' />
                            <span className='mx-2 text-lg font-medium'>{rating.value}/5</span>
                            <span className='text-xl font-medium'>{ratings === rating.value && '✓'}</span>
                        </label>
                    </div>
                ))}
            </div>
            {productTypeOptions.length > 0 && brandOptions.length > 0 && (
                <div className='my-3'>
                    <h5 className='text-2xl font-medium'>brands</h5>
                    <Box display='grid' gridTemplateColumns='1fr 1fr' mt='8px'
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
                </div>
            )}
            {/* </div> */}
        </>
    )
}

export default FiltersWidget
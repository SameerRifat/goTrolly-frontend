import React, { useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { Badge, Box, Button, IconButton } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import UserOptions from './UserOptions';
import { useSelector } from 'react-redux';

const CommonNavbar = () => {
  const [keyword, setKeyword] = React.useState('');
  const navigate = useNavigate();
  const [openSearchBox, setOpenSearchBox] = React.useState(false);
  const searchBoxRef = useRef(null);
  const searchButtonRef = useRef(null);
  const { isAuthenticated, user } = useSelector((state) => state.user)

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/products/${keyword}`)
      setKeyword('')
    } else {
      navigate('/products')
    }
  };

  // Add a click event listener to the document
  useEffect(() => {
    const handleDocumentClick = (e) => {
      console.log('check3: ', !searchBoxRef.current.contains(e.target) && !searchButtonRef.current.contains(e.target))
      // Check if the click target is not within the search box
      if (!searchBoxRef.current.contains(e.target) && !searchButtonRef.current.contains(e.target)) {
        // Close the search box if it's open
        setOpenSearchBox(false);
      }
    };

    // Attach the event listener when the search box is open
    if (openSearchBox) {
      document.addEventListener('click', handleDocumentClick);
    } else {
      // Remove the event listener when the search box is closed
      document.removeEventListener('click', handleDocumentClick);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [openSearchBox]);
  const { cartItems } = useSelector((state) => state.cart)

  return (
    <>
      <div className='px3 sm:px-6 flex items-center justify-between bg-black h-14'>
        {/* {user && user.role === 'admin' ? (
          <div>
            <NavLink
              to='/admin/products'
              className='text-yellow self-end uppercase text-base font-medium px-3 pr-0 py-1.5 transition-all duration-300'
            >
              dashboard
            </NavLink>
          </div>
        ) : (<div></div>)} */}
        <div></div>
        <div
          className='bg-black h-14 flex items-center justify-end px-3 md:px-6'
        >
          <div className='flex items-center'>
            {/* <IconButton
          size='small'
          onClick={() => setOpenSearchBox(false)}
          className={`${openSearchBox ? 'opacity-100' : 'opacity-0'
            } border-4 border-yellow transition-all duration-300`}
          sx={{
            backgroundColor: '#f6f6f6',
            '&:hover': {
              backgroundColor: '#ececec'
            },
            marginRight: '10px'
          }}
        >
          <CloseIcon className='text-black' fontSize='12px' />
        </IconButton> */}
            <div
              ref={searchBoxRef} // Reference to the search box div
              className={`search-box ${openSearchBox ? 'open' : ''} flex h-8 sm:h-9 min-h-[32px] sm:min-h-[36px] border-[${openSearchBox ? '2px' : '0px'}] sm:border-[${openSearchBox ? '3px' : '0px'}] border-broom overflow-hidden`}
            >
              {openSearchBox && (
                <>
                  <input
                    type='text'
                    value={keyword}
                    placeholder='Search...'
                    onChange={(e) => setKeyword(e.target.value)}
                    className='flex-1 w-[94%] sm:w-[90%] outline-none border-none text-black p-2'
                  />
                  <button
                    type='submit'
                    onClick={submitHandler}
                    disabled={keyword === ''}
                    className='bg-broom w-[6%] sm:w-[10%] min-w-[60px] sm:min-w-[70px] text-base sm:text-lg font-medium text-black border-none outline-none'
                  >
                    search
                  </button>
                </>
              )}
            </div>
            <button
              ref={searchButtonRef}
              onClick={() => setOpenSearchBox(true)}
              className={`${openSearchBox ? 'hidden' : 'inline-block'} text-yellow uppercase text-base font-medium border-r border-yellow px-3 py-1.5 transition-all duration-300`}
            >
              Search
            </button>
            <div className='border-r border-yellow px-3.5 pr-5 py-1.5 '>
              <Box
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#FFFF00',
                    color: 'black',
                    fontSize: '14px'
                  }
                }}
              >
                <NavLink to='/cart'>
                  <Badge badgeContent={cartItems.length > 0 ? cartItems.length : '0'} color="primary">
                    <ShoppingCartOutlinedIcon style={{ color: 'white' }} />
                  </Badge>
                </NavLink>
              </Box>
            </div>

            {!isAuthenticated && (
              <>
                <NavLink
                  to='/login'
                  className='text-yellow self-end uppercase text-base font-medium border-r border-yellow px-3 py-1.5 transition-all duration-300'
                >
                  Login
                </NavLink>
                <NavLink
                  to='/register'
                  className='text-yellow self-end uppercase text-base font-medium px-3 pr-0 py-1.5 transition-all duration-300'
                >
                  Register
                </NavLink>
              </>
            )}
            {isAuthenticated && <UserOptions user={user} />}

          </div>
        </div>
      </div>
    </>
  );
};

export default CommonNavbar;





// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import CloseIcon from '@mui/icons-material/Close';
// import { Button, IconButton } from '@mui/material';

// const CommonNavbar = () => {
//   const [keyword, setKeyword] = React.useState('');
//   const [openSearchBox, setOpenSearchBox] = React.useState(false);
//   const submitHandler = () => {
//     alert('keyword: ' + keyword)
//     setKeyword('')
//   }
//   return (
//     <div className='bg-black h-14 flex items-center justify-end px-3 md:px-6'>
//       {/* ${openSearchBox ? 'w-32' : 'w-0'} */}
//       <div className='flex items-center'>
//         <IconButton
//           size='small'
//           onClick={() => setOpenSearchBox(false)}
//           className={`${openSearchBox ? 'inline-block' : 'hidden'} border-4 border-yellow`}
//           sx={{
//             backgroundColor: '#f6f6f6',
//             '&:hover': {
//               backgroundColor: '#ececec'
//             },
//             marginRight: '10px'
//           }}
//         >
//           <CloseIcon className='text-black' fontSize='12px' />
//         </IconButton>
//         <div className={`${openSearchBox ? 'flex' : 'hidden'} transition-all duration-300 w-[400px] h-9 min-h-[36px] border-2  sm:border-[3px] md:border-4 border-broom my-4`}>
//           <input type="text" value={keyword} placeholder='Search...' onChange={(e) => setKeyword(e.target.value)} className='flex-1 w-[90%] outline-none border-none text-black p-2' />
//           <button type='submit' onClick={submitHandler} className='bg-broom w-[10%] min-w-[70px] text-lg font-medium text-black border-none outline-none'>search</button>
//         </div>
//         {/* "text-yellow uppercase text-base font-medium border-r border-yellow px-3 py-1.5" */}
//         <button onClick={() => setOpenSearchBox(true)} className={`text-yellow uppercase text-base font-medium border-r border-yellow px-3 py-1.5 ${openSearchBox ? 'hidden' : 'inline-block'}`}>Search</button>
//         <NavLink to="/login" className="text-yellow uppercase text-base font-medium border-r border-yellow px-3 py-1.5">Login</NavLink>
//         <NavLink to="/register" className="text-yellow uppercase text-base font-medium px-3 pr-0 py-1.5">Register</NavLink>
//       </div>
//     </div>
//   )
// }

// export default CommonNavbar
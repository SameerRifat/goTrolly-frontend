import axios from 'axios';

export default function API() {

  const http = axios.create({
     baseURL: 'https://gotrolly-api.onrender.com/', 

    // baseURL: 'http://localhost:4000/', 
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    // validateStatus: status => {
    //   return status >= 200 && status < 300; // Treat 2xx as success, everything else as error
    // }
  });

  const appUrl = window.location.origin;
  // const API_Url = 'http://localhost:4000/';
  // const IMAGE_PUBLIC_PATH = 'http://localhost:4000/';


  const API_Url = 'https://gotrolly-api.onrender.com/';
  const IMAGE_PUBLIC_PATH = 'https://gotrolly-api.onrender.com/';

  return {
    http,
    appUrl,
    API_Url,
    IMAGE_PUBLIC_PATH,
  };
}

// import axios from 'axios';

// export default function API() {
//   const http = axios.create({
//     // baseURL: 'http://localhost:4000/api/',
//     baseURL: 'http://localhost:4000/',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   // Add an interceptor to set the Authorization header
//   http.interceptors.request.use(
//     (config) => {
//       // Get the access token from localStorage
//       const accessToken = localStorage.getItem('token');

//       // If the access token exists, set the Authorization header
//       if (accessToken) {
//         config.headers.Authorization = `Bearer ${accessToken}`;
//       }

//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   const appUrl = window.location.origin;
//   const API_Url = 'http://localhost:4000/';
//   // const API_Url = 'http://127.0.0.1:8000/api/';
//   const IMAGE_PUBLIC_PATH = 'http://127.0.0.1:4000/';

//   return {
//     http,
//     appUrl,
//     API_Url,
//     IMAGE_PUBLIC_PATH,
//   };
// }


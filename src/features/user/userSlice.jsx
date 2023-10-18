import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API from '../../components/APIs/Api';
const { http } = API();

const initialState = {
    loading: true,
    isAuthenticated: false,
    user: {},
    error: null,
    updateProfileLoading: false,
    isProfileUpdated: false,
    updateProfileError: '',
    updatePasswordLoading: false,
    isPasswordUpdated: false,
    updatePasswordError: '',
    getAllUsersLoading: false,
    allUsers: [],
    getAllUsersError: '',
    updateUsersRoleLoading: false,
    isRoleUpdated: false,
    updateUsersRoleError: '',
    deleteUsersLoading: false,
    isUsersDeleted: false,
    deleteUsersError: ''
}
// login
export const login = createAsyncThunk('user/login', async (data) => {
    const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
    try {
        // const response = await axios.post("/api/v1/login", data, config);
        const response = await http.post("/api/v1/login", data, config);
        return response.data;
    } catch (error) {
        if (error.response) {
            // The server responded with a status code outside the range of 2xx
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error('No response received from server');
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error('Error occurred while sending the request');
        }
    }
})

// register
export const register = createAsyncThunk('user/register', async (data) => {
    const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
    try {
        // const response = await axios.post("/api/v1/register", data, config)
        const response = await http.post("/api/v1/register", data, config)
        return response.data
    } catch (error) {
        if (error.response) {
            // The server responded with a status code outside the range of 2xx
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error('No response received from server');
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error('Error occurred while sending the request');
        }
    }
})
// loadUser
export const loadUser = createAsyncThunk('user/loadUser', async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        // withCredentials: true
    };
    try {
        // const response = await axios.get("/api/v1/me", config)
        const response = await http.get("/api/v1/me", config);
        return response.data
    } catch (error) {
        if (error.response) {
            // The server responded with a status code outside the range of 2xx
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error('No response received from server');
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error('Error occurred while sending the request');
        }
    }
})
// logout
export const logout = createAsyncThunk('user/logout', async () => {
    // const response = await axios.get("/api/v1/logout")
    const response = await http.get("/api/v1/logout")
    return response.data
})

// get user details (Admin)
// export const getUserDetails = createAsyncThunk('user/getUserDetails', async (id) => {
//     try {
//         const response = await axios.get(`/api/v1/admin/user/${id}`)
//         return response.data
//     } catch (error) {
//         if (error.response) {
//             // The server responded with a status code outside the range of 2xx
//             const errorMessage = error.response.data.message;
//             throw new Error(errorMessage);
//         } else if (error.request) {
//             // The request was made but no response was received
//             throw new Error('No response received from server');
//         } else {
//             // Something happened in setting up the request that triggered an Error
//             throw new Error('Error occurred while sending the request');
//         }
//     }
// })
// update profile
export const updateProfile = createAsyncThunk('user/updateProfile', async (data)=>{
    // const config = {headers: {'Content-Type': 'multipart/form-data'}, withCredentials: true};
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        // withCredentials: true
    };
    try {
        const response = await http.put("/api/v1/me/update", data, config)
        return response.data
    } catch (error) {
        if (error.response) {
            // The server responded with a status code outside the range of 2xx
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error('No response received from server');
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error('Error occurred while sending the request');
        }
    }
})

export const updatePassword = createAsyncThunk('user/updatePassword', async (passwords)=>{
    // const config = {headers: {'Content-Type': 'application/json'}, withCredentials: true};
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        // withCredentials: true
    };
    try {
        const response = await http.put("/api/v1/password/update", passwords, config)
        return response.data
    } catch (error) { 
        if (error.response) {
            // The server responded with a status code outside the range of 2xx
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error('No response received from server');
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error('Error occurred while sending the request');
        }
    }
})

// get all users (Admin)
export const getAllUsers = createAsyncThunk('user/getAllUsers', async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        // withCredentials: true
    };
    try {
        const response = await http.get("/api/v1/admin/users", config)
        return response.data
    } catch (error) {
        if (error.response) {
            // The server responded with a status code outside the range of 2xx
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error('No response received from server');
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error('Error occurred while sending the request');
        }
    }
})

// update user Role
export const updateUsersRole = createAsyncThunk('user/updateUsersRole', async (data) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        // withCredentials: true
    };
    try {
        const response = await http.put(`/api/v1/admin/users/updateRole`, data, config)
        return response.data
    } catch (error) {
        if (error.response) {
            // The server responded with a status code outside the range of 2xx
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error('No response received from server');
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error('Error occurred while sending the request');
        }
    }
})

// delete users
export const deleteUsers = createAsyncThunk('user/deleteUsers', async (userIds) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
    };
    
    try {
      const dataToSend = JSON.stringify({ userIds });
  
      const response = await http.delete(`/api/v1/admin/users/delete`, {
        ...config,
        data: dataToSend, // Send the data in the 'data' field of the config.
      });
  
      return response.data;
    } catch (error) {
      if (error.response) {
        // The server responded with a status code outside the range of 2xx
        const errorMessage = error.response.data.message;
        throw new Error(errorMessage);
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response received from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error('Error occurred while sending the request');
      }
    }
  });

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clear_errors: (state) => {
            state.error = null,
            state.updateProfileError = null,
            state.updatePasswordError = null,
            state.getAllUsersError = null,
            state.updateUsersRoleError = null,
            state.deleteUsersError = null
        },
        update_profile_reset: (state) => { 
            state.isProfileUpdated = false
        },
        update_password_reset: (state) => { 
            state.isPasswordUpdated = false
        },
        update_role_reset: (state) => { 
            state.isRoleUpdated = false
        },
        delete_users_reset: (state) => { 
            state.isUsersDeleted = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.loading = true
            // state.error = ''
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload.user
            localStorage.setItem("token", JSON.stringify(action.payload.token));
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.user = null
            state.error = action.error.message
        })

        builder.addCase(register.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload.user
            localStorage.setItem("token", JSON.stringify(action.payload.token));
        })
        builder.addCase(register.rejected, (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.user = null
            state.error = action.error.message
        })

        builder.addCase(loadUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(loadUser.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload.user
        })
        builder.addCase(loadUser.rejected, (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.user = null
            state.error = action.error.message
        })

        builder.addCase(logout.pending, (state) => {
            state.loading = true
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.user = null
            localStorage.removeItem('token');
        })
        builder.addCase(logout.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        // get user Details (Admin)
        // builder.addCase(getUserDetails.pending, (state) => {
        //     state.loading = true
        // })
        // builder.addCase(getUserDetails.fulfilled, (state, action) => {
        //     state.loading = false
        //     state.user = action.payload.user
        // })
        // builder.addCase(getUserDetails.rejected, (state, action) => {
        //     state.loading = false
        //     state.error = action.error.message
        // })

        builder.addCase(updateProfile.pending, (state, action) => {
            state.updateProfileLoading = true
        })
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.updateProfileLoading = false
            state.isProfileUpdated = action.payload.success
        })
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.updateProfileLoading = false
            state.updateProfileError = action.error.message
        })

        // update password
        builder.addCase(updatePassword.pending, (state, action)=>{
            state.updatePasswordLoading = true
        })
        builder.addCase(updatePassword.fulfilled, (state, action)=>{
            state.updatePasswordLoading = false
            state.isPasswordUpdated = action.payload.success
        })
        builder.addCase(updatePassword.rejected, (state, action)=>{
            state.updatePasswordLoading = false
            state.updatePasswordError = action.error.message
        })

        // get all users (admin)
        builder.addCase(getAllUsers.pending, (state) => {
            state.getAllUsersLoading = true
        })
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.getAllUsersLoading = false
            state.allUsers = action.payload.users
        })
        builder.addCase(getAllUsers.rejected, (state, action) => {
            state.getAllUsersLoading = false
            state.getAllUsersError = action.error.message
        })

        // update users role
        builder.addCase(updateUsersRole.pending, (state, action) => {
            state.updateUsersRoleLoading = true
        })
        builder.addCase(updateUsersRole.fulfilled, (state, action) => {
            state.updateUsersRoleLoading = false
            state.isRoleUpdated = action.payload.success
            state.allUsers = state.allUsers.map((user) => {
                const updatedUser = action.payload.userIds.find((u) => u === user._id);
                if (updatedUser) {
                    return {
                        ...user,
                        role: action.payload.userRole,
                    };
                } else {
                    return user;
                }
            });
        })
        builder.addCase(updateUsersRole.rejected, (state, action) => {
            state.updateUsersRoleLoading = false
            state.updateUsersRoleError = action.error.message
        })

        // delete users
        builder.addCase(deleteUsers.pending, (state, action) => {
            state.deleteUsersLoading = true
        })
        builder.addCase(deleteUsers.fulfilled, (state, action) => {
            state.deleteUsersLoading = false
            state.isUsersDeleted = action.payload.success;
            const deletedUserIds = action.payload.deletedUserIds;
            deletedUserIds.forEach((deletedUserId) => {
                const index = state.allUsers.findIndex((user) => user._id === deletedUserId);

                if (index !== -1) {
                    state.allUsers.splice(index, 1);
                }
            });
        })
        builder.addCase(deleteUsers.rejected, (state, action) => {
            state.deleteUsersLoading = false
            state.deleteUsersError = action.error.message
        })
    }
})


export default userSlice.reducer
export const { clear_errors, update_profile_reset, update_password_reset, update_role_reset, delete_users_reset } = userSlice.actions
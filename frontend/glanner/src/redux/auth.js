import { createSlice, current } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLogin: false,
        user: {

        }
    },
    reducers: {
        login: (state, action) => {
            state.isLogin = true
            state.user = action.payload
        },
        logout: (state) => {
            state.isLogin = false
            state.user = null
        }
    }

})

export const { login, logout } = authSlice.actions;

export const selectUser = (state) => state.auth.user
export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAuth: localStorage.getItem('isAuth') || true,
    userRole: localStorage.getItem('role') || "USER",
   
};

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

        updateIsAuth: (state, action) => {
            state.isAuth = action.payload;
        },

        updateUserRole: (state, action) => {
            state.userRole = action.payload;
        },
    },
});

export const { updateIsAuth,updateUserRole } = UserSlice.actions;

export default UserSlice.reducer;
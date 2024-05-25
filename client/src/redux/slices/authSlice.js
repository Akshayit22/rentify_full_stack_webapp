import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token: localStorage.getItem("token") ? localStorage.getItem("token").toString().replaceAll('"','') : null,
    signupData: [],
    loading: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setSignupData: (state, action) => {
            state.signupData = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        }
    }
});

export const { setToken, setLoading, setSignupData } = authSlice.actions;
export default authSlice.reducer;
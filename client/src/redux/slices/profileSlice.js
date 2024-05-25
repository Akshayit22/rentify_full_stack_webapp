import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    user: localStorage.getItem("user") ?? JSON.parse(localStorage.getItem("user")) | null,
    loading:false,
    profileDetails:null,
    UserBlogs:null,
}

const profileSlice =createSlice({
    name:"profile",
    initialState: initialState,
    reducers:{
        setUser(state,value){
            state.user=value.payload
            //localStorage.setItem("user",JSON.stringify(value.payload));
        },
        setProfileDetails:(state,action)=> {
            state.profileDetails = action.payload;
        },
        setUserBlogs:(state,action) =>{
            state.UserBlogs = action.payload;
        }
    }
});

export const {setUser,setProfileDetails,setUserBlogs}=profileSlice.actions;
export default profileSlice.reducer;
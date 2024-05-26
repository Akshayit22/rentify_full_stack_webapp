import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    user: localStorage.getItem("user") ?? JSON.parse(localStorage.getItem("user")) | null,
    loading:false,
    ownedProperties:null,
    interestedProperties:null,
}

const dashboardSlice = createSlice({
    name:"dashboard",
    initialState: initialState,
    reducers:{
        setUser(state,value){
            state.user=value.payload
            //localStorage.setItem("user",JSON.stringify(value.payload));
        },
        setInterestedProperties:(state,action)=> {
            state.interestedProperties = action.payload;
        },
        setOwnedProperties:(state,action) =>{
            state.ownedProperties = action.payload;
        }
    }
});

export const {setUser,setInterestedProperties,setOwnedProperties} = dashboardSlice.actions;
export default dashboardSlice.reducer;
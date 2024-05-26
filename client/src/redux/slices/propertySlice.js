import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    AllProperty : [],
    OneProperty : [],
    UpdateProperty: false,
}

const propertySlice= createSlice({
    name:"property",
    initialState:initialState,
    reducers:{
        addProperties : (state, action) =>{
            state.AllProperty = action.payload;
        },
        addProperty : (state, action) =>{
            state.OneProperty = action.payload;
        },
        setUpdateProperty : (state, action) =>{
            state.UpdateProperty = action.payload;
        }
    }
});

export const {addProperties, addProperty, setUpdateProperty} = propertySlice.actions;

export default propertySlice.reducer;


import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    AllBlogs : [],
    OneBlog : [],
    UpdateBlog : false,
}

const blogsSlice= createSlice({
    name:"blog",
    initialState:initialState,
    reducers:{
        addBlogs : (state, action) =>{
            state.AllBlogs = action.payload;
        },
        addBlog : (state, action) =>{
            state.OneBlog = action.payload;
        },
        setUpdateBlog : (state, action) =>{
            state.UpdateBlog = action.payload;
        }
    }
});

export const {addBlogs, addBlog, setUpdateBlog} = blogsSlice.actions;

export default blogsSlice.reducer;


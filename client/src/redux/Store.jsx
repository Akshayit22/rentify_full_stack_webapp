import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from './slices/authSlice';
import blogsSlice from "./slices/blogsSlice";
import proflieReducer from './slices/profileSlice';


// export const store = configureStore({
//     reducer:{
// 	auth:authReducer,
// 	cart:cartReducer,
// 	profile:profieReducer,    
//     }
// });

const rootReducer = combineReducers({
	auth:authReducer,
	blog:blogsSlice,
	profile:proflieReducer,
	
});
    
export default rootReducer;
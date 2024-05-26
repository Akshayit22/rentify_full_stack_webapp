import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from './slices/authSlice';
import propertyReducer from "./slices/propertySlice";
import dashboardReducer from './slices/dashboardSlice';



const rootReducer = combineReducers({
	auth:authReducer,
	property:propertyReducer,
	dashboard:dashboardReducer,
	
});
    
export default rootReducer;
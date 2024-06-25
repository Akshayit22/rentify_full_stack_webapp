import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import rootReducer from './redux/Store.jsx';
import { configureStore } from "@reduxjs/toolkit";
import { ToastContainer } from 'react-toastify';
import { Toaster } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';

const store = configureStore( {
  reducer: rootReducer,
} );


ReactDOM.createRoot( document.getElementById( 'root' ) ).render(

  <BrowserRouter>
    <Provider store={store}>

      <App />

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition:Bounce
      />
      <Toaster />
    </Provider>
  </BrowserRouter>
)


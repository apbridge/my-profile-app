import {configureStore} from "@reduxjs/toolkit";
import modeReducer from "./slices/modeSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
    reducer: {
        mode: modeReducer,
        auth: authReducer,
    }
});

export default store;
import { configureStore } from "@reduxjs/toolkit";
import userStore from "./reducers/userSlice";

export const store = configureStore({
    reducer: {
        userStore: userStore,
    }
})

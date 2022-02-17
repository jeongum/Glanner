import { configureStore } from "@reduxjs/toolkit";
import plannerReducer from "./planners";
import authReducer from "./auth";

export default configureStore({
    reducer: {
        planner: plannerReducer,
        auth: authReducer
    }
})

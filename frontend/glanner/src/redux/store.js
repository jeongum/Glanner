import { configureStore } from "@reduxjs/toolkit";
import plannerReducer from "./planners";

export default configureStore({
    reducer: {
        planner: plannerReducer
    }
})

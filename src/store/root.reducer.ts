import {combineReducers} from "redux";
import {projectReducer} from "./project/project.reducer";
import {appReducer} from "./app/app.reducer";

export const rootReducer = combineReducers({
    project: projectReducer,
    app: appReducer
})

export type RootState = ReturnType<typeof rootReducer>;
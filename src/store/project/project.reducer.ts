import {FETCHED_PROJECT, FETCHED_ALL_PROJECTS, UPDATE_PROJECT, DELETE_PROJECT, SAVE_PROJECT} from "./project.types";
import {ProjectModel} from "../../model/ProjectModel";

let initialState = {
    projects: [],
    currentProject: {}
};

export const projectReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FETCHED_ALL_PROJECTS:
            return {...state, projects: action.payload}
        case FETCHED_PROJECT:
            return {...state, currentProject: action.payload}
        case DELETE_PROJECT:
            state.currentProject = {}
            return {...state, projects: state.projects.filter((project: ProjectModel) => project.id !== action.payload)}
        case UPDATE_PROJECT:
            return {
                ...state, projects: state.projects.map((project: ProjectModel) =>
                    (project.id === action.payload.id) ?
                        {...project, ...action.payload} : project
                )
            }
        case SAVE_PROJECT:
            return {...state, projects: [...state.projects, action.payload]}
        default:
            return state
    }
}

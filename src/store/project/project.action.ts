import {DELETE_PROJECT, FETCHED_ALL_PROJECTS, FETCHED_PROJECT, SAVE_PROJECT, UPDATE_PROJECT} from "./project.types";
import axios from 'axios'
import {hideLoader, showLoader} from "../app/app.action";
import {transformData} from "../../service/ProjectService";
import {ProjectModel} from "../../model/ProjectModel";
import {Dispatch} from "redux";

const baseUrl = "http://localhost:8090/projects";

export function getProjects() {
    return async (dispatch: any)  => {
        dispatch(showLoader());
        const result = await axios.get(baseUrl);
        const data = result.data._embedded.projects.map((project: ProjectModel) => {
            return transformData(project)
        })
        dispatch({type: FETCHED_ALL_PROJECTS, payload: data});
        dispatch(hideLoader());
    }
}

export function getProjectById(id: string) {
    return async (dispatch: any)  => {
        dispatch(showLoader());
        const result = await axios.get(baseUrl + '/' + id);
        dispatch({type: FETCHED_PROJECT, payload: result.data});
        dispatch(hideLoader());
    }
}

export function deleteProjectById(id: string) {
    return async (dispatch: Dispatch)  => {
        await axios.delete(baseUrl + '/' + id);
        dispatch({type: DELETE_PROJECT, payload: id});
    }
}

export function updateProject(project: ProjectModel) {
    return async (dispatch: Dispatch)  => {
        await axios.put(baseUrl + '/' + project.id,
            project,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                }
            });
        dispatch({type: UPDATE_PROJECT, payload: transformData(project)});
    }
}

export function saveProject(project: ProjectModel) {
    return async (dispatch: Dispatch)  => {
        const result = await axios.post(baseUrl,
            project,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                }
            });
        dispatch({type: SAVE_PROJECT, payload: transformData(result.data)});
    }
}
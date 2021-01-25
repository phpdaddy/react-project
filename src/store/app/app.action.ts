import {HIDE_LOADER, SHOW_LOADER} from "../project/project.types";
import {Dispatch} from "redux";

export function showLoader() {
    return (dispatch: Dispatch) => {
        dispatch({type: SHOW_LOADER});
    }
}

export function hideLoader() {
    return (dispatch: Dispatch) => {
        dispatch({type: HIDE_LOADER});
    }
}
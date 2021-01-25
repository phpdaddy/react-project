import {ProjectModel} from "../model/ProjectModel";

const transformData = (project: ProjectModel) => {
    return {
        id: (project.id) ? project.id : "",
        name: (project.status) ? project.name : "",
        status: (project.status) ? project.status : "",
        sourceLanguage: (project.sourceLanguage) ? project.sourceLanguage : "",
        dateDue: (project.dateDue) ? new Date(project.dateDue).toISOString() : "",
        targetLanguages: (project.targetLanguages.length && project.targetLanguages.length !== 0) ? project.targetLanguages : []
    }
}

export {transformData};
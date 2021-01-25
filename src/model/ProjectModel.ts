export interface ProjectModel{
    id: string,
    name: string,
    status: string,
    sourceLanguage: string,
    dateDue: string,
    targetLanguages: string[],
}
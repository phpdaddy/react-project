import React, {useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProjectById, saveProject, updateProject} from "../../store/project/project.action";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import SaveIcon from '@material-ui/icons/Save';
import {Backspace} from "@material-ui/icons";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import {FETCHED_PROJECT} from "../../store/project/project.types";
import _ from 'lodash'
import {RootState} from "../../store/root.reducer";
import {ProjectModel} from "../../model/ProjectModel";
import {createStyles, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        center: {
            alignItems: "center",
            justifyContent: "center",
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            margin: theme.spacing(1),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 160,
        },
        chip: {
            margin: 2,
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
    })
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const languages = [
    'ru',
    'en',
    'cz',
    'ua',
    'pl',
    'de',
    'cs',
    'fi',
];

export const ProjectItemForm = () => {
    const initialState: ProjectModel = {
        id: '',
        name: '',
        sourceLanguage: '',
        status: '',
        targetLanguages: [''],
        dateDue: ''
    };
    const [project, setProject] = useState<ProjectModel>(initialState);
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();

    let fetchedProject = useSelector((state: RootState) => state.project.currentProject);
    // @ts-ignore
    const {projectId} = useParams();

    useEffect(() => {
        if (projectId) {
            dispatch(getProjectById(projectId))
        }
    }, [dispatch, projectId])

    useEffect(() => {
        if (fetchedProject && !_.isEmpty(fetchedProject)) {
            const formattedDate = fetchedProject.dateDue.slice(0, 16);
            Object.assign(fetchedProject, {dateDue: formattedDate})
            setProject(fetchedProject)
        }
    }, [fetchedProject])

    const handleInputChange = (e: any) => {
        const {name, value} = e.target
        setProject({...project, [name]: value})
    }

    const resetState = () => {
        dispatch({type: FETCHED_PROJECT, payload: {...project, ...initialState}});
    };

    const addProject = () => {
        const {name, sourceLanguage, targetLanguages, dateDue} = project
        if (!name || !sourceLanguage || !targetLanguages || !dateDue) return

        //set dateDue in correct format
        Object.assign(project, {dateDue: new Date(project.dateDue).toISOString()});

        project.id ? dispatch(updateProject(project)) : dispatch(saveProject(project));

        resetState();
        history.push("/");
    }

    return (
        <div className={`${classes.container}  ${classes.center}`}>
            <Card>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Project name: {project.name}
                        </Typography>
                        <form noValidate autoComplete="off">
                            <div>
                                <TextField
                                    required
                                    label="Name"
                                    name='name'
                                    onChange={handleInputChange}
                                    id="input-project-name"
                                    className={classes.textField}
                                    value={project.name}/>
                                <TextField
                                    required
                                    label="Source Language"
                                    name='sourceLanguage'
                                    onChange={handleInputChange}
                                    id="input-project-source-language-id"
                                    className={classes.textField}
                                    value={project.sourceLanguage}/>
                            </div>
                            <div>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="Status">Status</InputLabel>
                                    <Select
                                        required
                                        labelId="Status"
                                        name='status'
                                        label="Status"
                                        id="input-project-status-id"
                                        value={project.status}
                                        onChange={handleInputChange}>
                                        <MenuItem value={"NEW"}>NEW</MenuItem>
                                        <MenuItem value={"COMPLETED"}>COMPLETED</MenuItem>
                                        <MenuItem value={"DELIVERED"}>DELIVERED</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="target-languages-label-id">Target Languages</InputLabel>
                                    <Select
                                        labelId="target-languages-label-id"
                                        id="input-project-target-language-id"
                                        multiple
                                        name='targetLanguages'
                                        value={project.targetLanguages}
                                        onChange={handleInputChange}
                                        input={<Input/>}
                                        MenuProps={MenuProps}
                                    >
                                        {languages.map((language: string) => (
                                            <MenuItem key={language} value={language}>
                                                {language}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <TextField
                                    required
                                    id="input-project-date-due-id"
                                    label="Date due"
                                    name='dateDue'
                                    onChange={handleInputChange}
                                    type="datetime-local"
                                    className={classes.textField}
                                    value={project.dateDue}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}/>
                            </div>
                        </form>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Link to={`/`}>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={resetState}
                            startIcon={<Backspace/>}>
                            Back
                        </Button>
                    </Link>
                    <Button
                        onClick={addProject}
                        variant="contained"
                        color="primary"
                        size="small"
                        type="submit"
                        startIcon={<SaveIcon/>}>
                        Save
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deleteProjectById} from "../../store/project/project.action";
import Fab from "@material-ui/core/Fab";
import {ProjectModel} from "../../model/ProjectModel";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            display: 'inline-block'
        },
    },
}));

export const AppButtonGroup = (props: { project: ProjectModel }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const deleteProject = () => {
        dispatch(deleteProjectById(props.project.id))
    }

    return (
        <div className={classes.root}>
            <Link to={`/project/${props.project.id}`}>
                <Fab size="small" color="primary" aria-label="edit">
                    <EditIcon/>
                </Fab>
            </Link>
            <Fab size="small" color="secondary" aria-label="edit"
                 onClick={deleteProject}>
                <DeleteIcon/>
            </Fab>
        </div>
    )
}

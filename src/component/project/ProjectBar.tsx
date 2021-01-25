import React from "react";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Link} from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import {ProjectModel} from "../../model/ProjectModel";
import {createStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            width: "95%",
            marginLeft: "auto",
            marginRight: "auto"
        },
        root: {
            padding: '2px 4px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: theme.spacing(2),
        },
        input: {
            margin: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: theme.spacing(2),
        },
        space: {
            margin: theme.spacing(2),
        },
    }));

export const ProjectBar = (props: { projects: ProjectModel[], onFilteredChange(value: ProjectModel[]): void }) => {
    const classes = useStyles();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.toLowerCase();
        const result = props.projects.filter(project => project.name.toLowerCase().includes(input));
        props.onFilteredChange(result);
    }

    return (
        <div>
            <div className={classes.root}>
                <Link to={`/project/create`}>
                    <Fab size="small" color="primary" aria-label="add" className={classes.space}>
                        <AddIcon/>
                    </Fab>
                </Link>
                <Paper component="form">
                    <InputBase
                        onChange={handleInputChange}
                        className={classes.input}
                        placeholder="Search project"/>
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon/>
                    </IconButton>
                </Paper>
            </div>
        </div>
    )
}
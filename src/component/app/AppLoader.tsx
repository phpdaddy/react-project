import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

export const AppLoader = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CircularProgress color="secondary"/>
        </div>
    )
}

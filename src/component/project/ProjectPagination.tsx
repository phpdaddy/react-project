import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Pagination from "@material-ui/lab/Pagination";
import {createStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
        '& > *': {
            marginTop: theme.spacing(2),
            alignItems: "center",
            justifyContent: "center",
            display: 'flex',

        },
    },
}));

export const ProjectPagination = (props: { projectsPerPage: number, totalProjects: number, currentPage: number, page(value: number): void }) => {
    const pageNumbers = Math.round(props.totalProjects / props.projectsPerPage);
    const classes = useStyles();

    const handlePageChange = (event: any, value: number) => {
        props.page(value);
    }

    return (
        <div className={classes.root}>
            <Pagination count={pageNumbers}
                        page={props.currentPage}
                        onChange={handlePageChange}
                        color="primary"/>
        </div>
    );
}
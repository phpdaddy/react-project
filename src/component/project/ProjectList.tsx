import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProjects} from "../../store/project/project.action";
import {AppLoader} from "../app/AppLoader";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import ProjectItem from "./ProjectItem";
import Paper from "@material-ui/core/Paper";
import StyledTableCell from "./StyledTableCell";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {ProjectBar} from "./ProjectBar";
import {ProjectPagination} from "./ProjectPagination";
import _ from 'lodash'
import {ProjectModel} from "../../model/ProjectModel";
import {RootState} from "../../store/root.reducer";
import {Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    table: {
        marginLeft: "auto",
        marginRight: "auto",
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

export const ProjectList = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const projects = useSelector((state: RootState) => state.project.projects);
    const isLoader = useSelector((state: RootState) => state.app.isLoader);

    const [tableHeaders, setTableHeaders] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage] = useState(5);
    const [currentProjects, setCurrentProjects] = useState<ProjectModel[]>([]);

    const indexOfLastPost = currentPage * projectsPerPage;
    const indexOfFirstPost = indexOfLastPost - projectsPerPage;

    useEffect(() => {
        if (!projects.length) {
            dispatch(getProjects())
        }
    }, [dispatch])

    useEffect(() => {
        setCurrentProjects(projects.slice(indexOfFirstPost, indexOfLastPost));
    }, [projects, currentPage])

    if (!_.isEmpty(currentProjects) && _.isEmpty(tableHeaders)) {
        setTableHeaders({...currentProjects[0]});
    }

    if (!currentProjects.length || isLoader) {
        return <AppLoader/>
    }

    const page = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleFilteredList = (filtered: ProjectModel[]) => {
        setCurrentProjects(filtered.slice(indexOfFirstPost, indexOfLastPost));
    }

    return (
        <div>
            <ProjectBar onFilteredChange={handleFilteredList} projects={projects}/>
            <Paper elevation={5} className={classes.paper}>
                <TableContainer className={classes.table}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {
                                    Object.keys(tableHeaders).map((key, index) => {
                                        return <StyledTableCell key={index}>{key}</StyledTableCell>
                                    })
                                }
                                <StyledTableCell align="right">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentProjects.map(project => {
                                return (
                                    <ProjectItem project={project} key={project.id}/>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <ProjectPagination projectsPerPage={projectsPerPage}
                                   totalProjects={projects.length}
                                   currentPage={currentPage}
                                   page={page}/>
            </Paper>
        </div>
    )
}

export default (ProjectList);
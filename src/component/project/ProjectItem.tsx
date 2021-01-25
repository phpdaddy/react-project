import React from "react";
import TableRow from "@material-ui/core/TableRow";
import withStyles from "@material-ui/core/styles/withStyles";
import StyledTableCell from "./StyledTableCell";
import {AppButtonGroup} from "../app/AppButtonGroup";
import {ProjectModel} from "../../model/ProjectModel";
import {Theme} from "@material-ui/core";

const StyledTableRow = withStyles((theme: Theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const ProjectItem = (props: {project: ProjectModel}) => {
    return (
        <StyledTableRow key={props.project.id}>
            {Object.values(props.project).map((value: any, index: number) => {
                return <StyledTableCell key={index}>{value}</StyledTableCell>
            })}
            <StyledTableCell align="right">
                <AppButtonGroup project={props.project} key={props.project.id}/>
            </StyledTableCell>
        </StyledTableRow>
    )
}

export default ProjectItem
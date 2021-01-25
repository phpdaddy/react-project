import {BrowserRouter, Route, Switch,} from "react-router-dom";
import React from "react";
import ProjectList from "../component/project/ProjectList";
import {ProjectItemForm} from "../component/project/ProjectItemForm";

export default function Router() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={ProjectList}/>
                    <Route exact path="/project/create" component={ProjectItemForm}/>
                    <Route exact path="/project/:projectId" component={ProjectItemForm}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}
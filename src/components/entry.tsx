import { ProjectProp } from "./projects";
import React from "react";


const Entry = (project: ProjectProp) => {
    return (
        <div>
            <a> {project.name} </a>
        </div>
    );
}


export default Entry;
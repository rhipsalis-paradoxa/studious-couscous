import React from "react";
import Projects from "../components/projects";
import SideBar from "../components/sideBar";
import styles from "../styles/home.module.css"

// import { ProjectProp } from "../components/projects";

export {};

// type ProjectProp = {
//     name: string,
//     dateLastModified: string,
//     id: string;
// }


interface ProjectProp {
    name: string,
    dateLastModified: Date,
    id?: string;
    code?: string;
}


/* 
Sorts date in descending orders (most recently accessed first)
Updates 
*/
const sortDate = (project1: ProjectProp, project2: ProjectProp) => {
    const proj1Time = (new Date(project1.dateLastModified)).getTime(); 
    const proj2Time = (new Date(project2.dateLastModified)).getTime(); 
    return (proj2Time - proj1Time);
}


const RecentlyDeleted = () => {

    const initial: ProjectProp[] = [];

    const [deletedProjects, setDeletedProjects] = React.useState(() => {
        // save all projects in local storage so we don't lose everything.... 
        const item = JSON.parse(localStorage.getItem('deleted-projects')!)
        return item || initial;
    });
    
    React.useEffect(() => {
        localStorage.setItem('deleted-projects', JSON.stringify(deletedProjects));
    }, [deletedProjects]);


    // delete a project by filtering it out with the ID
    const removeProject = (toRemove: ProjectProp) => {
        console.log("getting rid of shit")
        const updatedProjects: ProjectProp[] = (deletedProjects.filter((proj: ProjectProp) => proj.id != toRemove.id))

        setDeletedProjects(updatedProjects)
        localStorage.setItem('deleted-projects', JSON.stringify(updatedProjects));
    }

    const recoverProject = (toRecover: ProjectProp) => {
        // filter out the project to recover 
        const updatedProjects: ProjectProp[] = (deletedProjects.filter((proj: ProjectProp) => proj.id != toRecover.id))

        localStorage.setItem('deleted-projects', JSON.stringify(updatedProjects));
        setDeletedProjects(updatedProjects);

        // get the current list of curr projects and add the new one two it
        const initial: ProjectProp[] = []
        const projects: ProjectProp[] = JSON.parse(localStorage.getItem('projects')!) || initial;

        const updatedCurrProjects: ProjectProp [] = [
            toRecover, 
            ...projects 
        ]
        localStorage.setItem('projects', JSON.stringify(updatedCurrProjects));
    }

    /*
        Creates a new project
        Adds it to local storage 
        Adds it to list 
     */
    // const addProject = (title: string) => {
    //     //const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    //     const updatedProjects: ProjectProp[] = [
    //         {
    //             name: title, 
    //             dateLastModified: new Date(),
    //             id: uuidv4().toString(),
    //             code: ""
    //         },
    //         ...projects
    //     ];
    //     localStorage.setItem('projects', JSON.stringify(updatedProjects));
    //     setProjects(updatedProjects);
    // }



    return (
        <div className={styles.home}>
            <SideBar isOnDeleted={true}/>
            {/* <form method="submit" onSubmit={HandleSubmit}>
                <input name="code" type="code" />
                <button type="submit">Submit</button>
            </form> */}
            <Projects projects={deletedProjects} isOnHome={false} handleDelete={removeProject} handleRecover={recoverProject}/>
        </div>
    );


}

export default RecentlyDeleted;

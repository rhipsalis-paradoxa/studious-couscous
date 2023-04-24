import React from "react";
import Projects from "../components/projects";
import SideBar from "../components/sideBar";
import styles from "../styles/home.module.css"
import { v4 as uuidv4 } from 'uuid';
import Modal from "../components/modal";
// import { ProjectProp } from "../components/projects";

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


const Home = () => {

    const initial: ProjectProp[] = [];

    const [projects, setProjects] = React.useState( () => {
        // save all projects in local storage so we don't lose everything.... 
        const item = JSON.parse(localStorage.getItem('projects')!)
        return item || initial;
    });

    const [modal, setModal] = React.useState(false);

    
    React.useEffect(() => {
        localStorage.setItem('projects', JSON.stringify(projects));
    }, [projects]);


    // delete a project by filtering it out with the ID
    const deleteProject = (toDelete: ProjectProp) => {
        // filter out the project to delete 
        const updatedProjects: ProjectProp[] = (projects.filter((proj: ProjectProp) => proj.id != toDelete.id))

        localStorage.setItem('projects', JSON.stringify(updatedProjects));
        setProjects(updatedProjects);

        // get the current list of deleted projects and add the new one two it
        const initialDeleted: ProjectProp[] = []
        const deletedProjects: ProjectProp[] = JSON.parse(localStorage.getItem('deleted-projects')!) || initialDeleted;

        const updatedDeletedProjects: ProjectProp [] = [
            toDelete, 
            ...deletedProjects 
        ]
        localStorage.setItem('deleted-projects', JSON.stringify(updatedDeletedProjects));

    }

    // when user accesses a project, replace the date 
    const updateDate = (project: ProjectProp) => {

        /**
         * Replace the project with updated date 
         */
        const toReplaceId = project.id
        const updatedProject = {
            name: project.name,
            dateLastModified: new Date(), 
            id: project.id,
            code: project.code
        }
        /*
         *  Replace the project with the updated Date 
         */
        let updatedProjects: ProjectProp[] = (projects.map((project: ProjectProp) => {
            if(project.id == toReplaceId) {
                return updatedProject 
            } else {
                return project
            }
        }))

        updatedProjects = updatedProjects.sort(sortDate)
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
        setProjects(updatedProjects)
    }


	const handleCreateAndAdd = (title: string, id:string) => {
		addProject(title, id);
	}

	const closeModal = () => {
		setModal(!modal)
	}

    const openModal = () => setModal(!modal);
    /*
        Creates a new project
        Adds it to local storage 
        Adds it to list 
     */
    const addProject = (title: string, id: string) => {

        const updatedProjects: ProjectProp[] = [
            {
                name: title, 
                dateLastModified: new Date(),
                id: id,
                code: ""
            },
            ...projects
        ];
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
        setProjects(updatedProjects);
    }

    const copyProject = (project: ProjectProp, title: string) => {
        // want to open modal to do this 
        const updatedProjects: ProjectProp[] = [
            {
                name: title, 
                dateLastModified: new Date(),
                id: uuidv4().toString(),
                code: project.code
            },
            ...projects
        ];
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
        setProjects(updatedProjects);
    }

    const renameProject = (project: ProjectProp, title: string) => {

        const id = project.id
        const updatedProject = {
            name: title,
            dateLastModified: project.dateLastModified,
            id: project.id,
            code: project.code
        }
        /*
         *  Replace the project with the updated Date 
         */
        let updatedProjects: ProjectProp[] = (projects.map((project: ProjectProp) => {
            if(project.id == id) {
                return updatedProject 
            } else {
                return project
            }
        }))

        localStorage.setItem('projects', JSON.stringify(updatedProjects));
        setProjects(updatedProjects)
    }


    return (
        <div className={styles.home}>
            <Modal show={modal} handleClose={closeModal} handleAddProject={handleCreateAndAdd} isCopy={false}/>
            <SideBar isOnEditor={false} addNewProject={addProject} openModal={openModal}/>
            {/* <form method="submit" onSubmit={HandleSubmit}>
                <input name="code" type="code" />
                <button type="submit">Submit</button>
            </form> */}
            <Projects projects={projects} isOnHome={true} handleDelete={deleteProject} 
                      updateDate={updateDate} handleCopy={copyProject} handleRename={renameProject}/>
        </div>
    );


}

export default Home;

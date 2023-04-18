import React from "react";
import styles from "../styles/projects.module.css"
import IconButton from "./iconButton";
import Trash from "./TrashIcon.png"
import Copy from "./copy-icon.png"
import Rename from "./rename-icon.png";
import Recovery from "./recovery-icon.png"
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "./confirmDeleteModal";

// import Stack from '@mui/material/stack';

/**
 * List of projects on the home page. 
 * Takes in an array of ProjectProps 
 * Displays each of them as an entry 
 * 
 * returns the list of projects the user currently has
 */

/*
 * Props to Projects component 
 * contains the name of the project
 * and the date last modified  
 */
export interface ProjectProp {
    name: string,
    dateLastModified: Date,
    id?: string,
    code?: string
}

interface ProjectsList {
    projects: ProjectProp[];
    isOnHome: boolean;
    updateDate?: (project: ProjectProp) => void;
    handleDelete: (project: ProjectProp ) => void;
    handleRecover?: (project: ProjectProp ) => void;
}


/**
 * 
 * @param 
 *      props: stuff needed to create the list of projects 
 * @returns 
 */
const Projects = (props: ProjectsList) => {   
    const [modal, setModal] = React.useState(false);

    const closeModal = () => {
		setModal(!modal)
	}

    const openModal = () => setModal(!modal);

    let dateHeader = props.isOnHome ? "Date Last Modified" : "Date Deleted"

    const entries = props.projects.map(proj => makeEntry(proj, props.isOnHome, props.updateDate!, props.handleDelete, props.handleRecover!))

    return(
        <>
            <div className={styles.header}>
                <div className={styles.projecttitle}> Project Name </div>
                <div className={styles.projectdate}> {dateHeader} </div>
                <div className={styles.actions}> Actions </div>
            </div>
            <div className={styles.projs}>
                {entries}
            </div>
        </>
    );
}


// type oneProjectProp = {
//     project: ProjectProp
//     updateDate: (project: ProjectProp) => void;
//     handleYes: (project: ProjectProp) => void
//     handleNo: () => void
// }


const makeEntry = (project: ProjectProp, 
                   isOnHome: boolean, 
                   updateDate: (project: ProjectProp) => void, 
                   handleDelete: (project: ProjectProp) => void,
                   handleRecover?: (project: ProjectProp) => void ) => {
    return (
        <ProjectEntry  project={project} updateDate={updateDate} handleDelete={handleDelete} isOnHome={isOnHome} handleRecover={handleRecover!} />
    );
}

interface EntryProps {
    project: ProjectProp,
    isOnHome: boolean,
    updateDate: (project: ProjectProp) => void;
    handleDelete: (project: ProjectProp) => void;
    handleRecover?: (project: ProjectProp) => void;
}

/**
 * oooo! 
 * @param project: information about the projec t 
 * @param updateDate: function that updates dateLastModified to current date and time 
 * @param handleDelete: function that handles Delete
 * @returns a single project line 
 */
const ProjectEntry = ({project, isOnHome, updateDate, handleDelete, handleRecover}: EntryProps) => {
    const name = project.name 
    const dateLastModified = project.dateLastModified
    let path = "/editor/" + name;
    const navigate = useNavigate();
    const onClick = () => {
        updateDate(project);
        navigate(path); 

    }

    // at a single project entry 

    // const askConfirmationDelete = () => {

    // }

    // storing things as dates messes up its type :( but casting is our friend 
    const stringDate = (new Date(dateLastModified)).toLocaleDateString()
    

    const onClickTrash = () => {
        console.log("bruh")
        handleDelete(project)
    }

    const onClickRecover = () => {
        console.log("recovering!")
        handleRecover!(project)
    }

    if (isOnHome) {
        return (
            <>
                <div className={styles.project}>
                    <div className={styles.projecttitle} onClick={onClick}> {name} </div>
                    <div className={styles.projectdate}> {stringDate} </div>
                    <div className={styles.actions}>
                        <IconButton src={Rename}/> <IconButton src={Copy}/>  <IconButton src={Trash} onClick={onClickTrash} />
                    </div>
                </div>
            </>
        );
    } else {
        // recently deleted page is a litte different
        return (
            <>
                <div className={styles.project}>
                    <div className={styles.projecttitle} > {name} </div>
                    <div className={styles.projectdate}> {stringDate} </div>
                    <div className={styles.actions}>
                        <IconButton src={Recovery} onClick={onClickRecover} /><IconButton src={Trash} onClick={onClickTrash}/>
                    </div>
                </div>
            </>
        );
    }

}


export default Projects
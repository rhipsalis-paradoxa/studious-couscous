import React from "react";
import styles from "../styles/projects.module.css"
import IconButton from "./iconButton";
import Trash from "./TrashIcon.png"
import Copy from "./copy-icon.png"
import Rename from "./rename-icon.png";
import Recovery from "./recovery-icon.png"
import { useNavigate } from "react-router-dom";
import Modal from "./modal";

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
    handleRename?: (project: ProjectProp, title: string) => void,
    handleCopy?: (project: ProjectProp, title: string) => void,
}


/**
 * 
 * @param 
 *      props: stuff needed to create the list of projects 
 * @returns 
 */
const Projects = (props: ProjectsList) => {   
    console.log("home rendered")

    let dateHeader = props.isOnHome ? "Date Last Modified" : "Date Deleted"

    const entries = props.projects.map(proj => makeEntry(proj, props.isOnHome, props.updateDate!, props.handleDelete, props.handleRecover!, props.handleCopy!, props.handleRename!))

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
                   handleRecover?: (project: ProjectProp) => void, 
                   handleCopy?: (project: ProjectProp, title: string) => void, 
                   handleRename?: (project: ProjectProp, title: string) => void ) => {
    return (
        <ProjectEntry  project={project} 
                       updateDate={updateDate} 
                       handleDelete={handleDelete} 
                       isOnHome={isOnHome} 
                       handleRecover={handleRecover!} 
                       handleCopy={handleCopy!}
                       handleRename={handleRename!} />
    );
}

interface EntryProps {
    project: ProjectProp,
    isOnHome: boolean,
    updateDate: (project: ProjectProp) => void;
    handleDelete: (project: ProjectProp) => void;
    handleRecover?: (project: ProjectProp) => void;
    handleCopy?: (project: ProjectProp, title:string) => void;
    handleRename: (project: ProjectProp, title:string) => void;
}

/**
 * oooo! 
 * @param project: information about the projec t 
 * @param updateDate: function that updates dateLastModified to current date and time 
 * @param handleDelete: function that handles Delete
 * @returns a single project line 
 */
const ProjectEntry = ({project, isOnHome, updateDate, handleDelete, handleRecover, handleCopy, handleRename}: EntryProps) => {
    const name = project.name 
    const dateLastModified = project.dateLastModified
    let path = "/editor/" + name;
    const navigate = useNavigate();
    const onClick = () => {
        updateDate(project);
        navigate(path); 

    }


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

    const [copymodal, setCopyModal] = React.useState(false);
    const [renamemodal, setRenameModal] = React.useState(false);


    const toggleCopyModal = () => {
        setCopyModal(!copymodal)
    }

    const toggleRenameModal = () => {
        setRenameModal(!renamemodal)
    }



    if (isOnHome) {
        return (
            <>  
                <Modal show={copymodal} handleClose={toggleCopyModal} handleCopy={handleCopy} project={project} isCopy={true}/>
                <Modal show={renamemodal} handleClose={toggleRenameModal} handleRename={handleRename} project={project} isRename={true}/>
                <div className={styles.project}>
                    <div className={styles.projecttitle} onClick={onClick}> {name} </div>
                    <div className={styles.projectdate}> {stringDate} </div>
                    <div className={styles.actions}>
                        <IconButton src={Rename} onClick={toggleRenameModal}/> <IconButton src={Copy} onClick={toggleCopyModal}/>  <IconButton src={Trash} onClick={onClickTrash} />
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
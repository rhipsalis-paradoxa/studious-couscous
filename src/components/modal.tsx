import React from "react";
import styles from "../styles/modal.module.css"
import ActionButton from "./actionButton";
import { useNavigate } from "react-router-dom";
import { ProjectProp } from "./projects";

interface ModalProps {
    show: boolean;
    handleClose: () => void;
    handleAddProject?: (title:string) => void
    handleCopy?: (project: ProjectProp, title: string) => void 
    handleRename?: (project: ProjectProp, title: string) => void
    isCopy?: boolean
    isRename?: boolean
    project?: ProjectProp
}

type modalInformation = {
    modalText: string 
    buttonConfirm: () => void,
    buttonDeny: () => void, 
    buttonConfirmText: string,
    buttonDenyText: string
}

const Modal = ({show, handleClose, handleAddProject, handleCopy, handleRename, isCopy, isRename, project}: ModalProps) => {

    const [title, setTitle] = React.useState('')

    const handleChange = (event: any) => {
        setTitle(event.target.value);
    } 

    const navigate = useNavigate();

    const addAndNavigate = () => {
        console.log(title);
        const path = "/editor/" + title;
        if (isCopy) {
            handleCopy!(project!, title)
        } else {
            handleAddProject!(title)
        }

        setTitle('');
        handleClose()
        navigate(path);
    }

    const renameProject = () => {
        handleRename!(project!, title)
        setTitle('');
        handleClose()
    }

    const closer = () => {
        setTitle('')
        handleClose()
    }



    let ModalInfo;
    if (isCopy) {
        ModalInfo = {
            modalText: "Create Copy under new name", 
            buttonConfirm: addAndNavigate,
            buttonDeny: closer,
            buttonConfirmText: "Copy Project",
            buttonDenyText: "Cancel"
        }
    } else if (isRename) {
        ModalInfo = {
            modalText: "Rename Project", 
            buttonConfirm: renameProject,
            buttonDeny: closer,
            buttonConfirmText: "Rename",
            buttonDenyText: "Cancel"
        }
    } else {
        ModalInfo = {
            modalText: "Create New Project", 
            buttonConfirm: addAndNavigate,
            buttonDeny: closer,
            buttonConfirmText: "Create New Project",
            buttonDenyText: "Cancel"
        }; 
    }



    return (
            <>
            {
                show 
                ?
                <div className={styles.modalContainer}>
                    <div className={styles.modal}> 
                        <div className={styles.header}>{ModalInfo.modalText}</div>
                        <div>
                        <input className={styles.input} name="project-title" placeholder="Enter a project name..." value={title} onChange={handleChange}/>
                        </div>
                        <div className={styles.footer}>
                            <ActionButton handleClick={ModalInfo.buttonDeny} text={ModalInfo.buttonDenyText} inline={true}/> 
                            <ActionButton handleClick={ModalInfo.buttonConfirm} text={ModalInfo.buttonConfirmText} inline={true}/>
                        </div>
                    </div> 
                </div>
                : null
            }
            </>
    );

}

export default Modal; 
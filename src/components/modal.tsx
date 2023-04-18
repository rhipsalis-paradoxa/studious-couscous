import React from "react";
import styles from "../styles/modal.module.css"
import ActionButton from "./actionButton";
import { useNavigate } from "react-router-dom";

interface ModalProps {
    show: boolean;
    handleClose: () => void;
    handleAddProject: (title:string) => void;
}


const Modal = ({show, handleClose, handleAddProject}: ModalProps) => {
    const [title, setTitle] = React.useState('')

    const handleChange = (event: any) => {
        setTitle(event.target.value);
    } 

    const navigate = useNavigate();

    const addAndNavigate = () => {
        console.log(title);
        const path = "/editor/" + title;
        handleAddProject(title)
        setTitle('');
        handleClose()
        navigate(path);
    }

    const closer = () => {
        setTitle('')
        handleClose()
    }


    return (
            <>
            {
                show 
                ?
                <div className={styles.modalContainer}>
                    <div className={styles.modal}> 
                        <div>Create New Project</div>
                        <input name="project-title" placeholder="Enter a project name..." value={title} onChange={handleChange}/>
                        <div>
                            <ActionButton handleClick={closer} text="Close Modal" inline={true}/> 
                            <ActionButton handleClick={addAndNavigate} text="Create" inline={true}/>
                        </div>
                    </div> 

                </div>
                : null
            }
            </>
    );

}


const titleField = () => {

}

export default Modal; 
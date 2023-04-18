import React from 'react'
import styles from "../styles/modal.module.css"
import ActionButton from './actionButton';
import { ProjectProp } from './projects';


interface ModalProps {
    show: boolean;
    // project: ProjectProp
    handleYes?: (project: ProjectProp) => void;
    handleNo?: () => void;
}


const ConfirmDeleteModal = ({show}: ModalProps) => {
    return (
        <>
        {
            show 
            ?
            <div className={styles.modalContainer}>
                <div className={styles.modal}> 
                    <div>are you sure you want to delete this</div>
                    <div>
                        {/* <ActionButton handleClick={handleClose} text="Close Modal" inline={true}/> 
                        <ActionButton handleClick={addAndNavigate} text="Create" inline={true}/> */}
                    </div>
                </div> 

            </div>
            : null
        }
        </>
    );
}

export default ConfirmDeleteModal;

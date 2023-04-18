import React from "react";
import styles from "../styles/button.module.css";
import { Navigate, useNavigate } from "react-router-dom";


export interface buttonProps {
    text: string;
    onEditor?: boolean;
    openModal: () => void;
}

// on click: 
//     show modal   
//     then in modal 
//     we Navigate

const NewProjectButton = (props:buttonProps) => {
    const path = props.onEditor ? "/" : "/editor/newproj";

    const text = props.text;
    return (
        <button className={styles.navButton}
                onClick={() => props.openModal()}> New Project </button>
    );
} 







export default NewProjectButton
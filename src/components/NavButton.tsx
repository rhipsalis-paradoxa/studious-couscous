import React from "react";
import styles from "../styles/button.module.css";
import { useNavigate } from "react-router-dom";


export interface buttonProps {
    text: string;
    onEditor?: boolean
}


const NavButton = (props:buttonProps) => {
    const path = props.onEditor ? "/" : "/editor/newproj";
    const navigate = useNavigate();

    const text = props.text;
    return (
        <button className={styles.navButton}
                onClick={() => navigate(path)}> {text} </button>
    );
} 







export default NavButton
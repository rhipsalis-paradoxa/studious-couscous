import React from "react";
import styles from "../styles/button.module.css";
import { useNavigate } from "react-router-dom";


export interface buttonProps {
    text: string;
    handleClick: () => void
}


const NavButton = (props:buttonProps) => {
    const path = "/"
    const navigate = useNavigate();

    const onClick = () => {
        props.handleClick();
        navigate(path)
    }

    const text = props.text;
    return (
        <button className={styles.navButton}
                onClick={onClick}> {text} </button>
    );
} 







export default NavButton
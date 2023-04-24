import React from "react";
import styles from "../styles/button.module.css";

export interface buttonProps {
    handleClick: () => void;
    text: string
    inline?: boolean;
}

const ActionButton = ({handleClick, text, inline}: buttonProps) => {
    return (
        <button id={styles.navButton}
                onClick={() => handleClick()}> {text}</button>
    );
} 


export default ActionButton

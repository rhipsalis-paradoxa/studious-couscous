import React from "react";
import styles from "./button.module.css"
import { useNavigate } from "react-router-dom";

export interface buttonProps {
    handleClick: () => void;
    text: string
    inline?: boolean;
}

const ActionButton = ({handleClick, text, inline}: buttonProps) => {

    const style = inline ? styles.inlineButton : styles.navButton
    return (
        <button className={styles.borkButton}
                onClick={() => handleClick()}> {text} </button>
    );
} 


export default ActionButton

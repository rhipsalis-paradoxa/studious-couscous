import React from "react";
import styles from "../styles/button.module.css";

interface imageSrc {
    src: string
    onClick?: () => void;
}

const IconButton = ({src, onClick}: imageSrc) => {

    return (
        <button className={styles.iconButton}>
            {/* TODO THIS IS NOT GONNA WORK */}
            <img className={styles.icon} src={src} onClick={onClick}/> 
        </button>
    )
}

export default IconButton;



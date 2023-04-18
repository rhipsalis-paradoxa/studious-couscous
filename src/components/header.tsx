import styles from "../styles/header.module.css";
import React from "react";


interface HeaderProps {
    title?: string;
}

const Header = ({ title }: HeaderProps) => {
    return (
        <>
            <div className={styles.header}> {title} </div>
        </>
    );
}

export default Header;
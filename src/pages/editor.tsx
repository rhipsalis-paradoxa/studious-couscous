import React from "react";
import { useParams } from "react-router-dom";

import NavBar from "../components/sideNavBar";

import styles from "../styles/home.module.css";
import { exec } from "child_process";

// if this is a page we have to pass the info in 
// as a param along with the route  
const Editor = () => {
    const { title } = useParams();
    console.log(title);

    return (
        <div className={styles.home}>
            <NavBar isOnEditor={true}/>
            <div>
                <h2> EDITOR </h2> 
                <a> {title} </a>
            </div>
        <p></p><p></p><p></p>
        <p></p><p>MusiCode Code</p><p>PDF Output</p><p></p>
        <form method="post" onSubmit={handleCompile}>
            <textarea
                name="userInput"
                rows={40} cols={80}
            />
            <button name="PDFbutton" type="submit" value="Compile to PDF" />
            <button name="MIDIbutton" type="submit" value="Compile to MIDI" />
        </form>
        </div>
    );
}

function handleCompile(event: { preventDefault: () => void; target: any; }) {
    event.preventDefault();

    // get user input
    const form = event.target;
    const formData = new FormData(form);
    const formJSON = Object.fromEntries(formData.entries());
    const userInput = formJSON['userInput'];
    // console.log(userInput);

    // PDF or MIDI
    // TODO: Tina you gotta help me with this
    // if (isset($_POST['PDFbutton'])) {
    //     
    // }



    // exedc("../python/transpiler.py " + e.)
}

export default Editor;
import React, { FormEventHandler } from "react";
import { useParams } from "react-router-dom";

import NavBar from "../components/sideNavBar";

import styles from "../styles/home.module.css";

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
        <form id="userInputForm" method="post" onSubmit={handleCompile}>
            <textarea
                name="userInput"
                rows={39} cols={80}
            />
            <button name="PDFbutton" type="submit"> Generate PDF </button>
            <button name="MIDIbutton" type="submit"> Generate MIDI </button>
        </form>
        </div>
    );
}

function handleCompile(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    // get user input
    const form = event.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJSON = Object.fromEntries(formData.entries());
    const userInput = formJSON['userInput'];

    // PDF or MIDI
    let submitter: HTMLElement | null = (event.nativeEvent as SubmitEvent).submitter;
    let generate: string = "";
    if (submitter == null) {
        throw new Error("Invalid MusiCode form submission type.\n");
    } else if (submitter.innerText == "Generate PDF") {
        generate = "PDF";
    } else if (submitter.innerText == "Generate MIDI") {
        generate = "MIDI";
    } else {
        throw new Error("MusiCode cannot generate this kind of file.\n")
    }

    console.log(userInput);
    console.log(generate);

}

export default Editor;
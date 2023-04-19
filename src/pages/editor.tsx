import React, { FormEventHandler, useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
import { useParams } from "react-router-dom";

import SideBar from "../components/sideBar";

import styles from "../styles/home.module.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// if this is a page we have to pass the info in 
// as a param along with the route  
const Editor = () => {
    const { title } = useParams();
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }: any) {
        setNumPages(numPages);
      }

    const test = (thing: string) => {
        console.log("heyyy hi lmao omg hiiiii ")
        console.log(thing)
    }

    return (
        <div className={styles.home}>
            <SideBar isOnEditor={true} addNewProject={test}/>
            <div>
                <h2> EDITOR </h2> 
                <a> {title} </a>
            </div>
        <p></p><p></p><p></p>
        <p>MusiCode Code</p><p>PDF Output</p><p></p>
        <form id="userInputForm" method="post" onSubmit={handleCompile} action="http://localhost:5000/transpile">
            <textarea
                name="userInput"
                rows={39} cols={80}
            />
            <button name="PDFbutton" type="submit"> Generate PDF </button>
            <button name="MIDIbutton" type="submit"> Generate MIDI </button>
            <p id="transpiler_error"></p>
        </form>
        <Document file={"./my_song.pdf"} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
        </Document>
        {/* <p>
            Page {pageNumber} of {numPages}
        </p> */}
        {/* <iframe
            title="file"
            style={{ width: '100%', height: '100%' }}
            src="./my_song.pdf"
        /> */}
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

    fetch('http://localhost:5000/transpile', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'user_input': userInput.toString(), 'generate': generate})
    }).then(res => {return res.json().then(handleTranspiledData)});
}

function handleTranspiledData(data: any) {
    document.getElementById('transpiler_error')!.innerText = data['error'];
}

export default Editor;
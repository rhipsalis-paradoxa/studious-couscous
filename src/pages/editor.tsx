import React, { FormEventHandler, useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import { useParams } from "react-router-dom";
import { ProjectProp } from "../components/projects";

import SideBar from "../components/sideBar";

import styles from "../styles/editor.module.css";
import buttonStyles from "../styles/button.module.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Editor = () => {
    console.log("rendering editor")
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [midi, updateMidi] = useState(false);

    function onDocumentLoadSuccess({ numPages }: any) {
        setNumPages(numPages);
      }
    const { title, id } = useParams();
    const snake_title = title!.replace(" ", "_");

    const [code, setCode] = React.useState(() => {
        // save all projects in local storage so we don't lose everything.... 
        const projects = JSON.parse(localStorage.getItem('projects')!)
        const currProject = projects.find((proj: ProjectProp) => proj.id == id);
        if (currProject == undefined) {
            return ""
        } else {
            return currProject.code;
        }
        
    });

    const handleChange = (event: any) => {
        setCode(event.target.value);
    } 


    const updateProjectCode = () => {
        const projects = JSON.parse(localStorage.getItem('projects')!)
        const toUpdate = projects.find((proj: ProjectProp) => proj.id == id);
        console.log("grabbing code ", code);

        const updatedProject: ProjectProp = {
            name: toUpdate.name, 
            dateLastModified: toUpdate.dateLastModified, 
            id: toUpdate.id, 
            code: code
        }

        const updatedProjects: ProjectProp[] = (projects.map((project: ProjectProp) => {
            if(project.id == id) {
                return updatedProject 
            } else {
                return project
            }
        }))
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
    }


    // function handleCompile(event: React.SyntheticEvent<HTMLFormElement>) {
    //     event.preventDefault();
    //     updateProjectCode();

    //     // get user input
    //     const form = event.target;
    //     const formData = new FormData(form as HTMLFormElement);
    //     const formJSON = Object.fromEntries(formData.entries());
    //     const userInput = formJSON['code'];
    
    //     // PDF or MIDI
    //     let submitter: HTMLElement | null = (event.nativeEvent as SubmitEvent).submitter;
    //     let generate: string = "";
    //     if (submitter == null) {
    //         throw new Error("Invalid MusiCode form submission type.\n");
    //     } else if (submitter.innerText == "Generate PDF") {
    //         generate = "PDF";
    //     } else if (submitter.innerText == "Generate MIDI") {
    //         generate = "MIDI";
    //     } else {
    //         throw new Error("MusiCode cannot generate this kind of file.\n")
    //     }

    //     fetch('http://localhost:5000/transpile', {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({'user_input': userInput.toString(), 'generate': generate})
    //     }).then((res => res.json())).then(handleTranspiledData));
    // }

    const handleGeneratePDF = () => {
        // event.preventDefault();
        updateProjectCode();

        fetch('http://localhost:5000/transpile', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'user_input': code.toString(), 'generate': "PDF", 'project_title': snake_title})
        }).then((res => res.json())).then(handleTranspiledData);
    }

    const downloadMidi = () => {
        console.log("ASDFAKDSF")
        updateProjectCode();
        console.log("initial midi:", midi);
        updateMidi(!midi);
        // console.log("after setting midi once:", midi)
        // //updateMidi(!midi)
        // console.log("please be reset", midi);
    }

    const handleGenerateMIDI = () => {
        // event.preventDefault();
        updateProjectCode();

        // render the iframe 
        fetch('http://localhost:5000/transpile', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'user_input': code.toString(), 'generate': 'MIDI', 'project_title': snake_title})
        })
        .then((res => res.json()))
        .then(handleTranspiledData);
    }


    return (
        <div className={styles.editorPage}>
            <SideBar isOnEditor={true} updateProjectCode={updateProjectCode}/>
            {midi && <iframe src="my_song.mid"></iframe>}
            <div className={styles.projectTitle}>
                <div className={styles.projectText}>{title}</div>
            </div>
            <div className={styles.input}>
                <form id="userInputForm" method="post" >
                    <textarea className={styles.editor} name="code" onChange={handleChange} value={code}/>
                    <p id="transpiler_error"></p>
                </form>
            </div>
            <div className={styles.buttonHeader}>
                <button className={buttonStyles.lineButton} name="PDFbutton" type="button" onClick={handleGeneratePDF}> Generate PDF </button>
                <button className={buttonStyles.lineButton}name="MIDIbutton" type="button" onClick={handleGenerateMIDI}> Generate MIDI </button>
            </div>
            <div className={styles.output}>
                <Document file={"http://localhost:3000/" + snake_title + ".pdf"} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} />
                </Document>
            </div>
            {/* <iframe src="https://stackoverflow.com/questions/45165477/javascript-downloading-a-file-using-iframe-and-then-removing-it"></iframe>  */}
        </div>
    );

    
    function handleTranspiledData(data: any) {
        document.getElementById('transpiler_error')!.innerText = data['error'];
        
        if (data['midi']) {
            window.open("http://localhost:3000/" + snake_title + ".mid", "_blank")!.focus();
        } else {
            window.location.reload();
        }
    }
}


export default Editor;

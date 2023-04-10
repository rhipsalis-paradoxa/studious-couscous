import React, { useState } from "react";
import Projects from "../components/projects";
import NavBar from "../components/sideNavBar";
import styles from "../styles/home.module.css"

// import { ProjectProp } from "../components/projects";

type ProjectProp = {
    name: string,
    dateLastModified: string,
}

type ProjectList = ProjectProp[];

const OnPress = () => {
    const order = 'avocado'
    
    fetch('/hi', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'order': order})
    }).then(res => res.json())
        .then(data => console.log(data))
};

// const HandleSubmit = (e: React.SyntheticEvent) => {
//     e.preventDefault();
    
//     const target = e.target as typeof e.target & {
//         code: {value: string};
//     };

//     fetch('/hi', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({'code': target.code.value})
//     })
// }

const Home = () => {
    const proj1 : ProjectProp = { name: "test1", dateLastModified: "4.6.23" }
    const proj2 : ProjectProp = { name: "test2", dateLastModified: "4.4.23" }
    const proj3 : ProjectProp = { name: "test3", dateLastModified: "2.4.23" }

    const projs = [proj1, proj2, proj3]

    return (
        <div className={styles.home}>
            <NavBar isOnEditor={false}/>
            {/* <form method="submit" onSubmit={HandleSubmit}>
                <input name="code" type="code" />
                <button type="submit">Submit</button>
            </form> */}
            <Projects projects={projs} isOnHome={true}/>
        </div>
    );


}

export default Home;

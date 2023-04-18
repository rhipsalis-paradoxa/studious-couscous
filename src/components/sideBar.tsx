import React from "react";
import { NavLink } from "react-router-dom";

import NavButton, { buttonProps } from "./NavButton";
import NewProjectButton from "./newProjectButton";
import Logo from "./Logo.png";
import Modal from "./modal";

import styles from "../styles/navBar.module.css";

interface sideBarProps {
    isOnEditor: boolean
	addNewProject?: (projectTitle: string)  => void
}

// interface navLinkProps {
// 	slug: string; 
// 	text: string;
// }


// TODO make wrapper for navlink

const SideBar = (props: sideBarProps) => {
	const newProjButton: buttonProps  = {
		text: "New Project",
		onEditor: props.isOnEditor,
	}

	const backButton : buttonProps = {
		text: "Back to Files",
		onEditor:true
	}

	const [modal, setModal] = React.useState(false);
	const addProject = props.addNewProject!

	// create project:
	// 	> get name entered 
	// 	> add project to project state using addNewProject function 
	// 	> navigate to path

	const handleCreateAndAdd = (title: string) => {
		addProject(title);
	}

	const closeModal = () => {
		setModal(!modal)
	}

    const openModal = () => setModal(!modal);

	if (props.isOnEditor) {
		return (
			// side bar on the editor page 
			<nav className={styles.navBar}>
				<div className={styles.logo}>
                	<img className={styles.img} src={Logo} alt="why" />
            	</div>
				<NavButton text={backButton.text}
							  onEditor={backButton.onEditor}/>
			</nav>
		); 
	} else {
		return (
				// side bar on the home screen
				<nav className={styles.navBar}>
				<div className={styles.logo}>
                	<img className={styles.img} src={Logo} alt="why" />
            	</div>
					<Modal show={modal} handleClose={closeModal} handleAddProject={handleCreateAndAdd}/>
					<NewProjectButton text={newProjButton.text}
								  onEditor={newProjButton.onEditor}
								  openModal={openModal}
					/>
					<StyledNavLink text="Projects" slug="/" />
					<StyledNavLink text="Recently Deleted" slug="/recently-deleted" />
				</nav>
			);
	}
};

interface navLinkProps {
	text: string
	slug: string
}


const StyledNavLink = (props: navLinkProps) => {
	const activeStyle = styles.navactive 
	const regStyle = styles.nav 
	
	const slug = props.slug
	const text = props.text

	return (
		<NavLink 
			className={({isActive}) => 
					isActive ? activeStyle 
				 			 : regStyle }
			to={slug} >
				{text}
			</NavLink>
	)
}



export default SideBar
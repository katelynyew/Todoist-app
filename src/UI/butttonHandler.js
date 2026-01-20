import { getView, setView, getActiveProject, getProjects, setActiveProject } from "../state.js";;
import { renderMainContent } from "./mainContent.js";

// ok these are the handlers i need to define inside buttonhandler File
// start from top to bottom of webpage and from sidebar to main content.

// ------ side bar section buttons -------
// 1. siderbar header click to hide sidebar
// 2. sidebar nav-inbox - item: add task button to pop up modal for adding todo task 
// 3. sidebar nav-inbox - item: inbox button to switch main content page to inbox with list of todo tasks
// 4. sidebar nav-inbox - item: completed button to switch main content page to only show completed project 
// 5. sidebar nav-projects - item: My Projects button to switch main content page to display all the projects 
// 6. sidebar nav-projects - item: individual project button to switch main content page to display todo tasks for that project 

// ---------- main content section buttons -------
// 1. inbox section -  todo task button to edit the details and state of todo
//                  -  add task button to pop up modal to add new todo task 
// 2. completed section - you completed #project name button to pop up modal of project details and status and untoggle the completed status
// 3. My projects section  - add project button to pop up modal for adding new project with title and push it to list of projects.
//                         - #project name button to switch main content page to corresponding project page with details

//----- 1. siderbar header click to hide sidebar-----



function handleCloseButton(event) {
    console.log("clicked: ", event.target)
    const sidebarContainer = document.querySelector(".sidebar");
    const clickedButton = event.target.closest("button");
    if (!clickedButton) {
        return;
    }
    if (clickedButton.id === "close-btn") {
        sidebarContainer.classList.toggle("collapsed");
    }
}
const sidebarHeaderContainer = document.querySelector(".sidebar-header");
sidebarHeaderContainer.addEventListener("click", handleCloseButton);




// ---------2. sidebar nav-inbox - item: add task button to pop up modal for adding todo task 
const inboxContainer = document.querySelector(".inbox");
inboxContainer.addEventListener("click", handleInboxButtons);


function handleInboxButtons(event) {
    console.log("clicked: ", event.target)
    const clickedButton = event.target.closest("button");
    if (!clickedButton) {
        return;
    }
    if (clickedButton.id === "add-task-btn") {
        const modal = document.querySelector("#task-modal");
        const modal2 = document.querySelector(".modal");
        modal2.style.display = "block";
        // modal.classList.add("active");
        return;
    }
    if (clickedButton.id === "inbox-btn") {
        const inbox = getProjects().find(project => project.title === "Inbox");
        setActiveProject(inbox.id);
        setView("INBOX");
        renderMainContent(); 
        return;
    }
    if (clickedButton.id === "completed-btn") {
        setView("COMPLETED");
        renderMainContent();
        return;
    }
}

// ---------2. sidebar nav-projects -- my projects and project list buttons to load each main

const projectsContainer = document.querySelector(".projects");
projectsContainer.addEventListener("click", handleProjectButtons);


function handleProjectButtons(event) {
    let clickedButton = event.target;
    console.log("clicked: ", event.target)
    if (!clickedButton) {
        return;
    }
     if (clickedButton.id === "my-projects-btn") {
        setView("My-PROJECTS");
        renderMainContent();
        return;
    }
    if (clickedButton.dataset.id) {
        setActiveProject(clickedButton.dataset.id);
        setView("PROJECT");
        renderMainContent();
        return;

    }
    
}
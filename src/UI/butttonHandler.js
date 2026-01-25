
import { toggleTodoComplete, removeTodoFromProject, addProject, addToDoToProject, setView, getActiveProject, getProjects, setActiveProject } from "../state.js";import { toDo } from "../todo.js";
import { renderMainContent } from "./mainContent.js";
import { renderSidebar } from "./sidebar.js";
import closeImage from '../../assets/images/close.svg'
import checked from '../../assets/sound/exp.mp3'
import pop from '../../assets/sound/pop.mp3'
// ------ side bar section buttons -------
// 1. siderbar header click to hide sidebar
// 2. sidebar nav-inbox - add-task: add task button to pop up modal for adding todo task 
// 3. sidebar nav-inbox - inbox: inbox button to switch main content page to inbox with list of todo tasks
// 4. sidebar nav-inbox - completed: completed button to switch main content page to only show completed project 
// 5. sidebar nav-projects - My Projects: My Projects button to switch main content page to display all the projects 
// 6. sidebar nav-projects - List of individual Project: individual project button to switch main content page to display todo tasks for that project 

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
        return;
    }
}
const sidebarHeaderContainer = document.querySelector(".sidebar-header");
sidebarHeaderContainer.addEventListener("click", handleCloseButton);


// -----2. sidebar nav-inbox - 3 buttons; add task, inbox, completed to load corresponding main content page
const inboxContainer = document.querySelector(".inbox");
inboxContainer.addEventListener("click", handleSidebarInboxButtons);


function handleSidebarInboxButtons(event) {
    console.log("clicked: ", event.target)
    const clickedButton = event.target.closest("button");
    if (!clickedButton) {
        return;
    }
    if (clickedButton.id === "add-task-btn") {
        openTaskModal();
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

// ---------3. sidebar nav-projects -- my projects button and project list buttons to load corresponding main content page

const projectsContainer = document.querySelector(".projects");
projectsContainer.addEventListener("click", handleSidebarProjectButtons);


function handleSidebarProjectButtons(event) {
    let clickedButton = event.target;
    if (!clickedButton) {
        return;
    }
     if (clickedButton.id === "my-projects-btn") {
        setView("MYPROJECTS");
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

// ---------- main content section buttons -------
// add task button
// add project button
// individual project button
// individual todo task button

// ------4. main content page -- buttons to add task, add project, load project, show task details
const mainContent = document.querySelector(".main-content");
mainContent.addEventListener("click", handleMainContentButtons);

function handleMainContentButtons(event) {
   
    const clickedButton = event.target.closest("button");
    const clickedCheckBox = event.target.closest('input[type="checkbox"]');

     // completed checkbox toggle
    const activeProject = getActiveProject();
   
    if (clickedCheckBox && clickedCheckBox.dataset.id) {
        const audio = new Audio(checked);
        audio.play();
        
        toggleTodoComplete(activeProject.id , clickedCheckBox.dataset.id);
        renderMainContent();
        return;
    }

    if (!clickedButton) {
        return;
    }
    // add task button opens task modal
    if (clickedButton.dataset.action === "add-task") {
        openTaskModal();
        return;
    }
    // add project button opens the project modal
    if (clickedButton.dataset.action === "add-project") {
        openProjectModal();
        return;
    }
    // individual task button opens task details modal
     if (clickedButton.dataset.id && clickedButton.closest(".task-container")) {

        const toDoId = clickedButton.dataset.id;
        const activeProject = getActiveProject();   // to retrieve inbox tasks or project tasks
        const toDo = activeProject.toDos.find(toDo => toDo.id === toDoId);
        if (toDo) {
            openToDoModal(toDo);
        }
        return;
    }
    // individual project button loads corresponding main content page
    if (clickedButton.dataset.id) {
        setActiveProject(clickedButton.dataset.id)
        setView("PROJECT");
        renderMainContent();
        return;
    }
   
    
}
function openTaskModal() {
    const modal = document.querySelector("#task-modal");
    modal.style.display = "block";
    // loads exising projects for dropdown menu
    const projects = getProjects();
    const projectsContainer = document.querySelector(".dropdown-projects");
    projectsContainer.innerHTML = "";
    for (let project of projects) {
        const item = document.createElement("button");
        item.dataset.id = project.id;
        item.textContent = project.title;
        projectsContainer.append(item);
    }
    return;
}
function openProjectModal() {
    const modal = document.querySelector("#project-modal");
    const closeBtn = document.querySelector(".close-modal");
    const closeImg = closeBtn.querySelector("img");
    closeImg.setAttribute("src", closeImage);
    modal.style.display = "block";
    return;
}
function openToDoModal(toDo) {
    const toDoModal = document.querySelector("#todo-details-modal");
    toDoModal.dataset.currentToDoId = toDo.id;

    const titleDescription = document.querySelector(".title-description");
    titleDescription.innerHTML = "";

    const title = document.createElement("p");
    title.textContent = `Title: ${toDo.title}`;
    const description = document.createElement("p");
    description.textContent = `Description: ${toDo.description}`;

    titleDescription.append(title, description);

    const projectDate = document.querySelector(".project-date");
    projectDate.innerHTML = "";

    const project = document.createElement("p");
    const activeProject = getActiveProject();
    project.textContent = `Project: ${activeProject.title}`;
    const date = document.createElement("p");
    date.textContent = `Due Date: ${toDo.dueDate}`;
    const notes = document.createElement("p");
    notes.textContent = `Notes: ${toDo.notes}`;
    
    projectDate.append(project, date, notes);

    toDoModal.style.display = "block";
}
////------------ handle task modal button------------
const taskModal = document.querySelector("#task-modal");
taskModal.addEventListener("click", handleTaskModalButtons);

function handleTaskModalButtons(event) {
    const clickedButton = event.target.closest("button");

    if (!clickedButton) {
        return; 
    }
    //buttons
    if (clickedButton.id === "current-project-btn") {
        const dropdown = document.querySelector(".dropdown-content");
        dropdown.classList.toggle("hidden");
        return;
    }
    if (clickedButton.closest(".dropdown-content")) {
        const projectId = clickedButton.dataset.id;
        const currentProjectBtn = document.querySelector("#current-project-btn");
        
        currentProjectBtn.dataset.selectedProjectId = projectId;
        currentProjectBtn.textContent = `${clickedButton.textContent} ▼`;
        return;
    }

    if (clickedButton.classList.contains("cancel-btn")) {
        taskModal.style.display = "none";
        clearTaskModalInputs();
        return;
    }

    if (clickedButton.classList.contains("submit-btn")) {
        const title = document.querySelector("#task-title").value;  
        const description = document.querySelector("#task-description").value;  
        const date = document.querySelector("#task-date").value; 
        const notes = document.querySelector("#task-notes").value;

        if (!title.trim()) {
            alert("Please fill in the title to add a task.");
            return;
        }
        const currentProjectBtn = document.querySelector("#current-project-btn");
        const selectedProjectId = currentProjectBtn.dataset.selectedProjectId || getActiveProject().id
        addToDoToProject(selectedProjectId, toDo(title, description, date, notes));
        renderMainContent();
        const audio = new Audio(pop);
        audio.play();
        taskModal.style.display = "none";
        clearTaskModalInputs();
        return;
    }

}
////------------ handle project modal button------------
const projectModal = document.querySelector("#project-modal");
projectModal.addEventListener("click", handleProjectModalButtons);

function handleProjectModalButtons(event) {

    const clickedButton = event.target.closest("button");
    if (!clickedButton) {
        return; 
    }
    //buttons
    if (clickedButton.id === "current-project-btn") {
        const dropdown = document.querySelector(".dropdown-content");
        dropdown.classList.toggle("hidden");
    }

    if (clickedButton.classList.contains("cancel-btn") || clickedButton.classList.contains("close-modal")) {
        projectModal.style.display = "none";
        clearProjectModalInputs();
    }

    if (clickedButton.classList.contains("submit-btn")) {
        const title = document.querySelector("#project-title").value;  

        if (!title.trim()) {
            alert("Please fill in the title to add a project.");
            return;
        }
        addProject(title);
        renderSidebar();
        renderMainContent();
        projectModal.style.display = "none";
        clearProjectModalInputs();
    }

}

////------------ handle todo details modal button------------
const toDoModal = document.querySelector("#todo-details-modal");
toDoModal.addEventListener("click", handleToDoModalButtons);

function handleToDoModalButtons(event) {
    const clickedButton = event.target.closest("button");

    if (!clickedButton) {
        return; 
    }
    if (clickedButton.classList.contains("cancel-btn")) {
        toDoModal.style.display = "none";
        return;
    }
    if (clickedButton.classList.contains("remove-btn")) {
        const toDoId = toDoModal.dataset.currentToDoId;
        const activeProject = getActiveProject()
        removeTodoFromProject(activeProject.id, toDoId);
        renderMainContent();
        toDoModal.style.display = "none";
        return;
    }

}
function clearTaskModalInputs() {
    document.querySelector("#task-title").value = "";  
    document.querySelector("#task-description").value = "";  
    document.querySelector("#task-date").value = ""; 
    document.querySelector("#task-notes").value = "";
    return;
}

function clearProjectModalInputs() {
    document.querySelector("#task-title").value = "";  
    document.querySelector("#task-description").value = "";  
    document.querySelector("#task-date").value = ""; 
    document.querySelector("#task-notes").value = "";
    return;
}


import { project } from './project.js'
import { saveState, loadState } from './storage.js';


let projects = [];
let activeProjectId;
let currentView = "INBOX";

const savedData = loadState();

if (savedData) {
     console.log("Loading saved data...");
    console.log("Saved projects:", savedData.projects);
    console.log("Saved activeProjectId:", savedData.activeProjectId);
    projects = savedData.projects;
    activeProjectId = savedData.activeProjectId;
    currentView = savedData.currentView;

    // Check if active project exists
    const active = projects.find(item => item.id === activeProjectId);
    console.log("Active project found:", active);
    
    if (!active) {
        console.log("Active project not found! Resetting to first project.");
        activeProjectId = projects[0]?.id;
    }

}
else {
    const inbox = project("Inbox");
    projects.push(inbox);
    activeProjectId = inbox.id;

    const item = project("Getting Started");
    projects.push(item);
    activeProjectId = item.id;
}
function persistState() {
    saveState(projects, activeProjectId, currentView);
}

export function setView(view) {
    currentView = view;

    persistState();
}

export function getView() {
    return currentView;
}

export function addProject(title) {
    const myProject = project(title);
    activeProjectId = myProject.id;
    projects.push(myProject);

    persistState();
}
export function addToDoToProject(projectId, toDoObject) {
    for (let item of projects) {
        if (item.id === projectId) {
            item.toDos.push(toDoObject);
        }
    }
    persistState();
}

export function removeTodoFromProject(projectId, toDoId) {
    for (let item of projects) {
        if (item.id === projectId) {
            item.toDos = item.toDos.filter(toDo => toDo.id !== toDoId);
            break;
        }  
    }
    persistState();
}

export function toggleTodoComplete(projectId, toDoId) {
    for (let item of projects) {
        if (item.id === projectId) {
            for (let todo of item.toDos) {
                if (todo.id === toDoId) {
                    todo.completed = !todo.completed;
                }
            }
        }
    }
    persistState();
}

export function setActiveProject(projectId) {
    activeProjectId = projectId;
    persistState();
}

export function getProjects() {
    return projects;
}

export function getActiveProject() {
    return projects.find(item => item.id === activeProjectId);
}
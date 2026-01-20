import { project } from './project.js'


let projects = [];
let activeProjectId;

const item = project("Getting Started");
projects.push(item);
activeProjectId = item.id;

const inbox = project("Inbox");
projects.push(inbox);
activeProjectId = inbox.id;


let currentView = "INBOX";

export function setView(view) {
    currentView = view;
}

export function getView() {
    return currentView;
}

export function addProject(title) {
    const myProject = project(title);
    activeProjectId = myProject.id;
    projects.push(myProject);
}
export function addToDoToProject(projectId, toDoObject) {
    for (let item of projects) {
        if (item.id === projectId) {
            item.toDos.push(toDoObject);
        }
    }
}

export function removeTodoFromProject(projectId, toDoId) {
    for (let item of projects) {
        if (item.id === projectId) {
            item.toDos = item.toDos.filter(toDo => toDo.id !== toDoId);
            break;
        }  
    }
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
}

export function setActiveProject(projectId) {
    activeProjectId = projectId;
}

export function getProjects() {
    return projects;
}

export function getActiveProject() {
    return projects.find(item => item.id === activeProjectId);
}
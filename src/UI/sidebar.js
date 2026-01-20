import { getProjects } from "../state.js"

export function renderSidebar() {

    const projectsContainer = document.querySelector(".projects");
    const projectsItems = projectsContainer.querySelector(".items");
    projectsItems.innerHTML = "";
    let projects = getProjects();
    for (let project of projects) {
        const item = document.createElement("button");
        item.dataset.id = project.id;
        item.textContent = project.title;
        projectsItems.append(item);
    }   
    return projectsContainer;
}
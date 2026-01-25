import { getProjects } from "../state.js"
import hash from '../../assets/images/hash.svg'
import sidebar from '../../assets/images/sidebar.svg'
import addTaskImage from'../../assets/images/add-task.svg'
import inboxImage from '../../assets/images/inbox.svg'
import completedImage from '../../assets/images/check.svg'
import pfp from '../../assets/images/profile.svg'

export function renderSidebar() {
    const sidebarHeader = document.querySelector(".sidebar-header");
    const pfpImage = sidebarHeader.querySelector("img");
    pfpImage.setAttribute("src", pfp);

    // sidebar toggle btn
    const sidebarBtn = document.querySelector("#close-btn");
    const icon = document.createElement("img");
    icon.setAttribute("src", sidebar);
    sidebarBtn.append(icon);

    //sidebar inbox items
    const addTaskBtn = document.querySelector("#add-task-btn");
    const addTaskImg = addTaskBtn.querySelector("img");
    addTaskImg.setAttribute("src", addTaskImage);
    const inboxBtn = document.querySelector("#inbox-btn");
    const inboxImg = inboxBtn.querySelector("img");
    inboxImg.setAttribute("src", inboxImage);
    const completedBtn = document.querySelector("#completed-btn");
    const completedImg = completedBtn.querySelector("img");
    completedImg.setAttribute("src", completedImage);
    
    // 
    const projectsContainer = document.querySelector(".projects");
    const projectsItems = projectsContainer.querySelector(".items");
    projectsItems.innerHTML = "";
    let projects = getProjects();
    for (let project of projects) {
        if (project.title === "Inbox") {
            continue;
        }
        else {
            const item = document.createElement("button");
            item.dataset.id = project.id;
            const icon = document.createElement("img");
            icon.setAttribute("src", hash);
            const span = document.createElement("span");
            span.textContent = project.title;
            item.append(icon, span);
            projectsItems.append(item);
        }
        
    }   
    return projectsContainer;
}
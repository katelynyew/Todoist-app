import { getView, getActiveProject, getProjects } from "../state";
import emptyBox from '../../assets/images/empty-inbox.png'
import addTaskImage from '../../assets/images/add-task2.svg'
import hash from '../../assets/images/hash.svg'

export function renderMainContent() {
    const mainContent = document.querySelector(".main-content");
    mainContent.innerHTML = "";

    const mainHeader = document.createElement("div");
    mainHeader.classList.add("main-header");
   
    const title = document.createElement("h2");
    mainHeader.append(title);
    mainContent.append(mainHeader);

    // Empty / non-empty inbox default page
    let activeProject = getActiveProject();
    let view = getView();

    if (view === "INBOX") {
        const bodyContainer = document.createElement("div");
        bodyContainer.classList.add("inbox-container");
        mainContent.append(bodyContainer);

        title.textContent = "Inbox";
        // if inbox has empty todo list
        if (activeProject.toDos.length === 0) {
            const img = document.createElement("img");
            img.setAttribute("src", emptyBox);
            img.setAttribute("alt", "empty-box");

            const h3 = document.createElement("h3");
            h3.textContent = "Capture now, plan later";
            
            const p = document.createElement("p");
            p.textContent = "Inbox is your go-to spot for quick task entry. Clear your mind now, organize when you’re ready.";
            p.style = "margin: 0; font-size: 0.9rem; padding-bottom: 15px; width: 200px; text-align: center;"

            const add = document.createElement("button");
            add.classList.add("add-task-main")
            add.dataset.action = "add-task";
            add.style = "width: 100px; background-color: red; color: white; gap: 5px;";
            const addIcon = document.createElement("img");
            addIcon.setAttribute("src", addTaskImage);
            addIcon.setAttribute("alt", "icon");
            const span = document.createElement("span");
            span.textContent = "Add Task";
            add.append(addIcon, span);

            bodyContainer.append(img, h3, p, add);
        }
        else {
            for (let toDo of activeProject.toDos) {
                const taskContainer = document.createElement("div");
                taskContainer.classList.add("task-container");

                const checkBox = document.createElement("input");
                checkBox.dataset.id = toDo.id;
                checkBox.setAttribute("type", "checkbox");
                checkBox.checked = toDo.completed;

                const task = document.createElement("button");
                task.dataset.id = toDo.id;
    
                const taskDetails = document.createElement("div");
                taskDetails.classList.add("task-details");
                const title = document.createElement("p");
                title.textContent = toDo.title;
                if (toDo.completed) {
                    title.style.width = "20px";
                    title.style.textDecoration = "2px red line-through";
                    title.style.opacity = "0.6";

                }
                const description = document.createElement("p");
                description.textContent = toDo.description;
                const date = document.createElement("p");
                date.textContent = toDo.dueDate;
                taskDetails.append(title, description, date);

                task.append(taskDetails);
                taskContainer.append(checkBox, task);
                bodyContainer.append(taskContainer);
            }
            const add = document.createElement("button");
            add.classList.add("add-task-main")
            add.dataset.action = "add-task";
            const span = document.createElement("span");
            span.textContent = "Add Task";
            const addIcon = document.createElement("img");
            addIcon.setAttribute("src", addTaskImage);
            addIcon.setAttribute("alt", "icon");
            add.append(addIcon, span);

            bodyContainer.append(add);
        }
    }



     // My projects page
    if (view === "MYPROJECTS") {
        const bodyContainer = document.createElement("div");
        bodyContainer.classList.add("projects-container");
        mainContent.append(bodyContainer);

        title.textContent = "My Project";

        const add = document.createElement("button");
        add.classList.add("add-project-main")
        add.dataset.action = "add-project";
        const addIcon = document.createElement("img");
        addIcon.setAttribute("src", addTaskImage);
        addIcon.setAttribute("alt", "icon");
        const span = document.createElement("span");
        span.textContent = "Add Project";
        add.append(addIcon, span);
        
        bodyContainer.append(add);

        const h3 = document.createElement("h3");
        const projects = getProjects();
        h3.textContent = projects.length <= 2 ? `${projects.length-1} project` :  `${projects.length-1} projects`;
        
        const projectsContainer = document.createElement("div");
        projectsContainer.classList.add("projects-container");
        for (let project of projects) {
            if (project.title === "Inbox") {
                continue;
            }
            const item = document.createElement("button");
            item.dataset.id = project.id;
            const icon = document.createElement("img");
            icon.setAttribute("src", hash);
            icon.setAttribute("alt", "icon");
            const span = document.createElement("span");
            span.textContent = project.title;
            item.append(icon, span);
            projectsContainer.append(item);
        }

        bodyContainer.append(h3, projectsContainer);
    }
      // single project page
    if (view === "PROJECT") {
        const bodyContainer = document.createElement("div");
        bodyContainer.classList.add("project-container");
        mainContent.append(bodyContainer);

        title.textContent = `${activeProject.title}`;

        for (let toDo of activeProject.toDos) 
            {
           
            const taskContainer = document.createElement("div");
            taskContainer.classList.add("task-container");

            const checkBox = document.createElement("input");
            checkBox.dataset.id = toDo.id;
            checkBox.setAttribute("type", "checkbox");
            checkBox.checked = toDo.completed;
            const task = document.createElement("button");
            task.dataset.id = toDo.id;
            const taskDetails = document.createElement("div");
            taskDetails.classList.add("task-details");

            const title = document.createElement("p");
            title.textContent = toDo.title;
    
            if (toDo.completed) {
                title.style.width = "20px";
                title.style.textDecoration = "2px red line-through";
                title.style.opacity = "0.6";

            }
            taskDetails.append(checkBox, title);
            task.append(taskDetails);
            taskContainer.append(checkBox, task);
            bodyContainer.append(taskContainer);
        }

        const add = document.createElement("button");
        add.classList.add("add-task-main")
        add.dataset.action = "add-task";
        const addIcon = document.createElement("img");
        addIcon.setAttribute("src", addTaskImage);
        addIcon.setAttribute("alt", "icon");
        const span = document.createElement("span");
        span.textContent = "Add Task";
        add.append(addIcon, span);

        bodyContainer.append(add);
    }



    // completed page
    if (view === "COMPLETED") {
        const projects = getProjects();

        const bodyContainer = document.createElement("div");
        bodyContainer.classList.add("completed-container");
        mainContent.append(bodyContainer);
        
        title.textContent = "Activity";
        
        const dateContainer = document.createElement("div");

        const completedItems = document.createElement("ul");
        for (let project of projects) {
            for (let toDo of project.toDos) {
                if (toDo.completed === true) {
                    const p = document.createElement("li");
                    p.textContent = `You completed `;
                    const strong = document.createElement("strong");
                    strong.textContent = `${toDo.title}`;
                    p.append(strong);
                    completedItems.append(p);
                }
            }
        }
        dateContainer.append(completedItems);
        bodyContainer.append(dateContainer);
    }


    return mainContent;
}

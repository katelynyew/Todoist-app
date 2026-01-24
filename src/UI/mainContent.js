import { getView, getActiveProject, setActiveProject, getProjects } from "../state";
import emptyBox from '../../assets/images/empty-inbox.png'


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
            p.textContent = "Inbox is your go-toInbox is your go-to spot for quick task entry. Clear your mind now, organize when you’re ready.";

            const add = document.createElement("button");
            add.classList.add("add-task-main")
            add.dataset.action = "add-task";
            add.textContent = "Add Task";
            const addIcon = document.createElement("img");
            addIcon.setAttribute("src", "");
            addIcon.setAttribute("alt", "icon");
            add.append(addIcon);

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
            add.textContent = "Add Task";
            const addIcon = document.createElement("img");
            addIcon.setAttribute("src", "");
            addIcon.setAttribute("alt", "icon");
            add.append(addIcon);

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
        add.textContent = "Add Project";
        const addIcon = document.createElement("img");
        addIcon.setAttribute("src", "");
        addIcon.setAttribute("alt", "icon");
        add.append(addIcon);
        
        bodyContainer.append(add);

        const h3 = document.createElement("h3");
        const projects = getProjects();
        h3.textContent = projects.length <= 1 ? `${projects.length} project` :  `${projects.length} projects`;
        
        const projectsContainer = document.createElement("div");
        projectsContainer.classList.add("projects-container");
        for (let project of projects) {
            const item = document.createElement("button");
            item.dataset.id = project.id;
            const icon = document.createElement("img");
            icon.setAttribute("src", "");
            icon.setAttribute("alt", "icon");
            item.append(icon);
            item.textContent = project.title;
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
            task.textContent = toDo.title;
            taskContainer.append(checkBox, task);

            bodyContainer.append(taskContainer);
        }

        const add = document.createElement("button");
        add.classList.add("add-task-main")
        add.dataset.action = "add-task";
        add.textContent = "Add Task";
        const addIcon = document.createElement("img");
        addIcon.setAttribute("src", "");
        addIcon.setAttribute("alt", "icon");
        add.append(addIcon);

        bodyContainer.append(add);
    }



    // completed page
    if (view === "COMPLETED") {
        const projects = getProjects();

        const bodyContainer = document.createElement("div");
        bodyContainer.classList.add("completed-container");
        mainContent.append(bodyContainer);
        
        title.textContent = activeProject.title === "Inbox" ? "Activity: Inbox" : "Activity: All projects";
        
        const dateContainer = document.createElement("div");
        const date = document.createElement("h3");
        date.textContent = "placeholder, needs to implement date later"
        dateContainer.append(date);

        const completedItems = document.createElement("div");
        for (let project of projects) {
            for (let toDo of project.toDos) {
                if (toDo.completed === true) {
                    const p = document.createElement("p");
                    p.textContent = `You completed ${toDo.title}`;
                    completedItems.append(p);
                }
            }
        }
        dateContainer.append(completedItems);
        bodyContainer.append(date);
    }


    return mainContent;
}

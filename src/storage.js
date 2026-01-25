const STORAGE_KEYS = {
    PROJECTS: 'todoapp_projects',
    ACTIVE_PROJECT_ID: 'todoapp_activeProjectId',
    CURRENT_VIEW: 'todoapp_currentView'
};

export function saveState(projects, activeProjectId, currentView) {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_PROJECT_ID, activeProjectId);
    localStorage.setItem(STORAGE_KEYS.CURRENT_VIEW, currentView);
}

export function loadState() {
    try {
        const savedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
        const savedActiveProjectId = localStorage.getItem(STORAGE_KEYS.ACTIVE_PROJECT_ID);
        const savedCurrentView = localStorage.getItem(STORAGE_KEYS.CURRENT_VIEW);

        if (!savedProjects) {
            return null;
        }
        const projects = JSON.parse(savedProjects);

        return {
            projects,
            activeProjectId: savedActiveProjectId,
            currentView: savedCurrentView || "INBOX"
        }
    }
    catch (error){
        console.error("Error loading saved data: ", error);
        return null;
    }
}

export function clearStorage() {
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_PROJECT_ID);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_VIEW);
}
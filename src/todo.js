export const toDo = (title, description, dueDate, priority, notes) => {
    return {
        title, 
        description, 
        dueDate, 
        priority, 
        notes,
        completed: false,
        id: crypto.randomUUID()
    };

}

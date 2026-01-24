export const toDo = (title, description, dueDate, notes) => {
    return {
        title, 
        description, 
        dueDate,
        notes,
        completed: false,
        id: crypto.randomUUID()
    };

}

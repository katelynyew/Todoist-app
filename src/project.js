
export const project = (title) => {

    return {
        id: crypto.randomUUID(),
        title,
        toDos: [],
        completed: false
    }
}
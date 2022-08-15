let selectedProject = 0;

function createProject(name) {
    const project = {"name": name,
                    "tasks": [],
                    "tasksId": -1
                }
                
                return project;
}

const projectFunctions = {
    "addTask": function(title, description, date, priority) {
        const task = {"title": title,
                    "description": description,
                    "date": date,
                    "priority": priority,
                    "id": this.tasks.length
}
    this.tasks.push(task);
    },

    "removeTask": function(id) {
        this.tasks = this.tasks.filter((task, index) => {if(index !== id) return task});
    }
}

function createTask(title, description, date, priority, id) {
    const task = {"title": title,
                    "description": description,
                    "date": date,
                    "priority": priority,
                    "id": id
}
    return task;
}

export {selectedProject, createProject, projectFunctions, createTask};

let projects = [];
let selectedProject = 0;

const addProjectButton = document.getElementById('addProjectBtn');
const addTaskButton = document.getElementById('addTaskBtn');


addProjectButton.addEventListener('click', () => {
    const projectName = document.getElementById('projectName').value;
    console.log(projectName);
    if(projectName === undefined || projectName === '')
        return;

    projects.push(project(projectName));
    document.querySelector('.modal').click();
    updateProjectDiv();
});

addTaskButton.addEventListener('click', e => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const priority = document.getElementById('priority').value;
    projects[selectedProject].addTask(title, description, date, priority)
    document.querySelector('.modal').click();
    updateTasksDiv();

    
});


const project = (name) => {
    const getName = () => {
        return name;
    };
    let tasksId = 0;

    let tasks = [];

    const addTask = (title, description, date, priority) => {
        tasks.push(task(title, description, date, priority, tasksId));
        tasksId++;
    }

    const getTasks = () => {
        return tasks;
    }

    const removeTask = (id) => {
        tasks = tasks.filter((task, index) => {if(index !== id) return task});
    }
    



    return {getName, addTask, getTasks, removeTask};
}

const task = (title, description, date, priority, id) => {
    return {title, description, date, priority, id}
}

projects.push(project('Default'));

const updateTasksDiv = () => {
    const tasks = projects[selectedProject].getTasks();
    const tasksListDiv = document.querySelector(".tasksList");
    tasksListDiv.innerHTML = "";
    tasks.forEach((task, index) => {   
        // Create task elements to display 
        
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        const checkAndTitleDiv = document.createElement('div');
        checkAndTitleDiv.classList.add("checkAndTitle");
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox"+index);
        // Remove task
        checkbox.addEventListener('click', () => {
            taskDiv.style.display = "none";
            projects[selectedProject].removeTask(index);
           

        });

        const taskTitleDiv = document.createElement('div');
        taskTitleDiv.classList.add('taskTitle');
        taskTitleDiv.innerText = task.title;
        checkAndTitleDiv.appendChild(checkbox);
        checkAndTitleDiv.appendChild(taskTitleDiv);

        const dateDiv = document.createElement('div');
        dateDiv.classList.add("date");
        dateDiv.innerText = task.date;
        const descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add("description");
        descriptionDiv.innerText = task.description;
        descriptionDiv.style.display = "none";

        // Check task priority and color div border accordingly
        if(task.priority === "medium")
            taskDiv.style.borderBottom = "1px solid yellow";
        else if(task.priority === "high")
            taskDiv.style.borderBottom = "1px solid red";

        // Display/hide task desription after every taskDiv click
        taskDiv.addEventListener('click', ()=> {
            if(descriptionDiv.style.display === "none")
            descriptionDiv.style.display =  "block"
            else descriptionDiv.style.display = "none"
        });
            
        taskDiv.appendChild(checkAndTitleDiv);
        taskDiv.appendChild(dateDiv);
        taskDiv.appendChild(descriptionDiv);

        tasksListDiv.appendChild(taskDiv); 
    });
}

const updateProjectDiv = () => {
    
    // document.querySelector('.selected').classList.remove('selected');
    const projectsDiv = document.querySelector('.projects');
    projectsDiv.innerHTML = "";
    projects.forEach((project, index) => {
        let div = document.createElement('div');
        div.classList.add("project");
        div.id = "p"+index;
        div.innerText = project.getName();
        div.addEventListener('click', e => {
            document.querySelectorAll(".project")[selectedProject].classList.remove("selected");
            div.classList.add("selected");
            selectedProject = index;
            updateTasksDiv()
        })
        projectsDiv.appendChild(div);
    });
    // Display last entered project as selected
    document.querySelectorAll(".project")[projects.length - 1].classList.add("selected");
    selectedProject = projects.length - 1;
}





const configureModal = () => {
    const modal = document.querySelector(".modal")
    const modalContent1 = document.getElementById("modal1");
    const modalContent2 = document.getElementById("modal2");
    const projectButton = document.getElementById("projectBtn");
    const taskButton = document.getElementById("taskBtn");

    projectButton.addEventListener('click', e => {
        e.preventDefault();
        console.log(e)
        modal.style.display = "block";
        modalContent1.style.display = "block";
    });

    taskButton.addEventListener('click', e => {
        e.preventDefault();
        modal.style.display = "block";
        modalContent2.style.display = "block";
    });
    
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modalContent1.style.display = "none";
      modalContent2.style.display = "none";
      modal.style.display = "none";
    }
  }
}



configureModal()
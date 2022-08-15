import {selectedProject, createProject, projectFunctions, createTask} from './project.js';
import {configureModal} from "./modal.js" 

configureModal()

// Create Projects array and make default project if no existent in local storage
if(!localStorage.getItem("Projects")){
    let projects = [];
    projects.push(createProject("Default"));
    localStorage.setItem("Projects", JSON.stringify(projects))
}

const addProjectButton = document.getElementById('addProjectBtn');
const addTaskButton = document.getElementById('addTaskBtn');

addProjectButton.addEventListener('click', () => {
    
    let projects = JSON.parse(localStorage.getItem("Projects"));
    console.log( JSON.parse(localStorage.getItem("Projects")))
    const projectName = document.getElementById('projectName');
    if(projectName === undefined || projectName === '')
        return;

     if(localStorage.getItem('projects'))
         projects = JSON.parse(localStorage.getItem('projects'));
        
    
    projects.push(createProject(projectName.value));

    localStorage.setItem('Projects', JSON.stringify(projects));
   
    document.querySelector('.modal').click();
    updateProjectDiv(projects);
    nulifyForm(projectName)
    document.querySelector('.tasksList').innerHTML = "";
});

addTaskButton.addEventListener('click', e => {
    e.preventDefault();
    let projects = JSON.parse(localStorage.getItem('Projects'));
    projects.forEach(project => {
        Object.assign(project, project, projectFunctions);
       });

    let title = document.getElementById('title');
    if(title.value === undefined || title.value === '')
       return;
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let priority = document.getElementById('priority');
    projects[selectedProject].addTask(createTask(title.value, description.value, date.value, priority.value, projects[selectedProject].tasks.length));
    localStorage.setItem("Projects", JSON.stringify(projects));
    document.querySelector('.modal').click();
    updateTasksDiv();
    nulifyForm(title, description, date);
    

    
});

function nulifyForm(...args) {
    args.forEach(arg => {arg.value = ""});

}

const updateTasksDiv = () => {
   let projects =  JSON.parse(localStorage.getItem('Projects'));
   projects.forEach(project => {
    Object.assign(project, project, projectFunctions);
   });
    const tasks = projects[selectedProject].tasks;

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
            localStorage.setItem("Projects", JSON.stringify(projects));
           

        });

        const taskTitleDiv = document.createElement('div');
        taskTitleDiv.classList.add('taskTitle');
        taskTitleDiv.innerText = task.title.title;
        checkAndTitleDiv.appendChild(checkbox);
        checkAndTitleDiv.appendChild(taskTitleDiv);

        const dateDiv = document.createElement('div');
        dateDiv.classList.add("date");
        dateDiv.innerText = task.title.date;
        const descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add("description");
        descriptionDiv.innerText = task.title.description;
        descriptionDiv.style.display = "none";

        // Check task priority and color div border accordingly
        if(task.title.priority === "medium")
            taskDiv.style.borderBottom = "1px solid yellow";
        else if(task.title.priority === "high")
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

const updateProjectDiv = (projects) => {
    
    // document.querySelector('.selected').classList.remove('selected');
    const projectsDiv = document.querySelector('.projects');
    projectsDiv.innerHTML = "";
    projects.forEach((project, index) => {
        let div = document.createElement('div');
        div.classList.add("project");
        div.id = "p"+index;
        div.innerText = project.name;
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

window.addEventListener('load', e => {
    document.querySelectorAll('.project')[0].click()
})
updateProjectDiv(JSON.parse(localStorage.getItem("Projects")));












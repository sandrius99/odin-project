let projects = [];

const addProjectButton = document.getElementById('projectBtn');
// addProjectButton.addEventListener('click', )

const project = (name) => {
    const getName = () => {
        return name;
    };

    return {getName};
}

const configureModal = () => {
    const modal = document.querySelector(".modal")
    const modalContent1 = document.getElementById("modal1");
    const modalContent2 = document.getElementById("modal2");
    const addProjectButton = document.getElementById("projectBtn");
    const addTaskButton = document.getElementById("taskBtn");

    addProjectButton.addEventListener('click', e => {
        e.preventDefault();
        modal.style.display = "block";
        modalContent1.style.display = "block";
    });

    addTaskButton.addEventListener('click', e => {
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
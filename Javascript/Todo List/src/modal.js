export  const configureModal = () => {
    const modal = document.querySelector(".modal")
    const modalContent1 = document.getElementById("modal1");
    const modalContent2 = document.getElementById("modal2");
    const projectButton = document.getElementById("projectBtn");
    const taskButton = document.getElementById("taskBtn");

    projectButton.addEventListener('click', e => {
        e.preventDefault();
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
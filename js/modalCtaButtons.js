const trashCanModal = document.querySelector(".trash-can-modal");
const enlargeTrashCan = document.querySelector(".enl-trash");
const minimizeTrashCan = document.querySelector(".min-trash");

let trashCanEnlarged = false;

enlargeTrashCan.addEventListener("click", () => {
  if (!trashCanEnlarged) {
    trashCanModal.classList.add("enlarged");
    trashCanEnlarged = true;
    return;
  }
  trashCanModal.classList.remove("enlarged");
  trashCanEnlarged = false;
});

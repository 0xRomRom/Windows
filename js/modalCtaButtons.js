const trashCanModal = document.querySelector(".trash-can-modal");
const enlargeTrashCan = document.querySelector(".enl-trash");
const closeTrashCan = document.querySelector(".clo-trash");

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

closeTrashCan.addEventListener("click", () => {
  trashCanModal.classList.add("hidden");
});

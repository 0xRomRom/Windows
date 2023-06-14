//Drag desktop items

function makeElementDraggable(element) {
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  element.addEventListener("mousedown", dragStart);

  function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", dragEnd);
    isDragging = true;
  }

  function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    isDragging = false;

    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", dragEnd);
  }

  function drag(e) {
    if (isDragging) {
      e.preventDefault();

      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      xOffset = currentX;
      yOffset = currentY;

      setTransform(currentX, currentY, element);
    }
  }

  function setTransform(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  }
}

const trashIcon = document.querySelector(".trash-icon");
makeElementDraggable(trashIcon);

const shadowMinter = document.querySelector(".shadow-minter");
makeElementDraggable(shadowMinter);

const desktopTerminalIcon = document.querySelector(".desk-terminal");
makeElementDraggable(desktopTerminalIcon);

const desktopTownIcon = document.querySelector(".desk-crier");
makeElementDraggable(desktopTownIcon);

const desktopOpenSea = document.querySelector(".desk-opensea");
makeElementDraggable(desktopOpenSea);

const desktopStaker = document.querySelector(".desk-staker");
makeElementDraggable(desktopStaker);

const desktopLottery = document.querySelector(".lottery-icon");
makeElementDraggable(desktopLottery);

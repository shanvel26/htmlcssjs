const contextButton = document.getElementById('contextButton');
const mainContextMenu = document.getElementById('mainContextMenu');
const contextMenuItems = mainContextMenu.querySelectorAll('a');

contextButton.addEventListener('click', function () {
  mainContextMenu.style.display = 'block';
  mainContextMenu.style.left = `${contextButton.offsetLeft}px`;
  mainContextMenu.style.top = `${
    contextButton.offsetTop + contextButton.offsetHeight
  }px`;

  // Set initial focus on the first menu item
  contextMenuItems[0].focus();
});

document.addEventListener('keydown', function (event) {
  console.log('--called again--', event);
  const isButtonActive = contextButton == document.activeElement;

  // if (isButtonActive && event.key != 'Enter') {
  //   mainContextMenu.style.display = 'block';
  // }

  if (event.key === 'Escape') {
    closeContextMenu();
  }

  if (mainContextMenu.style.display === 'block') {
    switch (event.key) {
      case 'ArrowUp':
        navigateContextMenu(-1);
        break;
      case 'ArrowDown':
        navigateContextMenu(1);
        break;
      case 'Enter':
        openContextMenuLink();
        break;
    }
  }
});

function closeContextMenu() {
  mainContextMenu.style.display = 'none';
}

function navigateContextMenu(direction) {
  let currentIndex = Array.from(contextMenuItems).findIndex(
    (item) => document.activeElement === item
  );
  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = contextMenuItems.length - 1;
  } else if (currentIndex >= contextMenuItems.length) {
    currentIndex = 0;
  }

  contextMenuItems[currentIndex].focus();
}

function openContextMenuLink() {
  const currentLink = Array.from(contextMenuItems).find(
    (item) => document.activeElement === item
  );
  const selectedItemText = currentLink.textContent;
  contextButton.textContent = selectedItemText;

  // window.location.href = currentLink.href;
  closeContextMenu();
  contextButton.focus();
}

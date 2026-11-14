const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
const smallScreen = window.matchMedia("(max-width: 740px)");

function setMenu(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  navigation.hidden = smallScreen.matches && !open;
}

function resetMenu() {
  const restoreFocus = smallScreen.matches && navigation.contains(document.activeElement);
  menuButton.hidden = !smallScreen.matches;
  setMenu(false);
  if (restoreFocus) menuButton.focus();
}

menuButton.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});

navigation.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link || !smallScreen.matches) return;

  const destination = document.querySelector(link.hash);
  if (destination) {
    destination.tabIndex = -1;
    destination.focus({ preventScroll: true });
  }
  setMenu(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || menuButton.getAttribute("aria-expanded") !== "true") return;
  setMenu(false);
  menuButton.focus();
});

smallScreen.addEventListener("change", resetMenu);
resetMenu();

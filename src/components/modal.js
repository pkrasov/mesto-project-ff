export function openWindow(window) {
  window.classList.add("popup_is-opened");
  document.addEventListener("keydown", escPressClose);
  window.addEventListener("click", overlayClose);
}

export function closeWindow(window) {
  window.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escPressClose);
  window.removeEventListener("click", overlayClose);
}

function overlayClose(event) {
  if (event.target.classList.contains("popup")) {
    closeWindow(event.target);
  }
}

function escPressClose(event) {
  if (event.key === "Escape") {
    closeWindow(document.querySelector(".popup_is-opened"));
  }
}

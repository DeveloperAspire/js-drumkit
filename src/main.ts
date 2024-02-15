export function removeTransition(e: any) {
  if (e.propertyName !== "transform") return;
  e.target.classList.remove("playing");
}

export function playSound(e: KeyboardEvent) {
  const keyCode = e.key.toUpperCase().charCodeAt(0);
  const audio = document.querySelector(
    `audio[data-key="${keyCode}"]`
  ) as HTMLAudioElement;
  const key = document.querySelector(`div[data-key="${keyCode}"]`)!;
  if (!audio) return;
  key.classList.add("playing");
  audio.currentTime = 0;
  audio.play();
}

const keys = Array.from(document.querySelectorAll(".key"));
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
window.addEventListener("keydown", playSound);

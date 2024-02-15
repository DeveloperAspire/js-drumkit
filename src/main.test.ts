//@ts-nocheck
import fs from "fs";
import path from "path";

import { beforeEach, it, vi, expect } from "vitest";
import { fireEvent } from "@testing-library/dom";
import { Window } from "happy-dom";
import userEvent from "@testing-library/user-event";
import { playSound, removeTransition } from "./main";

const htmlDocPath = path.join(process.cwd(), "index.html");
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString();

const window = new Window();
const document = window.document;
document.write(htmlDocumentContent);
vi.stubGlobal("document", document);

beforeEach(() => {
  document.body.innerHTML = "";
  document.write(htmlDocumentContent);
});

it("should fire the playSound function when a key in the keyboard is pressed", async () => {
  const user = userEvent.setup();

  const playFN = vi.fn();

  window.addEventListener("keydown", playFN);

  fireEvent.keyDown(window, { key: "A", code: "KeyA" });

  expect(playFN).toHaveBeenCalledOnce();
});

it("should set the audio to play when the play sound function is fired", () => {
  const audioElements = document.querySelectorAll("audio");
  const audioA = audioElements[0];

  const play = vi.spyOn(audioA, "play");

  window.addEventListener("keydown", (e) => playSound(e));

  fireEvent.keyDown(window, { key: "A", code: "KeyA" });

  expect(play).toHaveBeenCalled();
});

it("should set the audio current time to zero whenever the playSound is fired", () => {
  const audioElements = document.querySelectorAll("audio");
  const audioA = audioElements[0];

  window.addEventListener("keydown", (e) => playSound(e));

  fireEvent.keyDown(window, { key: "A", code: "KeyA" });

  expect(audioA.currentTime).toBeFalsy();
});

it("should add class of playing to the key element with data code that matches the audio element when the playsound is fired", () => {
  const key = "A";
  const keyCode = key.charCodeAt(0);

  const pressedKey = document.querySelector(`div[data-key="${keyCode}"]`)!;
  window.addEventListener("keydown", (e) => playSound(e));

  fireEvent.keyDown(window, { key, code: "KeyA" });

  expect(pressedKey.classList.contains("playing")).toBeTruthy();
});

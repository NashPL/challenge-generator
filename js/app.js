import { getRandomWithSeed } from "./random";
import adjectives from "../json/adjectives.json";
import characters from "../json/characters.json";
import colours from "../json/colours.json";
import items from "../json/items.json";
import rooms from "../json/rooms.json";

const today = new Date();

// Get today's midnight.
today.setUTCHours(0, 0, 0, 0);

let seed = today.getTime();
const alertDiv = document.getElementById("alert-box");
alertDiv.style.visibility = "hidden";
const helpDiv = document.getElementById("help-box");
helpDiv.style.visibility = "hidden";

const url = new URL(document.location);
const urlSeed = url.searchParams.get("seed");

if (urlSeed !== null) {
  let daily = document.getElementById("daily");
  daily.style.display = "initial";
  seed = urlSeed;
}

const [playableCharacter] = getRandomWithSeed(characters, seed);
const [endingRoom] = getRandomWithSeed(rooms, seed);
const [colour] = getRandomWithSeed(colours, seed);

document.getElementById("title-adjective").textContent = getRandomWithSeed(
  adjectives,
  seed
);

const titleColourElement = document.getElementById("title-colour");

titleColourElement.style.color = colour.hex;
titleColourElement.textContent = colour.name;

document.getElementById("title-character").textContent = playableCharacter;
document.getElementById("seed").textContent = seed;
document.getElementById("character").textContent = playableCharacter;
document.getElementById("starting-items").textContent = getRandomWithSeed(
  items,
  seed,
  3
)
  .map(items => `C${items.id} ${items.name}`)
  .join(", ");
document.getElementById("end-room").textContent = endingRoom;
document.getElementById("generate-seed").addEventListener("click", function() {
  window.location = `?seed=${generateRandomSeed()}`;
});
document.getElementById("share").addEventListener("click", function() {
  copyToClipboard();
});
document.getElementById("help").addEventListener("click", function() {
  viewHelpPage();
});
daily.addEventListener("click", function() {
  // To remove the search params
  window.location = window.location.pathname;
});

function generateRandomSeed() {
  const r = Math.random()
    .toString(36)
    .substring(7);
  const rand = Math.floor(999 * Math.random());
  return `${r}${rand}`;
}

function copyToClipboard() {
  // create new element to append url to so we can copy the text to clipboard
  const newElement = document.createElement("input");
  const text = window.location.href;

  document.body.appendChild(newElement);
  newElement.value = text;
  newElement.select();
  document.execCommand("copy");

  // tear down
  document.body.removeChild(newElement);

  // show the alert for 3 seconds
  alertDiv.style.visibility = "visible";
  setTimeout(function() {
    alertDiv.style.visibility = "hidden";
  }, 3000);
}

function viewHelpPage()
{
  window.location.href = "../html/help.html";
}

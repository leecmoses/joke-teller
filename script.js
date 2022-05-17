"use strict";

const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable Button
const toggleButton = () => (button.disabled = !button.disabled);

// Passing joke to VoiceRSS API
const tellMe = (joke) => {
  VoiceRSS.speech({
    key: "c66b95c1563b461385ae1f23890c775e",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
};

// Get Jokes from Joke API
async function getJokes() {
  let joke = "";
  const apiUrl = "https://v2.jokeapi.dev/joke/Programming,Pun";
  try {
    const resp = await fetch(apiUrl);
    const data = await resp.json();

    data.joke ? (joke = data.joke) : (joke = data.setup + " " + data.delivery);

    // Text-to-Speech
    tellMe(joke);
    // Disable button
    toggleButton();
  } catch (err) {
    console.log("fetched failed", err);
  }
}

// Event Listeners
button.addEventListener("click", getJokes);

audioElement.addEventListener("ended", toggleButton);

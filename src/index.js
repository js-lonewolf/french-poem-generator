function displayPoem(response) {
  console.log("poem generated");

  new Typewriter("#poem", {
    strings: response.data.answer,
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

function generatePoem(event) {
  event.preventDefault();
  let instructionsInput = document.querySelector("#user-instructions");

  const apiKey = "dft10323o6d9fb991fa39c38200b574f";
  let prompt = `User instructions: Generate a French poem about ${instructionsInput.value}`;
  let context =
    "You're a romantic Poem expert and love to write short poem. Your mission is to generate a 4 line poem and separate each line with a <br />. Make sure to follow the user instructions. Sign the poem with 'SheCodes AI' inside a <strong>element";
  const apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let poemElement = document.querySelector("#poem");
  poemElement.classList.remove("hidden");
  poemElement.innerHTML = `<div class="generating">⏳ Generating a French poem about ${instructionsInput.value}</div>`;

  console.log("Generating poem");
  console.log(`Prompt: ${prompt}`);
  console.log(`Context: ${context}`);
  axios
    .get(apiURL)
    .then((response) => {
      displayPoem(response);
    })
    .catch((error) => {
      console.error("Error generating poem:", error);
    });
}

let poemFormElement = document.querySelector("#poem-generator-form");
poemFormElement.addEventListener("submit", generatePoem);

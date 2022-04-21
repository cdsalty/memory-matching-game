// console.log("sanity-check");
const section = document.querySelector("section");
let playerLivesSpanTag = document.querySelector("span");

// Determine the amount of lives a player should get (Difficulty settings)
let livesRemaining = 3;

playerLivesSpanTag.textContent = livesRemaining;

// Generate the HTML/Cards
const getCards = () => [
  // generally, you will return "{ }" but in this case, we need an array of objects so we use [{}];
  { imgSrc: "./images/dobby.jpeg", name: "Dobby" },
  { imgSrc: "./images/funny_eyes.jpeg", name: "Dumbledore" },
  { imgSrc: "./images/Hagwrid.jpeg", name: "Hagrid" },
  { imgSrc: "./images/harry_potter.jpeg", name: "Harry" },
  { imgSrc: "./images/Hermine.jpeg", name: "Hermione" },
  { imgSrc: "./images/professor_snape.jpeg", name: "Sanpe" },
  { imgSrc: "./images/harry_herm_ron.jpeg", name: "Group" },
  { imgSrc: "./images/voldemore.jpeg", name: "Voldemort" },
  { imgSrc: "./images/dobby.jpeg", name: "Dobby" },
  { imgSrc: "./images/funny_eyes.jpeg", name: "Dumbledore" },
  { imgSrc: "./images/Hagwrid.jpeg", name: "Hagrid" },
  { imgSrc: "./images/harry_potter.jpeg", name: "Harry" },
  { imgSrc: "./images/Hermine.jpeg", name: "Hermione" },
  { imgSrc: "./images/professor_snape.jpeg", name: "Sanpe" },
  { imgSrc: "./images/harry_herm_ron.jpeg", name: "Group" },
  { imgSrc: "./images/voldemore.jpeg", name: "Voldemort" },
];

// Create a function to put the cards in a random order
const randomizeCards = () => {
  const cardData = getCards();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

// Create a function that will call the randomizeCards function and generate the HTML
const cardGenerator = () => {
  const cardData = randomizeCards();
  // STEP 1: generate the cards from the randomize cardData
  cardData.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    // Attach images
    face.src = item.imgSrc;
    // Step 2: for each card, give it a an Attribute of name and then define the value to attach.
    card.setAttribute("name", item.name); // Sets the value of an attribute on the specified element. If the attribute already exists, the value is updated; otherwise a new attribute is added with the specified name and value.
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    // STEP 4: (FINAL PART) EVENT LISTENERS
    card.addEventListener("click", (e) => {
      // add the functionality to toggle the card over when clicked (add the css for "turnCard")
      card.classList.toggle("turnCard");
      checkForMatch(e);
    });
  });
};

// Check cards for match functionality
const checkForMatch = (e) => {
  // First: We need get the cards clicked to check; We need to grab by their name
  const cardClicked = e.target;
  // A. Start checking the logic for checking for a match
  cardClicked.classList.add("flipped"); // This must be above the dom method below
  const flippedCards = document.querySelectorAll(".flipped");
  // console.log(flippedCards.length);
  // LOGIC: Every time we click on a card, we add a flip class to it and then we check if the flipped classes has a length of 2.
  if (flippedCards.length === 2) {
    // check the cards by their name attribute to check for match
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      console.log("MATCH");
      // will need to run a forEach for each scenerio:
      // 1) remove the animation that's turning over the card because we don't want to turn it back over.
      // 2) remove the ability to click or select the cards again
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      console.log("There is no match");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        // card.classList.remove("turnCard");  // without this, you can't click the other card...
        setTimeout(() => card.classList.remove("turnCard"), 1000);
      });
      livesRemaining--;
      playerLivesSpanTag.textContent = livesRemaining;
      console.log({ livesRemaining });
      if (livesRemaining === 0) {
        console.log("reached the if statement");
        restartGame();
      }
    }
  }
};
// Next: Create a game over/restart game;
const restartGame = () => {
  let cardData = randomizeCards;
  console.log("the cardData has been randomized");
  let faces = document.getElementsByClassName(".face");
  let cards = document.getElementsByClassName(".back");
  livesRemaining = 3;
  playerLivesSpanTag.textContent = livesRemaining;
  console.log("Here");
  cardData.forEach((index, item) => {
    console.log("foreachstatement");
    // loop over each card, remove turnCard/flip over all cards
    cards[index].classList.remove("turnCard");
    // main reason behind this is to prevent the user from seeing the new face of the card as it changes before flicpped back over.
    setTimeout(() => {
      // randomize the order
      cards[index].style.pointerEvents = "all";
      // need to update the faces
      faces[index].src = item.imgSrc;
      // update name and set it to the new randomized name from the cardData
      faces[index].setAttribute("name", item.name);
    });
  }, 1000);
  // letlivesRemaining = 3;
  // playerLivesSpanTag.textContent = livesRemaining;
};

// Invoke cardGenerator function
cardGenerator();

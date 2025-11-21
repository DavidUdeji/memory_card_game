const section = document.querySelector("section");

const playerLivesCount = document.querySelector("span");
let playerLives = 6;

//Link text
playerLivesCount.textContent = playerLives;

//generate dats
const getData = () => [
  { imgSrc: "./img/img3.jpg", name: "a" },
  { imgSrc: "./img/img4.jpg", name: "b" },
  { imgSrc: "./img/img5.jpg", name: "c" },
  { imgSrc: "./img/img6.jpg", name: "d" },
  { imgSrc: "./img/img7.jpg", name: "e" },
  { imgSrc: "./img/img8.jpg", name: "f" },
  { imgSrc: "./img/img9.jpg", name: "g" },
  { imgSrc: "./img/img10.jpg", name: "h" },
  { imgSrc: "./img/img3.jpg", name: "a" },
  { imgSrc: "./img/img4.jpg", name: "b" },
  { imgSrc: "./img/img5.jpg", name: "c" },
  { imgSrc: "./img/img6.jpg", name: "d" },
  { imgSrc: "./img/img7.jpg", name: "e" },
  { imgSrc: "./img/img8.jpg", name: "f" },
  { imgSrc: "./img/img9.jpg", name: "g" },
  { imgSrc: "./img/img10.jpg", name: "h" },
];
//Randomize
const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};
// cardGenerator
const cardGenerator = () => {
  const cardData = randomize();
  console.log(cardData);
  // generate the HTML
  cardData.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    //attach info to data
    face.src = item.imgSrc;
    card.setAttribute("name", item.name);
    // attach cards to the section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};
// check cards
const checkCards = (e) => {
  const clickedCard = e.target;
  console.log(clickedCard);
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");
  console.log(flippedCards);
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      console.log("Matched");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      console.log("Wrong");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"), 1000);
      });
      playerLives--;
      playerLivesCount.textContent = playerLives;
      if (playerLives === 0) {
        restart("you failed,try again");
      }
    }
  }
  // check if we won
  if (toggleCard.length === 16) {
    restart("you have won the game");
  }
};

const restart = (text) => {
  let cardData = randomize();
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";
  cardData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");
    // randomize
    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      faces[index].src = item.imgSrc;
      cards[index].setAttribute("name", item.name);
    }, 1000);
    section.style.pointerEvents = "all";
  });
  playerLives = 6;
  playerLivesCount.textContent = playerLives;
  setTimeout(() => {
    window.alert(text), 1000;
  });
};
cardGenerator();

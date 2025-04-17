// study.js
// client-side script for handling flashcard study

const flashcard = document.querySelector('#flashcard');
const flashcardText = document.querySelector('#flashcard-value');
const prevButton = document.querySelector('#previous-button');
const nextButton = document.querySelector('#next-button');
const shuffleButton = document.querySelector('#shuffle-button');
const currentCard = document.querySelector('#current-card');

const setID = document.querySelector('main').dataset.id;

let cards = [];
let currentIndex = 0;
let showingAnswer = false;
let shuffled = false;

// rendering functions

const renderCard = () => {
  const card = cards[currentIndex];
  void flashcardText.offsetWidth;
  flashcardText.textContent = showingAnswer ? card.answer : card.question;
  currentCard.textContent = currentIndex + 1;

  if (showingAnswer) {
    flashcardText.classList.add('normal');
  } else {
    flashcardText.classList.remove('normal');
  }

  // disable buttons at ends
  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === cards.length - 1;

  // visually indicate disabled state
  prevButton.classList.toggle('disabled', prevButton.disabled);
  nextButton.classList.toggle('disabled', nextButton.disabled);
};

const shuffleArray = (array) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const nextCard = () => {
  currentIndex = (currentIndex + 1) % cards.length;
  showingAnswer = false;
  renderCard();
};

const prevCard = () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  showingAnswer = false;
  renderCard();
};

// animation function

const animateCard = (f, animationClass) => {
  flashcard.classList.add(animationClass);

  setTimeout(() => {
    f(); // update card content mid-animation
  }, 200);

  setTimeout(() => {
    flashcard.classList.remove(animationClass);
  }, 400); // matches animation duration
};

// main function

const main = async () => {
  const response = await fetch(`/card/json/${setID}`);
  const data = await response.json();

  if (!response.ok) {
    console.error(cards.message);
  }

  cards = data;
  renderCard();

  // keyboaard event listeners

  document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowRight') {
      nextButton.classList.add('enabled');
    } else if (e.code === 'ArrowLeft') {
      prevButton.classList.add('enabled');
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowRight') {
      nextButton.classList.remove('enabled');
      if (!nextButton.disabled) {
        animateCard(nextCard, 'switch');
      }
    } else if (e.code === 'ArrowLeft') {
      prevButton.classList.remove('enabled');
      if (!prevButton.disabled) {
        animateCard(prevCard, 'switch');
      }
    } else if (e.code === 'Space') {
      e.preventDefault(); // prevent page scrolling
      showingAnswer = !showingAnswer;
      animateCard(renderCard, 'flip');
    }
  });

  // click event listeners

  nextButton.addEventListener('click', () => {
    animateCard(nextCard, 'switch');
  });

  prevButton.addEventListener('click', () => {
    animateCard(prevCard, 'switch');
  });

  shuffleButton.addEventListener('click', () => {
    shuffled = !shuffled;
    shuffleButton.classList.toggle('enabled');
    cards = shuffled ? shuffleArray(cards) : data;
    currentIndex = 0;
    showingAnswer = false;
    renderCard();
  });

  flashcard.addEventListener('click', () => {
    showingAnswer = !showingAnswer;
    animateCard(renderCard, 'flip');
  });
};

main();

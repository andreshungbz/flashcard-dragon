// create.js
// client-side script for adding flashcards

const form = document.querySelector('form[name=add-flashcard]');
const inputQuestion = document.querySelector('input#card_question');
const inputAnswer = document.querySelector('input#card_answer');
const list = document.querySelector('.set-cards');

// creates the card DOM element
const renderCard = (card) => {
  const cardElement = document.createElement('div');
  cardElement.classList.add('set-card');
  cardElement.dataset.id = card.id;

  cardElement.innerHTML = `
    <div>
      <h3>${card.question}</h3>
      <p>${card.answer}</p>
    </div>
    <div class="set-card-options">
      <a class="card-option-update" href="/card/${card.id}/update">Update</a>
      <button class="card-option-delete">Delete</button>
    </div>
  `;

  list.appendChild(cardElement);
};

// adds card to database
const addCard = async (event) => {
  event.preventDefault();

  try {
    const data = new URLSearchParams();
    data.set('set_id', form.dataset.id);
    data.set('card_question', inputQuestion.value);
    data.set('card_answer', inputAnswer.value);

    const response = await fetch('/card/create', {
      method: 'POST',
      body: data,
    });

    const card = await response.json();

    if (!response.ok) {
      throw new Error(card.message);
    }

    renderCard(card);
  } catch (error) {
    console.error(error);
  }

  // reset form values
  inputQuestion.value = '';
  inputAnswer.value = '';
};

form.addEventListener('submit', addCard);

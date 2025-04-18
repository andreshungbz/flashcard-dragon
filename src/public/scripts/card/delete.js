// delete.js
// client-side script that deletes card

const cardList = document.querySelector('.set-cards');

// use event delegation to handle deleting cards
list.addEventListener('click', async (event) => {
  const deleteButton = event.target.closest('.card-option-delete');
  if (!deleteButton) return;

  const cardElement = deleteButton.closest('.set-card');
  const cardId = cardElement.dataset.id;

  try {
    const response = await fetch(`/card/${cardId}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    // remove card from DOM
    cardElement.remove();
  } catch (error) {
    console.error(error);
  }
});

// add a confirmation when deleting a flashcard set

const deleteSetButton = document.querySelector('#delete-set-button');

const confirmDeleteSet = (event) => {
  const confirmed = confirm(
    'Are you sure you want to delete this set? (All associated cards will be deleted)'
  );

  // this will prevent the form from submitting
  if (!confirmed) {
    event.preventDefault();
  }
};

deleteSetButton.addEventListener('click', confirmDeleteSet);

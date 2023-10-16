'use strict';

// Selecting elements.
const player0Elm = document.querySelector('.player--0');
const player1Elm = document.querySelector('.player--1');
const score0Elm = document.getElementById('score--0');
const score1Elm = document.getElementById('score--1');
const current0Elm = document.getElementById('current--0');
const current1Elm = document.getElementById('current--1');
const playersElm = document.querySelectorAll('.player');

const diceElm = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, isPlaying;

const init = () => {
  /**
   * Reset all values to default ones.
   */
  score0Elm.textContent = String(0);
  score1Elm.textContent = String(0);
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  diceElm.classList.add('hidden');
  player0Elm.classList.remove('player--winner');
  player1Elm.classList.remove('player--winner');
  player1Elm.classList.remove('player--active');
  // Player 1 is from now on the active player.
  player0Elm.classList.add('player--active');
};

init();

const updateCurrentScore = (/** @type {number} */ currentScore) =>
  (document.getElementById(`current--${activePlayer}`).textContent = String(currentScore));

const switchPlayer = () => {
  currentScore = 0;
  updateCurrentScore(currentScore);
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Elm.classList.toggle('player--active');
  player1Elm.classList.toggle('player--active');
};

// Rolling dice functionality.
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    // 1. Generate a random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice.
    diceElm.src = `dice-${dice}.png`;
    diceElm.classList.remove('hidden');

    // 3. Check for rolled 1.
    // Add dice to current score.
    if (dice !== 1) {
      currentScore += dice;
      updateCurrentScore(currentScore);
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    // 1. Add current score to active player's total score.
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = String(scores[activePlayer]);

    // 2. Check if score is >= 100.
    if (scores[activePlayer] >= 100) {
      // Finish the game
      isPlaying = false;
      diceElm.classList.add('hidden');
      currentScore = 0;
      updateCurrentScore(currentScore);
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      // Switch to next player.
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

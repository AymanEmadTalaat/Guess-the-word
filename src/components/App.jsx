import "../styles/App.css";
import { useState } from "react";
import Header from "./Header.jsx";
import Status from "./Status.jsx";
import Languages from "./Languages.jsx";
import { languages } from "./languages";
import { randomWord } from "./utils.js";
import clsx from "clsx";
import Confetti from "react-confetti";

function App() {
  //State values
  const [currentWord, setCurrentWord] = useState(() => randomWord());
  const [guessedLetter, setGuessedLetter] = useState([]);

  //Derived values
  const wrongGuessCount = guessedLetter.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const isGameWon = currentWord
    .split("")
    .every((letter) => (guessedLetter.includes(letter) ? true : false));

  const isGameOver = wrongGuessCount >= languages.length ? true : false;

  const lastGuessedLetter = guessedLetter[guessedLetter.length - 1];

  const isLastLetterTrue =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  //Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  function handleGuessedLetter(letter) {
    setGuessedLetter((prev) =>
      prev.includes(letter) ? prev : [...prev, letter]
    );
  }

  ////////////////
  const currentWordArr = currentWord.split("").map((letter, index) => {
    const correct = guessedLetter.includes(letter);

    const wrong = !guessedLetter.includes(letter);

    const classNames = clsx({
      visible: correct,
      invisible: wrong,
      gameOver: isGameOver,
    });

    return (
      <span className={classNames} key={index}>
        {letter.toUpperCase()}
      </span>
    );
  });

  /////////////////
  const keyboardArr = alphabet.split("").map((letter) => {
    const correct =
      guessedLetter.includes(letter) && currentWord.includes(letter);

    const wrong =
      guessedLetter.includes(letter) && !currentWord.includes(letter);

    const classNames = clsx({
      green: correct,
      red: wrong,
    });

    return (
      <button
        className={classNames}
        onClick={() => handleGuessedLetter(letter)}
        aria-label={`Letter ${letter} clicked`}
        key={letter}
        disabled={isGameOver || isGameWon ? true : false}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  //////////////////
  const newLanguages = languages.map((language, index) => {
    const classNames = clsx(index < wrongGuessCount && "lost");

    return <Languages lost={classNames} key={language.name} {...language} />;
  });

  //////////////////
  return (
    <div className="container">
      {isGameWon && (
        <Confetti className="confetti" recycle={false} numberOfPieces={1000} />
      )}
      <Header />
      <Status
        youLost={isGameOver}
        youWon={isGameWon}
        lastLetter={isLastLetterTrue}
        language={
          !isGameOver && !isGameWon && isLastLetterTrue
            ? languages[wrongGuessCount - 1].name
            : ""
        }
      />

      <div className="languages-container">{newLanguages}</div>

      <div className="words-container">{currentWordArr}</div>

      {/*Status updates for Screen readers*/}
      <div className="sr-only" aria-live="polite" role="status">
        <p>
          {currentWord.includes(lastGuessedLetter)
            ? `Correct, the letter ${lastGuessedLetter} is in the word`
            : `Sorry, the letter ${lastGuessedLetter} is not in the word`}
        </p>
        <p>Current word: {currentWord}</p>
      </div>

      <div className="keyboard">{keyboardArr}</div>

      {isGameOver || isGameWon ? (
        <button
          onClick={() => {
            setCurrentWord(randomWord()), setGuessedLetter([]);
          }}
          type="submit"
          className="btn"
          aria-label="New game button"
        >
          New Game
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;

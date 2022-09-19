import React from "react";
import { costPerBet } from "../../config/constants";
import { availableChoices, GameContext } from "../../stores/game.store";
import Choice from "../Choice";
import "./index.scss";

function GameArea() {
  const {
    choices,
    onChoiceSelected,
    play,
    computerChoice,
    step,
    winner,
    currentWon,
    reset,
    balance,
  } = React.useContext(GameContext);

  const onPlay = () => {
    if (balance <= 0) {
        alert("You don\'t have enough balance to play");
        return;
    } 
    play();
  };
  return (
    <section className="game-area">
      <div className="game-updates">
        {step === "play" ? (
          <div className="versus">
            {choices.join(", ")} <span className="versus-text">VS</span> {computerChoice}
          </div>
        ) : null}
        {step === "result" ? (
          <div className="winner">
            <div className={`winner-text ${currentWon > 0 ? "won" : "loss"}`}>
              {winner ? `${winner?.toUpperCase()} WON` : "DRAW"}{" "}
            </div>
            <div>
              {currentWon > 0 ? "YOU WIN" : " YOU LOSE"}{" "}
              <span className="amount">{currentWon > 0 ? currentWon : costPerBet}</span>
            </div>
          </div>
        ) : null}
      </div>

      <div className="instruction">PICK YOUR POSITIONS</div>
      <div className="choices">
        {availableChoices.map((choice) => (
          <Choice
            key={choice}
            onSelect={onChoiceSelected}
            choice={choice}
            selected={choices.includes(choice)}
            active={winner === choice}
          />
        ))}
      </div>

      {step === "result" ? (
        <button className="action-btn" onClick={reset}>
          CLEAR
        </button>
      ) : (
        <button
          className="action-btn"
          disabled={!choices.length || step === "play"}
          onClick={onPlay}
        >
          PLAY
        </button>
      )}
    </section>
  );
}

export default GameArea;

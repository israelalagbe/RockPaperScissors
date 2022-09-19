import React, { createContext, useState, FC, useEffect, useCallback } from "react";
import { costPerBet } from "../config/constants";
import { ChoiceType, GameContextState, GameProviderProps } from "./types";

export const availableChoices: ChoiceType[] = ["rock", "paper", "scissors"];

const contextDefaultValues: GameContextState = {
  step: 'start',
  balance: 5000,
  totalBet: 0,
  totalWon: 0,
  currentWon: 0,
  choices: [],
  computerChoice: null,
  winner: null,
  reset: () => {},
  onChoiceSelected: (choice: ChoiceType) => {},
  play: () => {},
};

export const GameContext = createContext<GameContextState>(contextDefaultValues);

const TodosProvider: FC<GameProviderProps> = (props) => {
  const [state, setState] = useState<GameContextState>(contextDefaultValues);

  const onChoiceSelected = (choice: ChoiceType) => {
    const { choices } = state;
    if (choices.includes(choice)) {
      return setState({
        ...state,
        choices: choices.filter((c) => c !== choice),
      });
    }
    if (choices.length >= 2) {
      return;
    }

    setState({
      ...state,
      choices: [...choices, choice],
    });
  };

  const reset = () => {
    setState({
      ...state,
      computerChoice: null,
      winner: null,
      choices: [],
      step: 'start'
    });
  };

  const computeWinner = useCallback(() => {
    
    const { choices, computerChoice } = state;
     
    if(!computerChoice) return;

    let playerWon = false;
    let currentWon = 0;
    let winningChoice:ChoiceType|null = null;

    //every tie is treated as loss to player
    for(const choice of choices) {
      if(choice === 'rock' && computerChoice === 'scissors') {
        playerWon = true;
        winningChoice = choice;
        break;
      }
      if(choice === 'paper' && computerChoice === 'rock') {
        playerWon = true;
        winningChoice = choice;
        break;
      }
      if(choice === 'scissors' && computerChoice === 'paper') {
        playerWon = true;
        winningChoice = choice;
        break;
      }
    }

    //if player didn't win and no draw, then computer won
    if(!winningChoice && !choices.includes(computerChoice)){
      winningChoice = computerChoice;
    }

    if(playerWon) {
      currentWon = costPerBet * (choices.length === 2 ? 3 : 14);
    }

    
    setState({
      ...state,
      winner: winningChoice,
      step: 'result',
      totalWon: state.totalWon + currentWon,
      balance: state.balance + currentWon,
      currentWon
    });
  }, [state]);

  const play = () => {
    const randomItem = availableChoices[Math.floor(Math.random() * availableChoices.length)];
    setState({
      ...state,
      computerChoice: randomItem,
      step: 'play',
      balance: state.balance - costPerBet,
      totalBet: state.totalBet + costPerBet
    });

    
  };

  useEffect(() => {
    if(state.step === 'play') {
      setTimeout(computeWinner, 2000);
    }
  }, [state.step, computeWinner]);

  return (
    <GameContext.Provider
      value={{
        ...state,
        reset,
        onChoiceSelected,
        play
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default TodosProvider;

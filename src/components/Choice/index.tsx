import React from "react";
import { costPerBet } from "../../config/constants";
import { ChoiceType } from "../../stores/types";
import "./index.scss";

interface ChoiceProps {
  choice: ChoiceType;
  active?: boolean;
  onSelect: (choice: ChoiceType) => void;
}

function Choice(props: ChoiceProps) {
  const onSelect = () => props.onSelect(props.choice);
  return (
    <button
      onClick={onSelect}
      className={`choice ${props.choice} ${props.active ? "active" : ""}`}
    >
      <span className={`choice-cost ${props.active ? 'v-visible' : ''}`}>{costPerBet}</span>
      <span className="choice-text">{props.choice.toUpperCase()}</span>
    </button>
  );
}

export default Choice;

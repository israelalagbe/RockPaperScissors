export type ChoiceType = "rock" | "paper" | "scissors";

export type GameContextState = {
  step: 'start' | 'play' | 'result';
  balance: number;
  totalBet: number;
  totalWon: number;
  currentWon: number;
  choices: ChoiceType[];
  computerChoice: ChoiceType | null;
  winner: ChoiceType | null;
  reset: () => void;
  onChoiceSelected: (choice: ChoiceType) => void;
  play: () => void;
};

export interface GameProviderProps {
  children: React.ReactNode;
}

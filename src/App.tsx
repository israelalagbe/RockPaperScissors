import React from "react";
import "./App.css";
import TopBar from "./components/TopBar";
import GameArea from "./components/GameArea";
import TodosProvider from "./stores/game.store";

function App() {
  return (
    <TodosProvider>
      <main className="App">
        <TopBar />
        <GameArea />
      </main>
    </TodosProvider>
  );
}

export default App;

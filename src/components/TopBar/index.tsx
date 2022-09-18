import React from "react";
import { GameContext } from "../../stores/game.store";
import './index.scss';

function TopBar() {
    const {balance, totalBet, totalWon} = React.useContext(GameContext);
    return (
        <nav className="topbar">
            <span className="key">BALANCE:</span> <span className="value">{balance}</span>
            <span className="key">BET:</span> <span className="value">{totalBet}</span>
            <span className="key">WIN:</span> <span className="value">{totalWon}</span>
        </nav>
    );
}

export default TopBar;
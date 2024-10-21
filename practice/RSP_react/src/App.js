import { useState } from 'react';
import HandButton from './HandButton.js';
import HandIcon from './HandIcon.js';
import { compareHand, generateRandomHand } from './utils';
import resetBtn from './assets/ic-reset.svg';
import './css/style.css';
import './css/App.css';

const INITIAL_HAND = 'rock';

function getResult(me, opponent) {
  const comparison = compareHand(me, opponent);
  if (comparison > 0) return '승리';
  if (comparison < 0) return '패배';
  return '무승부';
}

function App() {
  const [hand, setHand] = useState(INITIAL_HAND);
  const [opponentHand, setOpponentHand] = useState(INITIAL_HAND);
  const [gameHistory, setGameHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [bet, setBet] = useState(1);

  const handleButtonClick = (nextHand) => {
    const nextOpponentHand = generateRandomHand();
    const nextHistoryItem = getResult(nextHand, nextOpponentHand);
    const comparison = compareHand(nextHand, nextOpponentHand);

    setHand(nextHand);
    setOpponentHand(nextOpponentHand);
    setGameHistory([...gameHistory, nextHistoryItem]);
    if (comparison > 0) setScore(score + bet);
    if (comparison < 0) setOpponentScore(opponentScore + bet);
  };

  const handleClearClick = () => {
    setHand(INITIAL_HAND);
    setOpponentHand(INITIAL_HAND);
    setGameHistory([]);
    setScore(0);
    setOpponentScore(0);
    setBet(1);
  };

  const handleBetChange = (e) => {
    const input = parseInt(e.target.value);

    if (input === 'NaN') {
      setBet(1);
    } else {
      const val = Math.floor(input);
      if (val > 9) {
        setBet(9);
        return;
      }
      if (val < 1) {
        setBet(1);
        return;
      }

      setBet(val);
    }
  };
  return (
    <div className="App">
      <h1 className="App-heading">가위바위보</h1>
      <img
        className="App-reset"
        src={resetBtn}
        alt="reset"
        onClick={handleClearClick}
      />
      <div className="App-scores">
        <div className="Score">
          <div className="Score-num">{score}</div>
          <div className="Score-name">나</div>
        </div>
        <div className="App-verses">:</div>
        <div className="Score">
          <div className="Score-num">{opponentScore}</div>
          <div className="Score-name">상대</div>
        </div>
      </div>
      <div className="Box App-box">
        <div className="Box-inner">
          <div className="App-hands">
            <div className="Hand">
              <HandIcon value={hand} className="Hand-icon" />
            </div>
            <div className="App-versus">VS</div>
            <div className="Hand">
              <HandIcon value={opponentHand} className="Hand-icon" />
            </div>
          </div>
          <div className="App-bet">
            <span>배점</span>
            <input
              type="number"
              value={bet}
              min={1}
              max={9}
              onChange={handleBetChange}
            />
            <span>배</span>
          </div>
          <div className="App-history">
            <h2>승부기록</h2>
            <p>{gameHistory.join(', ')}</p>
          </div>
        </div>
      </div>
      <HandButton value="rock" onClick={handleButtonClick} />
      <HandButton value="scissor" onClick={handleButtonClick} />
      <HandButton value="paper" onClick={handleButtonClick} />
    </div>
  );
}

export default App;

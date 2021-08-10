import React, { useState, useEffect } from 'react';
import utils from '../utils-math';

import StarDisplay from './StarDisplay';
import PlayNumber from './PlayNumber';
import PlayAgain from './PlayAgain';


// Custom Hook
const useGameState = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);
 
  useEffect(() => {
    if (secondsLeft > 0  && availableNums.length > 0) {
      const timerId = setTimeout( () => {
      setSecondsLeft(secondsLeft - 1);
      } , 1000);
      return () => clearTimeout(timerId);
    }
  });
 
  const setGameState = (newCandidateNums) => {
    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums)
    } else {
      const newAvailableNums = availableNums.filter(n =>
      !newCandidateNums.includes(n)
      );
      setStars(utils.randomSumIn(newAvailableNums, 9))
      setAvailableNums(newAvailableNums);
      setCandidateNums([])
    }
  }
  return {stars, availableNums, candidateNums, secondsLeft, setGameState}
}
const Game = props => {
const {stars, availableNums, candidateNums, secondsLeft, setGameState} = useGameState();
 
  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  // const gameIsWon = availableNums.length === 0;
  // const gameIsLost = secondsLeft === 0;
  const gameStatus = availableNums.length === 0
  ? 'won'
  : secondsLeft === 0 ? 'lost' : 'active';
 
  const numberStatus = number => {
    if (!availableNums.includes(number)) {
      return 'used';
    }
    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }
    return 'available';
  }
 
  const onNumberClick = (number, currentStatus) => {
    // currentStatus => newStatus
    if (gameStatus !== 'active' || currentStatus === 'used') return;
    // candidateNums
    const newCandidateNums = currentStatus === 'available'
    ? candidateNums.concat(number)
    : candidateNums.filter(cn => cn !== number );
    setGameState(newCandidateNums)
  }
 
  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== 'active' ? (
          <PlayAgain
            gameStatus={gameStatus}
            onClick={props.startNewGame}/>
          ) : (
          <StarDisplay count={stars}/>
          )}
        </div>
        <div className="right">
          {utils.range(1, 9).map(num => 
            <PlayNumber
              key={num}
              status={numberStatus(num)}
              num={num}
              onClick={onNumberClick}
              />
          )}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};

export default Game;
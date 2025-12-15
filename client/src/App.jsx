import cards from '../utils/cards';
import GameBoard from './pages/room/game';
import StartScreen from './pages/room/startScreen';

import { useState } from 'react';

function GameRoom() {
  const [started, setStarted] = useState(false);

  if (started) {
    return <GameBoard cards={cards} />;
  } else {
    return <StartScreen startGame={() => setStarted(true)} onLeave={() => {}} />;
  }
}

export default GameRoom;

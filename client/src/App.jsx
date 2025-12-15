import { useNavigate, useParams } from 'react-router';
import cards from '../utils/cards';
import GameBoard from './pages/room/game';
import StartScreen from './pages/room/startScreen';

import { useContext, useState } from 'react';
import { SocketContext } from './SocketProvider';

function GameRoom() {
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const params = useParams();

  const [started, setStarted] = useState(false);

  if (started) {
    return <GameBoard cards={cards} />;
  } else {
    return (
      <StartScreen
        startGame={() => setStarted(true)}
        onLeave={() => {
          navigate('/');
          socket.emit('leave:room', { roomId: params.id, userId: 'self' });
        }}
      />
    );
  }
}

export default GameRoom;

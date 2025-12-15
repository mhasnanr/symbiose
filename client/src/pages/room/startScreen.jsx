const StartScreen = ({ startGame, onLeave }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: '10px',
      }}
    >
      <h1>Welcome to the Game Room</h1>
      <button onClick={startGame}>Start Game</button>
      <button onClick={onLeave}>Leave Room</button>
    </div>
  );
};

export default StartScreen;

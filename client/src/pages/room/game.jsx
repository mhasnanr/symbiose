import {
  convertTypeIntoEmoji,
  pickFirstPlayer,
  randomizeRiver,
} from '../../../utils/game-mechanics';
import './game.css';

import { useCallback, useEffect, useState } from 'react';

const GameState = {
  PREPARING: 'preparing',
  PLAYING: 'playing',
  ENDED: 'ended',
};

const PickMode = {
  OPEN_SWAP: 'swap_on_open',
  CLOSE_SWAP: 'swap_on_close',
  NONE: 'none',
};

const GameBoard = ({ cards }) => {
  const [gameState, setGameState] = useState(GameState.PREPARING);
  const [cardsOnDeck, setCardsOnDeck] = useState([]);

  const [playerOrder, setPlayerOrder] = useState([]);
  const [counter, setCounter] = useState(0);

  const [rivers, setRivers] = useState([]);

  const [players, setPlayers] = useState([
    { id: 1, cards: Array.from({ length: 8 }, () => null), score: 0 },
    { id: 2, cards: Array.from({ length: 8 }, () => null), score: 0 },
    { id: 3, cards: Array.from({ length: 8 }, () => null), score: 0 },
    { id: 4, cards: Array.from({ length: 8 }, () => null), score: 0 },
  ]);
  const [pickMode, setPickMode] = useState(PickMode.NONE);

  const [selectedPairs, setSelectedPairs] = useState({
    pond: null, // { pondIndex, cardIndex }
    river: null, // cardIndex
  });

  useEffect(() => {
    const firstPlayerIndex = pickFirstPlayer(4);
    const order = Array.from({ length: 4 }).map(
      (_, index) => ((firstPlayerIndex + index - 1) % 4) + 1
    );
    setPlayerOrder(order);
    setRivers(randomizeRiver(cards));
  }, []);

  useEffect(() => {
    setCardsOnDeck(cards.filter((card) => !rivers.includes(card)));
  }, [rivers]);

  const onRiverClick = (cardIndex) => {
    if (pickMode === PickMode.OPEN_SWAP) {
      alert(
        'You are in the middle of an open swap. Please select a pond card to complete the swap.'
      );
      return;
    }

    if (gameState === GameState.PREPARING) {
      alert('You cannot select river cards during the preparing phase.');
      return;
    }

    setSelectedPairs((prev) => ({ ...prev, river: cardIndex }));
  };

  const onPondClick = (pondIndex, cardIndex) => {
    if (gameState === GameState.ENDED) {
      return;
    }

    if (playerOrder[counter] !== pondIndex) {
      alert(`It's Player ${playerOrder[counter]}'s turn`);
      return;
    }

    if (gameState === GameState.PREPARING) {
      // get random one card from cardsOnDeck
      const randomCardIndex = Math.floor(Math.random() * cardsOnDeck.length);
      const randomCard = cardsOnDeck[randomCardIndex];

      setCardsOnDeck((prev) =>
        prev.filter((_, index) => index !== randomCardIndex)
      );

      setPlayers((prev) =>
        prev.map((player) =>
          player.id === pondIndex
            ? {
                ...player,
                cards: player.cards.map((card, idx) =>
                  idx === cardIndex ? randomCard : card
                ),
              }
            : player
        )
      );

      setCounter((prev) => (prev + 1 === 4 ? 0 : prev + 1));

      if (counter + 1 >= 4) {
        setGameState(GameState.PLAYING);
      }

      return;
    }

    if (gameState === GameState.PLAYING) {
      if (pickMode === PickMode.OPEN_SWAP) {
        const alreadyOpenedCard = players.find((p) => p.id === pondIndex).cards[
          cardIndex
        ];

        if (alreadyOpenedCard != null) {
          alert('You can only select an empty pond card during an open swap.');
          return;
        }

        const randomCardIndex = Math.floor(Math.random() * cardsOnDeck.length);
        const randomCard = cardsOnDeck[randomCardIndex];

        setCardsOnDeck((prev) =>
          prev.filter((_, index) => index !== randomCardIndex)
        );

        setPlayers((prev) =>
          prev.map((player) =>
            player.id === pondIndex
              ? {
                  ...player,
                  cards: player.cards.map((card, idx) =>
                    idx === cardIndex ? randomCard : card
                  ),
                }
              : player
          )
        );

        setCounter((prev) => (prev + 1 === 4 ? 0 : prev + 1));

        if (counter + 1 >= 4) {
          setGameState(GameState.PLAYING);
        }
        setPickMode(PickMode.NONE);
        return;
      }

      if (selectedPairs.river == null) {
        alert('Select river card first');
        return;
      }

      const riverCard = rivers[selectedPairs.river];
      const pondCard = players.find((p) => p.id === pondIndex).cards[cardIndex];

      if (pondCard == null) {
        setPickMode(PickMode.CLOSE_SWAP);
        const randomCardIndex = Math.floor(Math.random() * cardsOnDeck.length);
        const randomCard = cardsOnDeck[randomCardIndex];

        setCardsOnDeck((prev) =>
          prev.filter((_, index) => index !== randomCardIndex)
        );

        setRivers((prev) =>
          prev.map((card, index) =>
            index === selectedPairs.river ? randomCard : card
          )
        );

        setPlayers((prev) =>
          prev.map((player) =>
            player.id === pondIndex
              ? {
                  ...player,
                  cards: player.cards.map((card, idx) =>
                    idx === cardIndex ? riverCard : card
                  ),
                }
              : player
          )
        );

        setSelectedPairs({ pond: null, river: null });
        setCounter((prev) => (prev + 1 === 4 ? 0 : prev + 1));
      } else {
        setPickMode(PickMode.OPEN_SWAP);
        setRivers((prev) =>
          prev.map((card, index) =>
            index === selectedPairs.river ? pondCard : card
          )
        );

        setPlayers((prev) =>
          prev.map((player) =>
            player.id === pondIndex
              ? {
                  ...player,
                  cards: player.cards.map((card, idx) =>
                    idx === cardIndex ? riverCard : card
                  ),
                }
              : player
          )
        );

        setSelectedPairs({ pond: null, river: null });
      }
    }
  };

  const calculateScore = () => {
    const updatedPlayers = players.map((player) => {
      let totalScore = 0;
      const cards = player.cards;

      // Untuk player horizontal (1 dan 3)
      if (player.id === 1 || player.id === 3) {
        cards.forEach((card, idx) => {
          if (!card) return;

          if (card.points.type === 'self') {
            // Kartu self langsung tambah poin
            totalScore += card.points.value;
          } else if (idx === 0 || idx === 4) {
            // Leftmost cards: cek board di sebelah kiri (player 2)
            const leftPlayer = players.find((p) => p.id === 4);
            const leftCards = leftPlayer.cards;

            leftCards.forEach((leftCard) => {
              if (!leftCard) return;
              if (
                card.points.type === 'season' &&
                leftCard.season === card.points.season
              ) {
                totalScore += card.points.value;
              } else if (
                card.points.type === 'animal' &&
                leftCard.animal === card.points.animal
              ) {
                totalScore += card.points.value;
              }
            });
          } else if (idx === 3 || idx === 7) {
            // Rightmost cards: cek board di sebelah kanan (player 4)
            const rightPlayer = players.find((p) => p.id === 2);
            const rightCards = rightPlayer.cards;

            rightCards.forEach((rightCard) => {
              if (!rightCard) return;
              if (
                card.points.type === 'season' &&
                rightCard.season === card.points.season
              ) {
                totalScore += card.points.value;
              } else if (
                card.points.type === 'animal' &&
                rightCard.animal === card.points.animal
              ) {
                totalScore += card.points.value;
              }
            });
          } else {
            // Index sisanya (1, 2, 5, 6): cek di board sendiri
            cards.forEach((ownCard) => {
              if (!ownCard || ownCard === card) return;
              if (
                card.points.type === 'season' &&
                ownCard.season === card.points.season
              ) {
                totalScore += card.points.value;
              } else if (
                card.points.type === 'animal' &&
                ownCard.animal === card.points.animal
              ) {
                totalScore += card.points.value;
              }
            });
          }
        });
      }

      // Untuk player vertical (2 dan 4)
      if (player.id === 2 || player.id === 4) {
        cards.forEach((card, idx) => {
          if (!card) return;

          if (card.points.type === 'self') {
            // Kartu self langsung tambah poin
            totalScore += card.points.value;
          } else if (idx === 0 || idx === 1) {
            // atas cards: cek board di sebelah atas
            const leftPlayer = players.find((p) => p.id === 1);
            const leftCards = leftPlayer.cards;

            leftCards.forEach((leftCard) => {
              if (!leftCard) return;
              if (
                card.points.type === 'season' &&
                leftCard.season === card.points.season
              ) {
                totalScore += card.points.value;
              } else if (
                card.points.type === 'animal' &&
                leftCard.animal === card.points.animal
              ) {
                totalScore += card.points.value;
              }
            });
          } else if (idx === 6 || idx === 7) {
            // bawah cards: cek board di sebelah bawah
            const rightPlayer = players.find((p) => p.id === 3);
            const rightCards = rightPlayer.cards;

            rightCards.forEach((rightCard) => {
              if (!rightCard) return;
              if (
                card.points.type === 'season' &&
                rightCard.season === card.points.season
              ) {
                totalScore += card.points.value;
              } else if (
                card.points.type === 'animal' &&
                rightCard.animal === card.points.animal
              ) {
                totalScore += card.points.value;
              }
            });
          } else {
            // Index sisanya (2, 3, 4, 5): cek di board sendiri
            cards.forEach((ownCard) => {
              if (!ownCard || ownCard === card) return;
              if (
                card.points.type === 'season' &&
                ownCard.season === card.points.season
              ) {
                totalScore += card.points.value;
              } else if (
                card.points.type === 'animal' &&
                ownCard.animal === card.points.animal
              ) {
                totalScore += card.points.value;
              }
            });
          }
        });
      }

      return { ...player, score: totalScore };
    });

    setPlayers(updatedPlayers);
  };

  const checkGameState = useCallback(() => {
    const playerCards = players.map((player) => player.cards);

    let flag = true;
    playerCards.forEach((cards) => {
      if (cards.some((card) => card === null)) {
        flag = false;
      }
    });

    return flag;
  }, players);

  useEffect(() => {
    calculateScore();
    const isEnded = checkGameState();
    if (isEnded) {
      setGameState(GameState.ENDED);
    }
  }, [counter]);

  return (
    <div className="container">
      <div className="container-center">
        {/* player 1 */}
        <div className="card-container">
          {players[0].cards.map((card, index) => (
            <div
              key={index}
              style={{ backgroundColor: card?.season || '#37353E' }}
              className={
                playerOrder[counter] === 1 && gameState !== GameState.ENDED
                  ? 'active-player-card horizontal-down'
                  : 'horizontal-down'
              }
              onClick={() => onPondClick(1, index)}
            >
              {card && (
                <>
                  <p class="card-type">{convertTypeIntoEmoji(card.animal)}</p>
                  {card.points.type === 'self' ? (
                    <p>{card.points.value}</p>
                  ) : (
                    <p>
                      {convertTypeIntoEmoji(card.points[card.points.type])} ={' '}
                      {card.points.value}
                    </p>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="container-center">
        {/* player 4 */}
        <div className="card-container vertical">
          {players[3].cards.map((card, index) => (
            <div
              key={index}
              style={{ backgroundColor: card?.season || '#37353E' }}
              className={
                playerOrder[counter] === 4 && gameState !== GameState.ENDED
                  ? 'active-player-card vertical-right'
                  : 'vertical-right'
              }
              onClick={() => onPondClick(4, index)}
            >
              {card && (
                <>
                  <p className="card-type">
                    {convertTypeIntoEmoji(card.animal)}
                  </p>
                  {card.points.type === 'self' ? (
                    <p>{card.points.value}</p>
                  ) : (
                    <p>
                      {convertTypeIntoEmoji(card.points[card.points.type])} ={' '}
                      {card.points.value}
                    </p>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* river */}
        <div className="card-container river">
          {/* kartu, index, player ke-x optional, onClick handler */}
          {rivers.map((river, index) => (
            <div
              key={index}
              style={{ backgroundColor: river.season, fontSize: '13px' }}
              onClick={() => onRiverClick(index)}
            >
              <p class="card-type">{convertTypeIntoEmoji(river.animal)}</p>
              {river.points.type === 'self' ? (
                <p>{river.points.value}</p>
              ) : (
                <p>
                  {convertTypeIntoEmoji(river.points[river.points.type])} ={' '}
                  {river.points.value}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* player 2 */}
        <div className="card-container vertical">
          {players[1].cards.map((card, index) => (
            <div
              key={index}
              style={{ backgroundColor: card?.season || '#37353E' }}
              className={
                playerOrder[counter] === 2 && gameState !== GameState.ENDED
                  ? 'active-player-card vertical-left'
                  : 'vertical-left'
              }
              onClick={() => onPondClick(2, index)}
            >
              {card && (
                <>
                  <p class="card-type">{convertTypeIntoEmoji(card.animal)}</p>
                  {card.points.type === 'self' ? (
                    <p>{card.points.value}</p>
                  ) : (
                    <p>
                      {convertTypeIntoEmoji(card.points[card.points.type])} ={' '}
                      {card.points.value}
                    </p>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="container-center">
        {/* player 3 */}
        <div className="card-container">
          {players[2].cards.map((card, index) => (
            <div
              key={index}
              style={{ backgroundColor: card?.season || '#37353E' }}
              className={
                playerOrder[counter] === 3 && gameState !== GameState.ENDED
                  ? 'active-player-card horizontal-up'
                  : 'horizontal-up'
              }
              onClick={() => onPondClick(3, index)}
            >
              {card && (
                <>
                  <p class="card-type">{convertTypeIntoEmoji(card.animal)}</p>
                  {card.points.type === 'self' ? (
                    <p>{card.points.value}</p>
                  ) : (
                    <p>
                      {convertTypeIntoEmoji(card.points[card.points.type])} ={' '}
                      {card.points.value}
                    </p>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          position: 'fixed',
          top: 10,
          left: 10,
          backgroundColor: 'white',
          border: '1px solid black',
          width: '200px',
          padding: '8px',
        }}
      >
        <h3>Scoreboard</h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '3px',
            marginTop: '5px',
          }}
        >
          {players.map((player) => (
            <p
              key={player.id}
              style={{
                width: '100%',
                borderRadius: '20px',
                padding: '5px 10px',
                backgroundColor: 'black',
                display: 'flex',
                columnGap: '2px',
                justifyContent: 'space-between',
                fontSize: 12,
                color: 'white',
              }}
            >
              <span>Player {player.id}</span>
              <span>{player.score}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;

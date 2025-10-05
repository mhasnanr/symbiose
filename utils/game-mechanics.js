export const pickFirstPlayer = () => {
  return Math.floor(Math.random() * 4) + 1;
};

export const randomizeRiver = (cards) => {
  return cards
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .slice(0, 4)
    .map(({ value }) => value);
};

export const convertTypeIntoEmoji = (type) => {
  switch (type) {
    case 'dragonfly':
      return '🦋';
    case 'frog':
      return '🐸';
    case 'snail':
      return '🐌';
    case 'fish':
      return '🐟';
    case 'green':
      return '🟩';
    case 'hotpink':
      return '🟥';
    case 'orange':
      return '🟧';
    case 'blue':
      return '🟦';
  }
};

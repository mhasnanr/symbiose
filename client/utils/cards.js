// 32 cards
// each card has animal, season, and points
// points can be self or symbiosis
// if symbiosis, points has type (animal or season) and value
// e.g. { type: 'animal', value: 5 } means 5 points for each same animal in pond
// e.g. { type: 'season', value: 3 } means 3 points for each same season in pond
// e.g. { type: 'self', value: 7 } means 7 points for this card only

// animal: frog, fish, dragonfly, snail
// season: green, blue, pink, orange
// points: 1-7
// self must have value 5-7 and symbiosis must have value 2-4

const cards = [
  {
    animal: 'snail',
    season: 'green',
    points: {
      type: 'self',
      value: 5,
    },
  },
  {
    animal: 'frog',
    season: 'hotpink',
    points: {
      type: 'self',
      value: 5,
    },
  },
  {
    animal: 'dragonfly',
    season: 'orange',
    points: {
      type: 'self',
      value: 6,
    },
  },
  {
    animal: 'fish',
    season: 'hotpink',
    points: {
      type: 'animal',
      animal: 'frog',
      value: 5,
    },
  },
  {
    animal: 'frog',
    season: 'hotpink',
    points: {
      type: 'season',
      season: 'orange',
      value: 4,
    },
  },
  {
    animal: 'dragonfly',
    season: 'hotpink',
    points: {
      type: 'animal',
      animal: 'fish',
      value: 3,
    },
  },
  {
    animal: 'fish',
    season: 'hotpink',
    points: {
      type: 'season',
      season: 'blue',
      value: 5,
    },
  },
  {
    animal: 'dragonfly',
    season: 'green',
    points: {
      type: 'season',
      season: 'blue',
      value: 5,
    },
  },
  {
    animal: 'snail',
    season: 'hotpink',
    points: {
      type: 'season',
      season: 'green',
      value: 3,
    },
  },
  {
    animal: 'fish',
    season: 'hotpink',
    points: {
      type: 'self',
      value: 8,
    },
  },
  {
    animal: 'fish',
    season: 'orange',
    points: {
      type: 'season',
      season: 'hotpink',
      value: 2,
    },
  },
  {
    animal: 'frog',
    season: 'orange',
    points: {
      type: 'season',
      season: 'hotpink',
      value: 2,
    },
  },
  {
    animal: 'dragonfly',
    season: 'green',
    points: {
      type: 'animal',
      animal: 'frog',
      value: 5,
    },
  },
  {
    animal: 'snail',
    season: 'hotpink',
    points: {
      type: 'animal',
      animal: 'fish',
      value: 3,
    },
  },
  {
    animal: 'dragonfly',
    season: 'blue',
    points: {
      type: 'self',
      value: 5,
    },
  },
  {
    animal: 'frog',
    season: 'hotpink',
    points: {
      type: 'animal',
      animal: 'snail',
      value: 4,
    },
  },
  {
    animal: 'frog',
    season: 'green',
    points: {
      type: 'animal',
      animal: 'fish',
      value: 3,
    },
  },
  {
    animal: 'fish',
    season: 'blue',
    points: {
      type: 'animal',
      animal: 'dragonfly',
      value: 2,
    },
  },
  {
    animal: 'fish',
    season: 'orange',
    points: {
      type: 'animal',
      animal: 'snail',
      value: 4,
    },
  },
  {
    animal: 'fish',
    season: 'blue',
    points: {
      type: 'season',
      season: 'green',
      value: 3,
    },
  },
  {
    animal: 'snail',
    season: 'blue',
    points: {
      type: 'season',
      season: 'hotpink',
      value: 2,
    },
  },
  {
    animal: 'dragonfly',
    season: 'blue',
    points: {
      type: 'animal',
      animal: 'snail',
      value: 4,
    },
  },
  {
    animal: 'snail',
    season: 'orange',
    points: {
      type: 'animal',
      animal: 'dragonfly',
      value: 2,
    },
  },
  {
    animal: 'dragonfly',
    season: 'green',
    points: {
      type: 'self',
      value: 8,
    },
  },
  {
    animal: 'fish',
    season: 'green',
    points: {
      type: 'season',
      season: 'hotpink',
      value: 2,
    },
  },
  {
    animal: 'snail',
    season: 'green',
    points: {
      type: 'animal',
      animal: 'dragonfly',
      value: 2,
    },
  },
  {
    animal: 'snail',
    season: 'hotpink',
    points: {
      type: 'self',
      value: 6,
    },
  },
  {
    animal: 'frog',
    season: 'green',
    points: {
      type: 'animal',
      animal: 'dragonfly',
      value: 2,
    },
  },
  {
    animal: 'dragonfly',
    season: 'hotpink',
    points: {
      type: 'season',
      season: 'green',
      value: 3,
    },
  },
  {
    animal: 'fish',
    season: 'orange',
    points: {
      type: 'self',
      value: 5,
    },
  },
  {
    animal: 'fish',
    season: 'green',
    points: {
      type: 'self',
      value: 6,
    },
  },
  {
    animal: 'snail',
    season: 'green',
    points: {
      type: 'season',
      season: 'orange',
      value: 4,
    },
  },
  {
    animal: 'dragonfly',
    season: 'orange',
    points: {
      type: 'season',
      season: 'green',
      value: 3,
    },
  },
  {
    animal: 'dragonfly',
    season: 'blue',
    points: {
      type: 'season',
      season: 'orange',
      value: 4,
    },
  },
  {
    animal: 'dragonfly',
    season: 'hotpink',
    points: {
      type: 'self',
      value: 8,
    },
  },
];

export default cards;

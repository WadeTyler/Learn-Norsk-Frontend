
export const affirmations: string[] = [
  "You’re one step closer to mastering Norwegian today!",
  "Small steps lead to big progress – keep going!",
  "Du er fantastisk! (You are amazing!)",
  "Every word you learn brings you closer to fluency.",
  "Language learning is a journey, and you’re on the right path.",
  "Practice makes progress – and you’re improving every day.",
  "You’ve got this! Norwegian is becoming easier for you.",
  "One day, you’ll speak Norwegian with confidence. Keep at it!",
  "You’re building a powerful skill – one word at a time.",
  "Learning Norwegian opens a world of new opportunities.",
  "Du gjør en fantastisk jobb! (You’re doing an amazing job!)",
  "Even 5 minutes a day brings you closer to your goal.",
  "You’re becoming more fluent each time you practice.",
  "Mistakes are proof that you’re trying – and learning!",
  "Your dedication to learning Norwegian is inspiring!",
  "Languages connect people – and you’re creating that bridge.",
  "Du kan gjøre det! (You can do it!)",
  "Your hard work is paying off – keep it up!",
  "Every effort you make today builds your future fluency.",
  "Keep showing up – consistency is your superpower.",
  "Learning a new language is a challenge, and you’re crushing it!",
  "You’re not just learning Norwegian – you’re building a new skill.",
  "Your progress may be slow, but it’s steady and real.",
  "Stay curious – Norwegian is a beautiful language to explore.",
  "Think of how far you’ve already come – keep moving forward.",
  "Du er sterk og i stand! (You are strong and capable!)",
  "Your brain is growing every time you practice Norwegian.",
  "Norwegian is becoming part of who you are – amazing!",
  "Learning a language is like climbing a mountain – you’re almost there!",
  "Takk for at du fortsetter! (Thank you for continuing!)"
];

export function getRandomAffirmation() {
  const affirmation = affirmations[Math.floor(Math.random() * (affirmations.length + 1))];
  return affirmation;
}

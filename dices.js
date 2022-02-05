const bonus = (bonus) => {
  return bonus.reduce((acc, curr, index) => {
    if (index >= 1) {
      return acc + Number(curr);
    } else {
      return 0;
    }
  }, 0)
};

const rollDice = (diceSides) => {
  return Math.floor(Math.random() * diceSides) + 1;
}

export const rollResult = (message) => {
  console.log(`${message.member.nickname} rolls`, message.content);

  const dice = message.content;
  const rolledDices = dice.split('$')[1].includes('+') ? dice.split('+')[0].replace('$', '') : dice.split('$')[1]

  const rollResult = rollDice(Number(rolledDices.replace(/D|d/g, '')));

  let sum = 0;
  if (dice.split('+').length >= 2) {
    sum = bonus(dice.split('+'))
  }

  const defaultMessage = `>>> **${message.member.nickname}** rolou um **${rolledDices.toUpperCase()}** e obteve:\n\`\`\`css\nR: { ${rollResult + sum} } \nD: [ ${rollResult} ]\n\`\`\``

  const negativeMessage = `>>> **${message.member.nickname}** rolou um **${rolledDices.toUpperCase()}** e obteve:\n\`\`\`css\nR: { ${rollResult + sum} } \nD: [ ${rollResult} ]\n\nSe fudeu, ${message.member.nickname}\n\`\`\``

  if (rollResult !== 1) {
    return defaultMessage
  } else {
    return negativeMessage
  }
}
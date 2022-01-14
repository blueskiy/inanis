require('dotenv').config();
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, "GUILD_MESSAGES"] });
const token = process.env.TOKEN;

//Put Inänis online
client.login(token);

//On ready action
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//Commands
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'doge') {
    await interaction.reply('https://dogecoin.com/');
  }

  return;
});

//Dice interations

//adds bonus points to a roll if have
const bonus = (bonus) => {
  return bonus.reduce((acc, curr, index) => {
    if (index >= 1) {
      return acc + Number(curr);
    } else {
      return 0;
    }
  }, 0)
};

//get a random number of rolled dice
const rollDice = (diceSides) => {
  return Math.floor(Math.random() * diceSides) + 1;
}

const rollResult = (message, dice) => {
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

//Message actions
client.on('messageCreate', message => {
  //Inänis' lore
  if (message.content === 'Inänis tell me a riddle') {
    const enigma = '>>> Dela tudo nasce\nMas sem um corpo que a abrace\nTodos a possuem\nMas nem todos usufruem\nDá à luz dois irmãos\nReal e Irreal\nSemelhança semi-igual';

    message.reply(enigma);

    return
  }

  if (message.content.includes('Inänis')) {
    message.reply(`You are not worthy to pronounce my name **${message.member.nickname}**.`);

    return
  }

  //Dices
  const rollCommand = message.content.match(/^\$\d?D|^\$\d?d\d/);
  if (rollCommand) {
    const dice = message.content;
    console.log(`${message.member.nickname} rolled a`, dice)
    message.reply(rollResult(message, dice))

    return
  }

  //Memes
  if (message.content === 'grande dia') {
    message.reply('https://c.tenor.com/X8S2wOTLQWsAAAAC/bolsonaroarminha-bolsonaro.gif')

    return
  }

  if (message.content === '$pewpewpew') {
    message.reply('https://c.tenor.com/BB9mtor1xbUAAAAd/botdojk.gif')

    return
  }
});

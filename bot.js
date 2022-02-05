import dotenv from 'dotenv';
import { Client } from 'discord.js';
import { rollResult } from './dices.js';

dotenv.config();

const token = process.env.TOKEN;
const client = new Client({
  partials: ['CHANNEL'],
  intents: ['GUILDS', 'DIRECT_MESSAGES', 'GUILD_MESSAGES', 'DIRECT_MESSAGE_TYPING'],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'doge') {
    await interaction.reply('https://dogecoin.com/');
  }

  return;
});

client.on('messageCreate', message => {
  const rollCommand = message.content.match(/^\$\d?D|^\$\d?d\d/);

  if (rollCommand) {
    message.reply(rollResult(message))
    return
  }

  if (message.content.includes('Heimiik')) {
    message.reply('de onde você conhece o <@!934804769044836362>?');
    return
  }

  if (message.content === 'Lënore tell me a riddle') {
    const enigma = '>>> Dela tudo nasce\nMas sem um corpo que a abrace\nTodos a possuem\nMas nem todos usufruem\nDá à luz dois irmãos\nReal e Irreal\nSemelhança semi-igual';

    message.reply(enigma);
    return
  }

  if (message.content.includes('Lënore')) {
    message.reply(`You are not worthy to pronounce my name **${message.member.nickname}**.`);
    return
  }

  if (message.content.includes('Lança') || message.content.includes('Lansa')  || message.content.includes('Lamsa')) {
    message.reply(`https://www.youtube.com/watch?v=KSc9ToQTWzc`);
    return
  }
});

client.login(token);

// const notAllowedWords = ['fuck', 'bitch', 'wore', 'dick', 'cock', 'pussy', 'asshole', 'fag', 'slut', 'bbc', 'BBC', 'fucked']

// const array = ['hello', 'world'];
// const substring = 'hell';

// const match = array.find(element => {
//   if (element.includes(substring)) {
//     return true;
//   }
// });

// console.log(match); // 👉️ hello

// if (match !== undefined) {
//   // array contains substring match
// }

// const notAllowBlockedUsers = (message) => {
//   if (message.author.id === '365490927915106305') {
//     message.reply('You are not allowed to interact with me. Cock sucker.');

//     return
//   }
// }
// 

const Discord = require('discord.js');
const client = new Discord.Client();


exports.run = (client, message) => {
  const arrow = client.emojis.get (`741028732784869406`) 
  if (message.channel.type !== 'dm') {
    const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(`**Iste Sunucu Tagımız** ${arrow}  \`✦\` `);
    message.channel.sendEmbed(ozelmesajkontrol) }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['tagg'],
  permLevel: 0
};

exports.help = {
  name: 'tag',
  description: 'Tagı Gosterir.',
  usage: '!tag'
};

const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
  if (message.channel.type !== 'dm') {
    const ates = client.emojis.get (`747858093462782074`)
    const ates1 = client.emojis.get (`747858109468508171`)
    const ates2 = client.emojis.get (`747858124035195010`); 
    const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(`**${ates} Genel Sorumlu 'Rєvєrs ✦ DramaramaG#7777 **

    **${ates1} Team Sorumlusu Rєvєrs ✦ 𝓡𝓾𝓱 𝓐𝓭𝓪𝓶

    ${ates2} Developer:Echoʳᵛˢ #0034**`);
    message.channel.sendEmbed(ozelmesajkontrol) }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yapımcım'],
  permLevel: 0
};

exports.help = {
  name: 'yapimcim',
  description: 'Yapimcimi Gosterir.',
  usage: 'yapimcim'
};

const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
  if (message.channel.type !== 'dm') {
    const emoji = client.emojis.get (`747858093462782074`)
    const emoji1 = client.emojis.get (`747858109468508171`)
    const emoji2 = client.emojis.get (`747858124035195010`)
    const emoji3 = client.emojis.get (`747858124035195010`)
    const emoji4 = client.emojis.get (`747858124035195010`)
    const emoji5 = client.emojis.get (`747858124035195010`)
    const emoji6 = client.emojis.get (`747858124035195010`)
    const emoji7 = client.emojis.get (`747858124035195010`); 
    const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(`**${ates} Discord Genel Sorumlusu 'Rєvєrs ✦ DramaramaG#7777 **

    **${ates1} Team Sorumlusu Rєvєrs ✦ 𝓡𝓾𝓱 𝓐𝓭𝓪𝓶

    Tag Alım Sorumlusu Rєvєrs ✦ 𝓡𝓾𝓱 𝓐𝓭𝓪𝓶

    ${ates2} Chat Sorumlusu ✦ 𝓛𝓪 𝓿𝓲𝓮 𝓮𝓷 𝒸𝒾𝒶#4317**

    Chat Sorumlusu Seneca [✦]#3333

    Chat Sorumlusu ✦ᴸᴼᴷᴬᴸANESTEZİ#7320

    Teyit Sorumlusu †  𝑭 𝑩 𝑰  ✦✦✦#4730

    Teyit Sorumlusu Whiskey ✦#2222

    Teyit Sorumlusu ✦Aeterna#0644`);
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

const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
  if (message.channel.type !== 'dm') {
    const emoji = client.emojis.get (`747535281305026781`)
    const emoji1 = client.emojis.get (`747536816516628601`)
    const emoji2 = client.emojis.get (`747858109468508171`)
    const emoji3 = client.emojis.get (`747857913174949999`)
    const emoji4 = client.emojis.get (`747858124035195010`); 
    const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(`**${emoji1} Dc Genel Sorumlusu 'Rєvєrs ✦ DramaramaG#7777 **

    **${emoji} Team Sorumlusu Rєvєrs ✦ 𝓡𝓾𝓱 𝓐𝓭𝓪𝓶

    ${emoji}Tag Alım Sorumlusu Rєvєrs ✦ 𝓡𝓾𝓱 𝓐𝓭𝓪𝓶

    ${emoji2}Chat Sorumlusu ✦ 𝓛𝓪 𝓿𝓲𝓮 𝓮𝓷 𝒸𝒾𝒶#4317

    ${emoji2}Chat Sorumlusu Seneca [✦]#3333

    ${emoji2}Chat Sorumlusu ✦ᴸᴼᴷᴬᴸANESTEZİ#7320

    ${emoji3}Teyit Sorumlusu †  𝑭 𝑩 𝑰  ✦✦✦#4730

    ${emoji3}Teyit Sorumlusu Whiskey ✦#2222

    ${emoji3}Teyit Sorumlusu ✦Aeterna#0644**

 
     ‍ ‍**Developed By Trigger.** `);
    message.channel.sendEmbed(ozelmesajkontrol) }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yetkililer'],
  permLevel: 0
};

exports.help = {
  name: 'yetkili',
  description: 'Yapimcimi Gosterir.',
  usage: 'yapimcim'
};

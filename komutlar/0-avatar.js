const Discord = require('discord.js');
exports.run = (client, message, args) => {
     
let mention = message.mentions.users.first();
let sender = "";

if (message.channel.guild.member(message.author).nickname == null) {
  sender = message.author.username;
} else {
  sender = message.channel.guild.member(message.author).nickname;
}
if (mention != null || mention != undefined) {
  var name = mention.username + "'s ";
  if (mention.username.endsWith("s")) {
    name = mention.username + "' ";
  }
  const avatarEmbedOther = new Discord.MessageEmbed()
  .setAuthor(mention.username, mention.avatarURLavatarURL)
  .setColor(0x3)
  .setImage(mention.avatarURL())
 .setFooter(`${message.author.tag} tarafından istendi.`, message.author.avatarURL())
  message.channel.send(avatarEmbedOther);
  return;
} else {
  const avatarEmbedYou = new Discord.MessageEmbed()
  .setAuthor(sender, message.author.avatarURL())
  .setColor(0x3)
  .setImage(message.author.avatarURL())
  .setFooter(`🕊 Developed by Josef`, message.author.avatarURL())
  message.channel.send(avatarEmbedYou);
  return;
}
message.channel.sendMessage("Bi hata oldu galiba?");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['avatar', 'pp'],
  kategori: "AVATAR KOMUTLARI",
  permLevel: 0
};

exports.help = {
  name : 'avatar' ,
};
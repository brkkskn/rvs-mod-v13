const Discord = require("discord.js");
//Dcs Ekibi
module.exports.run = async (client, message, args) => {
  const voiceChannels = message.guild.channels.filter(c => c.type === "voice");
  let count = 0;

  for (const [id, voiceChannel] of voiceChannels)
    count += voiceChannel.members.size;
  const emoji = client.emojis.find(emoji => emoji.name === "tik");
  const embed = new Discord.RichEmbed()
    .setColor("0x3") //Dcs Ekibi
    .setAuthor("Toplam Üye", `${message.author.displayAvatarURL}`)
    .addField(
      `**Ses Kanallarında ${count} Kişi Bulunmaktadır!**`,
      `**Sunucuda ${message.guild.memberCount} Kişi Bulunmaktadır!**`
    )
    .setThumbnail(message.guild.iconURL)
    .setTimestamp();

  message.channel.sendEmbed(embed);
  message.react(emoji);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["total", "toplamüye", "toplamkişi", "totalmember"],
  permLevel: 0
};
//Dcs Ekibi
exports.help = {
  name: "say",
  description: "Sunucudaki ve Ses Kanallarındaki Kişi Sayısını Gösterir! ",
  usage: "say"
};

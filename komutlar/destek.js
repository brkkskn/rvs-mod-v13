const Discord = require('discord.js');


exports.run = function(client, message, args) {
    let type = args.slice(0).join(' ');
    if (type.length < 1) return message.channel.send(
new Discord.RichEmbed()
.setDescription('Kullanım: !destek <Sorun>'));
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setDescription('Destek Bildirildi!')
message.channel.send(embed)
const embed2 = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription(`**${message.author.tag}** adlı kullanıcının Şikayeti:`)
.addField(`Kulanıcı Bilgileri`, `Kullanıcı ID: ${message.author.id}\nKullanıcı Adı: ${message.author.username}\nKullanıcı Tagı: ${message.author.discriminator}`)
.addField("Destek!", type)
.setThumbnail(message.author.avatarURL)
client.channels.get('734138748077473873').send(embed2); // Kanal ID  BURAYI KESİNLİKLE DÜZENLEYİNİZ!

};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'destek',
  description: 'Şikayet de bulunursunuz..',
  usage: 'destek <Sorun>'
};
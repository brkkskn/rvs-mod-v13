const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (bot, message) => {
   let c = message.mentions.channels.first()
   if (!c) return message.channel.send('Lütfen bir kanal etiketleyiniz.')
   db.set(`guvenlik${message.guild.id}`, c.id)
   message.channel.send(':inbox_tray: | Güvenlik kanalı başarıyla ayarlandı.')
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['gks','güvenlik'],
  permLevel: 3
};

module.exports.help = {
  name: 'güvenlik',
  description: 'guvenlik',
  usage: 'güvenlik-ayarla'
};
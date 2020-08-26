  const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let guild = message.guild;
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`<a:hata:527103359837011978> Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
  guild.createChannel(`Toplam Kullanıcı Sayısı : ${guild.memberCount}`, 'voice');
  guild.createChannel(`Üye Sayısı : ${guild.members.filter(m => !m.user.bot).size}`, 'voice');
  guild.createChannel(`Bot Sayısı : ${guild.members.filter(m => m.user.bot).size}`, 'voice');

  message.channel.send(`:white_check_mark:  Sunucudaki üye sayısını kanallarda gösterecek bir sistem kuruldu.`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['panelkur'],
  permLevel: 3
};

exports.help = {
  name: 'panelkur',
  description: 'Sunucudaki üye sayısını kanallarda gösterecek bir sistem kurar.',
  usage: 'panelkur'
}; 
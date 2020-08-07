const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
  let tag = args[0];
  let tagg = db.fetch(`tag_${message.guild.id}`)
  
  if (!tag) return message.channel.send('Bir tag girmelisin.')
  
    if(args[0] === "sıfırla") {
    if(!tagg) {
      message.channel.send(`Ayarlanmayan şeyi sıfırlayamazsın.`)
      return
    }
    
    db.delete(`tag_${message.guild.id}`)
    message.channel.send(`Tag başarıyla sıfırlandı.`)
    return
  }
  
  db.set(`tag_${message.guild.id}`, tag)
  message.channel.send(`Tag başarıyla \`${tag}\` olarak ayarlandı.`)
   
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'tag',
  description: 'Tagı ayarlar.',
  usage: '!tag <yazı>'
};
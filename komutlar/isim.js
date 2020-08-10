const Discord = require('discord.js');

exports.run = async(client, message, args) => {
  
    message.delete()
    if (!message.member.roles.find("name", "TEYITCI")) {
        return message.channel.send(' **Bu Komutu Kullanmak için** \*`TEYITCI*\` **Rolüne Sahip Olman Lazım** ')
            .then(m => m.delete(5000));
    }  
  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!member) return message.channel.send(`**${message.author.username}, Üzgünüz, demek istediğiniz kullanıcıyı bulamıyorum**!`);
  const isim = args[1]
  const yas = args.slice(2).join('')
  
  if(!isim) return message.reply("Bir İsim Yazmalısın.")
  if(!yas) return message.reply("Bir Yaş Yazmalısın.")
  
  if(yas<9) return message.reply("En az 9 yaşını doldurmuş olması gerekli.")
  if(yas>50) return message.reply("En Fazla 50 Yaşında Olmalı. Emekli Olmuş Dayı Galiba xD")
  return member.guild.member(member).setNickname(""+isim+" | "+yas+"").catch(err => ("İsmin ayarlanırken bir hata oluştu.!"))
  message.reply("Başarıyla Teyit Edildi.")
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'isim',
  description: '!!isim @etiket [ISIM] [YAŞ].',
  usage: 'isim'
};
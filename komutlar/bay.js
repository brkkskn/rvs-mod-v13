const Discord = require('discord.js');

exports.run = async (client, message, args) => {

let kayityetkili = '740959861520597073' //KAYIT YETKİLİSİ ID
let verbuse = '740959863311564892' //VERİLECEK ROL ID
let verbusem = '740959864401952861' //VERİLECEK ROL ID
let albuse = '703451025939497030' //ALINACAK ROL ID
//let albusem = '703451025939497030' //ALINACAK ROL ID l Kullanmicaksanız silin
let isimön = 'そ ' //DEĞİŞTİRİLECEK İSMİN ÖNÜNE GELEN
//let yas = args[1] 

//TİK İSMİNDE BİR EMOJİNİZ OLMASI LAZIM (Hareketli Olsa Daha Güzel Gözükür)

  if(!message.member.roles.has(kayityetkili)) 
  if(!message.member.hasPermission("ADMINISTRATOR"))
  return message.channel.send(`Bu komutu kullanabilmek için \`Kayıt\` yetkisine sahip olmasınız.`);
  let member = message.mentions.members.first()
  let isim = args.slice(1).join(" ")
  if (!member) return message.channel.send('**!erkek @kullanıcıadı <isim> şeklinde olmalı!**')
  if (!isim) return message.channel.send('**Bir isim yazmalısın.')

  setTimeout(function(){
  member.setNickname(`${isimön}${isim}`)
  },2000)
  setTimeout(function(){
  member.addRole(verbuse)
  member.addRole(verbusem)
  },3000)
  setTimeout(function(){
  member.removeRole(albuse)
  member.addRole(albusem)
  },4000)
  
 const emoji = client.emojis.find(emoji => emoji.name === "tik");
 let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription(`✅ Kayıt işlemi Başarılı ✅

**Kayıt edilen kullanıcı :** ${isimön}${isim}

**Kayıt işleminde verilen rol :** <@&${verbuse}>, <@&${verbusem}>

**Kayıt işleminde alınan rol :** <@&${albuse}>, <@&${albusem}>
`)
  .setFooter(`Komutu kullanan yetkili : ${message.author.username}`) 
  .setImage("https://37.media.tumblr.com/f1d867e7b7771f57ccf325a13630ce29/tumblr_n3zeepZMFm1ttv14wo1_r1_250.gif")
message.channel.send(embed)
message.react(emoji)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['oyuncu','o'],
  permLevel: 0
}
exports.help = {
  name: 'erkek',
  description: "Erkek kullanıcıları kayıt etme komutu.",
  usage: '!erkek <yeni nick>'
}
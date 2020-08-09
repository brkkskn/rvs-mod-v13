const Discord = require('discord.js');

exports.run = async (client, message, args) => {

let kayityetkili = '740959845448155147' //KAYIT YETKİLİSİ ID
let verbuse = '740959862300737556' //VERİLECEK ROL ID
let verbusem = '740959862741270647' //VERİLECEK ROL ID
let albuse = '740959861520597073' //ALINACAK ROL ID
//let albusem = '703451025939497030' //ALINACAK ROL ID l Kullanmicaksanız silin kötü gözükür .
let isimön = '• ' //DEĞİŞTİRİLECEK İSMİN ÖNÜNE GELEN
//let isimson = '✝' //DEĞİŞTİRİLECEK İSMİN SONUNA GELEN

//TİK İSMİNDE BİR EMOJİNİZ OLMASI LAZIM (Hareketli Olsa Daha Güzel Gözükür)

  if(!message.member.roles.has(kayityetkili)) 
  if(!message.member.hasPermission("ADMINISTRATOR"))
  return message.channel.send(`Bu komutu kullanabilmek için \`Kayıt\` yetkisine sahip olmasınız.`);
  let member = message.mentions.members.first()
  let isim = args.slice(1).join(" ")
  if (!member) return message.channel.send('**!kız @kullanıcıadı <isim> şeklinde olmalı!**')
  if (!isim) return message.channel.send('**Bir isim yazmalısın.**')

  setTimeout(function(){
  member.setNickname(`${isimön}${isim}`)
  },2000)
  setTimeout(function(){
  member.addRole(verbuse)
  member.addRole(verbusem)
  },3000)
  setTimeout(function(){
  member.removeRole(albuse)

  },4000)

 const sonsuz = client.emojis.get (`741028297743401091`)   
 const emoji = client.emojis.find(emoji => emoji.name === "tik");
 let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription(`${sonsuz} ‍  ‍  ‍ **Revers Kayıt Sistemi** ‍  ‍  ‍ ${sonsuz}

**Kayıt edilen kullanıcı :** ${isimön}${isim}

**Kayıt işleminde verilen rol :** <@&${verbuse}> **-** <@&${verbusem}>

**Kayıt işleminde alınan rol :** <@&${albuse}>
`)
  .setFooter(`Komutu kullanan yetkili : ${message.author.username}`) 
  .setImage("https://cdn.discordapp.com/attachments/589366950015139844/741357730836512788/20200807_142346.gif")
message.channel.send(embed)
message.react(emoji)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['kiz','Kız'],
  permLevel: 0
}
exports.help = {
  name: 'kız',
  description: "Erkek kullanıcıları kayıt etme komutu.",
  usage: '!kız <yeni nick>'
}
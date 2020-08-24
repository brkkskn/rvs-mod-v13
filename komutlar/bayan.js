const Discord = require('discord.js');

exports.run = async (client, message, args) => {

let kayityetkili = '740959845448155147' //KAYIT YETKİLİSİ ID
let verbuse = '740959862300737556' //VERİLECEK ROL ID
let verbusem = '740959862741270647' //VERİLECEK ROL ID
let albuse = '740959861520597073' //ALINACAK ROL ID
//let albusem = '703451025939497030' //ALINACAK ROL ID l Kullanmicaksanız silin kötü gözükür .
let isimön = args [1] //DEĞİŞTİRİLECEK İSMİN ÖNÜNE GELEN
let yas = args [2]
//let isimson = '✝' //DEĞİŞTİRİLECEK İSMİN SONUNA GELEN

//TİK İSMİNDE BİR EMOJİNİZ OLMASI LAZIM (Hareketli Olsa Daha Güzel Gözükür)

  if(!message.member.roles.has(kayityetkili)) 
  if(!message.member.hasPermission("ADMINISTRATOR"))
  return message.channel.send(`Bu komutu kullanabilmek için \`Kayıt\` yetkisine sahip olmasınız.`);
  let member = message.mentions.members.first()
  let isim = args.slice(1).join(" ")
  if (!member) return message.channel.send('**!kız @kullanıcıadı <isim> şeklinde olmalı!**')
  if (!isim) return message.channel.send('**Bir isim yazmalısın.**')
  if (!yas) return message.channel.send('**Yaşını Girmelisin**')
  if(yas<15) return message.reply("**En az 15 yaşını doldurmuş olması gerekli.**")
  if(yas>50) return message.reply("**Emekli olcak yaştasın ne işin var burda orospu evladı.**")
  setTimeout(function(){
  member.setNickname(`✧ ${isimön} | ${yas}`)
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

**Kayıt edilen kullanıcı :** ${isimön} ${yas}

**Kayıt işleminde verilen rol :** <@&${verbuse}> **-** <@&${verbusem}>

**Kayıt işleminde alınan rol :** <@&${albuse}>
`)
  .setFooter(`Komutu kullanan yetkili : ${message.author.username}`) 
  .setImage("https://37.media.tumblr.com/f1d867e7b7771f57ccf325a13630ce29/tumblr_n3zeepZMFm1ttv14wo1_r1_250.gif")
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
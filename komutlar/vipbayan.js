const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
const emoji1 = client.emojis.cache.get("722641897419571260");
const kayityetkili = message.guild.roles.cache.find(r => r.id === "818149322700750879") // Kayıt Yetkili
const verbuse = message.guild.roles.cache.find(r => r.id === "818149328270524426") //VERİLECEK ROL ID
const verbusem = message.guild.roles.cache.find(r => r.id === "825176337408065536") //VERİLECEK ROL ID
const vip = message.guild.roles.cache.find(r => r.id === "818149326768570398") //VERİLECEK ROL ID
const albuse = message.guild.roles.cache.find(r => r.id === "818149352001896491") //ALINACAK ROL ID
//let albusem = '740959861520597073' //ALINACAK ROL ID l Kullanmicaksanız silin
let isimön = args[1] //DEĞİŞTİRİLECEK İSMİN ÖNÜNE GELEN
let yas = args[2] 
//if (!isim) return message.channel.send(`*İsmini girmelisin!**`)
//TİK İSMİNDE BİR EMOJİNİZ OLMASI LAZIM (Hareketli Olsa Daha Güzel Gözükür)

 // if(!message.member.roles.has(kayityetkili)) 
  if(!message.member.hasPermission("ADMINISTRATOR"))
  return message.channel.send(`Bu komutu kullanabilmek için \`Kayıt\` yetkisine sahip olmasınız.`);
  let member = message.mentions.members.first()
  let isim = args.slice(1).join(" ")
   if (!member) return message.channel.send(new Discord.MessageEmbed()    
  .addField("Hata",`${prefix}bayan <Kullanıcı-Adı> <Isim> <Yaş> Şeklinde Olmalıdır.`)
  .setColor("RANDOM"));
  if (!isim) return message.channel.send(new Discord.MessageEmbed()                                          
  .addField("Hata",`${prefix}bayan <Kullanıcı-Adı> <Isim> <Yaş> Şeklinde Olmalıdır.`)
  .setColor("RANDOM"));
  if (!yas) return message.channel.send(new Discord.MessageEmbed()                                          
  .addField("Hata",`${prefix}bayan <Kullanıcı-Adı> <Isim> <Yaş> Şeklinde Olmalıdır.`)
  .setColor("RANDOM"));
  if(isNaN(args[2])) return message.reply("**Lütfen geçerli bir sayı giriniz.**")
  if(yas<15) return message.channel.send("**En az 15 yaşını doldurmuş olması gerekli.**")
  if(yas>50) return message.channel.send("**Emekli olcak yaştasın ne işin var burda orospu evladı.**")

  setTimeout(function(){
  member.setNickname(`⊀ ${isimön} | ${yas} `)
  },2000)
  setTimeout(function(){
  member.roles.add(verbuse)
  member.roles.add(verbusem)
  member.roles.add(vip)
  },3000)
  setTimeout(function(){
  member.roles.remove(albuse)
  //member.addRole(albusem)
  },4000)
 //const sonsuz = client.emojis.get (`741987392856260678`) 
// const emoji = client.emojis.find(emoji => emoji.name === "eyes");
 let embed = new Discord.MessageEmbed()  
 
  .setColor('RANDOM')
  .setThumbnail(member.user.avatarURL())
  .setDescription(`${emoji1} ‍  ‍  ‍ **Revers Vip Kayıt Sistemi** ‍  ‍  ‍ ${emoji1} ‍ 

**Kayıt edilen vip üye :** ${isimön} ${yas}      

**Verilen rol :** ${verbuse} **-** ${verbusem} **-** ${vip}

**Alınan rol :** ${albuse}
`)
  .setFooter(`Komutu kullanan yetkili : ${message.author.username}`)
  .setImage("https://cdn.discordapp.com/attachments/522576410083328010/838842688098926602/scsd.gif")
message.channel.send(embed)
//message.react(emoji)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['vipkız','vipkiz', 'vipbayan', 'vipk'],
  permLevel: 0
}
exports.help = {
  name: 'vipb',
  description: "Erkek kullanıcıları kayıt etme komutu.",
  usage: '!kız <yeni nick>'
}
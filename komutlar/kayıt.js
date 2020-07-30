const Discord = require('discord.js');
const db = require('quick.db');


exports.run = async (client, message, args) => {
  const verify = client.emojis.get (`735122426878230539`)
  const burak = await db.fetch(`kayıtk_${message.guild.id}`)
  if(burak == null) return message.channel.send('Kayıt Sistemi eklemek için <`!kayıt-rol @rol`/`!kayıt-kanal #kanal`/`!kayıt-log #kanal`> şeklinde Ayarlıya bilirsiniz. ');
  if (message.channel.id !== burak) return message.channel.send(`Kayıt Kanalı <#${burak}> Suan Burda`);
  if (burak == true) return; 
  if (burak == false) return message.channel.send(`Kayıt Sistemi Aktif değil`);
 /* client.on('',{
            
    message.send()
            }*/
  let user = message.member
  let guild = message.guild
  
 
  let isim = args[0]
  let yas = args[1]
  
  if (!isim) return message.channel.send(`*İsmini girmelisin!**`)
  if (!yas) return message.channel.send(`**Yaşını girmelisin!**`)
  
  user.setNickname(`${isim} | ${yas}`)
  user.addRole(db.fetch(`kayıt_${message.guild.id}`))
  message.channel.send(`${message.author}  **Sunucuya Başarıyla Kayıt oldun.**  ${verify}`)
 /* message.guild.channels.get(db.fetch(`kayıtlog_${message.guild.id}`)).send(`🗒 ${message.author} Adlı kullanıcı Başarılı Şekilde Kayıt Oldu `)*/;

  /*client.on("guildMemberAdd",async message => {
message.guild.channel.get(db.fetch(`kayıtk_${message.guild.id}`)).send("Bil olum");
  
});*/
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kayit"],
  permLevel: 0,
  kategori: "yetkili"
}

exports.help = {
  name: 'kayıt',
  description: "Sunucuya kayıtolmaya yarar",
  usage: 'kayıt <isim> <yaş>'
}
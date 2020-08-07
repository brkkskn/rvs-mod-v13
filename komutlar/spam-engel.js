const Discord = require ('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
const tik = client.emojis.get('548865650454560769');
const çarpı = client.emojis.get('548865604652892160');
let sistem = 'spam-engel'
let p = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
let arg = args.slice(0).join(' ');
if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`\`SUNUCUYU_YÖNET\` yetkisine sahip olmalısın!`)
if (!arg) return message.channel.send(`Lütfen **aç** veya **kapat** yazınız. \`${p}${sistem} aç\``) 
if (arg === 'aç') {
if (db.has(`spen_${message.guild.id}`) === true) {
message.channel.send(`${tik} \`${sistem}\` sistemi zaten açık, kapatmak için \`${p}${sistem} kapat\``)
};
if (db.has(`spen_${message.guild.id}`) == false) {
db.set(`spen_${message.guild.id}`, 'acik')
message.channel.send(`${tik} \`${sistem}\` başarıyla açıldı, \`SUNUCUDAN_YASAKLA\` Yetkisine sahip olanların yaptığı spam __engellenmeyecektir__. Spam engeli kapatmak için \`${p}${sistem} kapat\``)
}};
if (arg === 'kapat') {
if (db.has(`spen_${message.guild.id}`) === false) {
message.channel.send(`${çarpı} \`${sistem}\` sistemi zaten __kapalı__, açmak için \`${p}${sistem} aç\``)
}
if (db.has(`spen_${message.guild.id}`) === true) {
db.delete(`spen_${message.guild.id}`)
message.channel.send(`${çarpı} \`${sistem}\` başarıyla kapatıldı, artık herkes spam __atabilir__. Spam engeli açmak için \`${p}${sistem} aç\``)
};
}};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['spam'],
  permLevel: 2
};

exports.help = {
  name: 'spam-engel',
  description: 'Spam engel ayarını aktifleştirir.(Kullanmanızı Öneririz)',
  usage: 'spam-engel aç/kapat'
};
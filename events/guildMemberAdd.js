const fs = require('fs');
const Discord = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk')

module.exports = async member => {
  
  
   let client = member.client;
  const ayarlar = client.ayarlar
  
  //if (!client.users.get(client.user.id).hasPermission("SEND_MESSAGES")) return message.reply(`Yeterli izinlere sahip değilim! \n**İhtiyacım Olan Yetki:** \n\`Mesaj Gönder\``)
  
  
  
let prefix;
  
if (db.has(`prefix_${member.guild.id}`) === true) {
  prefix = db.fetch(`prefix_${member.guild.id}`)
}
  
if (db.has(`prefix_${member.guild.id}`) === false) {
  prefix = client.ayarlar.prefix
}
  
  
  
  
  if (member.bot) return;
  
  //Tag Sistemi
    let tag = await db.fetch(`tagB_${member.guild.id}`);
    var tagK = await db.fetch(`tagKanal_${member.guild.id}`);
    var tagKD = await `${member.guild.channels.get(db.fetch(`tagKanal_${member.guild.id}`)) ? "var" : "yok"}`;
  if (db.has(`tagB_${member.guild.id}`) === true) {
member.setNickname(`${tag} ${member.user.username}`)
  

  if(db.has(`tagKanal_${member.guild.id}`) === true) {
    if(tagKD === "var") {
      member.guild.channels.get(tagK).send(`**${member.user.tag}** adlı kullanıcıya \`${db.fetch(`tagB_${member.guild.id}`)}\` olarak ayarlanmış olan tag verilerek kullanıcının ismi sunucu için \`${member.nickname || `${db.fetch(`tagB_${member.guild.id}`)} ${member.user.username}`}\` olarak ayarlanmıştır!`)
  }}};
//Sayaç
  if (db.has(`sayac_${member.guild.id}`) === true) {
    if (db.has(`sKanal_${member.guild.id}`) === true) {
    const channel = db.fetch(`sKanal_${member.guild.id}`)
    member.guild.channels.get(channel).send(`**${member.user.tag}** Sunucuya katıldı! \`${db.fetch(`sayac_${member.guild.id}`)}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) - member.guild.members.size}\` üye kaldı!`)
    }};
  
  //Otorol
  if (db.has(`otoR_${member.guild.id}`) === true) {
  var rol = member.guild.roles.get(db.fetch(`otoR_${member.guild.id}`));
  var rolD = `${member.guild.roles.get(db.fetch(`otoR_${member.guild.id}`)) ? "var" : "yok"}`;
  
  var kanalD = `${member.guild.channels.get(db.fetch(`otoRK_${member.guild.id}`)) ? "var" : "yok"}`;
    
    
  if(rolD === "var") {
  member.addRole(rol)
  
  
    if (db.has(`otoRK_${member.guild.id}`) === true) {
      if(kanalD === "var"){
    member.guild.channels.get(db.fetch(`otoRK_${member.guild.id}`)).send(`**${member.user.tag}** adlı kullanıcıya başarıyla otomatik rol olarak ayarlanmış olan **${rol.name}** adlı rol verildi!`)
  }}}};
  
};
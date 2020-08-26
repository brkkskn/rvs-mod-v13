const Discord = require('discord.js')
exports.run = (client, msg, args) => {
 if(msg.channel.nsfw || msg.channel.type === 'dm'){
   let embed = new Discord.RichEmbed()
   .setTitle(':underage: +18')
   .setColor("#36393F")
   .setImage(("https://cdn.boobbot.us/4k/4k"+ Math.floor(Math.random() * 1460)+".jpg"))
   msg.channel.send(embed)
}
 else{
       msg.channel.send({embed: {
color: Math.floor(Math.random() * (0xFFFFFF + 1)),
description: ('Bu kanal NSFW kanalı değil!')
 }})
 }
};
 exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ['4k'],
   permLevel: 0
 };

 exports.help = {
   name: 'hd',
   description: 'NSFW bir resim g�sterir.',
   usage: 'hd'
 };
const Discord = require('discord.js');
const request = require('node-superfetch');
const db = require('quick.db');
const { stripIndents } = require('common-tags');
const snekfetch = require("snekfetch");

exports.run = async (client, message, args) => {
      message.delete()
    if (!message.member.roles.find("name", "ᕒ ᴛᴇʏɪᴛ ᓬ")) {
        return message.channel.send(' **Bu Komutu Kullanmak için** \*`ᕒ ᴛᴇʏɪᴛ ᓬ*\` **Rolüne Sahip Olman Lazım** ')
            .then(m => m.delete(5000));
    }
  
  
    let member = message.mentions.users.first() || message.author;
    if (!member) return message.channel.send(`**${message.author.username}, Üzgünüz, demek istediğiniz kullanıcıyı bulamıyorum**!`);

  
          if(member.bot === true) {
                const embed = new Discord.RichEmbed()
                        .setDescription("Botların Teyiti bulunmamaktadır!")
                        .setColor("RANDOM")
                message.channel.send(embed)
                return
        }
  
  let teyit = await db.fetch(`teyit.${message.guild.id}.${message.author.id}`);  
  let teyiterkek = await db.fetch(`teyite.${message.guild.id}.${message.author.id}`);  
  let teyitkiz = await db.fetch(`teyitk.${message.guild.id}.${message.author.id}`);  

  
  

const newembed = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)
.setTitle('Teyit Sayınız')
.addField("Toplam Teyit Sayısı:", `${teyit ? teyit : 'Hiç Teyit Etmemiş.'}`, true)
.addField("Erkek Teyit Sayısı:", `${teyiterkek ? teyiterkek : 'Hiç Erkek Teyit Etmemiş.'}`, true)
.addField("Kız Teyit Sayısı:", `${teyitkiz ? teyitkiz : 'Hiç Kız Teyit Etmemiş.'}`, true)
.setColor('GREY')
.setFooter(message.author.username + ` Tarafından İstendi`)
message.channel.send(newembed)

  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["teyit"],
  permLevel: 0,
};

exports.help = {
  name: 'teyit',
  description: 'Seviyenizi ve XP\'nizi gösterir.',
  usage: 'teyit'
};
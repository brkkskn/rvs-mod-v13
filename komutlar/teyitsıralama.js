const Discord = require('discord.js');
const request = require('node-superfetch');
const db = require('quick.db');

exports.run = async (client, msg, args) => {
    msg.delete();
  const yasak = client.emojis.get('693976996321165385');
  if (msg.channel.id !== '693286888341110885') return msg.channel.send(`${yasak} **Bu komutun kullanımı, bu kanalda engellenmiştir.**`).then(m => m.delete(5000));
      let u = msg.mentions.users.first() || msg.author;

        if(u.bot === true) {
                const embed = new Discord.RichEmbed()
                        .setDescription("Botların seviyesi bulunmamaktadır!")
                        .setColor("RANDOM")
                msg.channel.send(embed)
                return
        }
        let sira = '';
        var str = ''
        const sorted = msg.guild.members.filter(u => !u.user.bot).array().sort((a, b) => { return db.fetch(`teyit_${b.user.id + msg.guild.id}`) - db.fetch(`teyit_${a.user.id + msg.guild.id}`) });
        const top10 = sorted.splice(0, msg.guild.members.size)
        const mappedName = top10.filter(o => !o.bot).map(t => t.user.id);
        const mappedLevel = top10.filter(o => !o.bot).map(t => db.fetch(`teyit_${t.user.id + msg.guild.id}`) || 0)
        const emoji = client.emojis.get('694036610093940738');

        const mappedID = top10.map(s => s.user.id);
        for(var i = 0; i < 10; i++) {
            var teyit = mappedLevel[i]
      
            if(msg.author.id === mappedID[i]) {
                str += `**[${i + 1}]** ${emoji} <@${mappedName[i]}>\n  **Teyit:** ${teyit} \n\n`
            }

            if(msg.author.id !== mappedID[i]) {
                str += `**[${i + 1}]** ${emoji} <@${mappedName[i]}>\n  **Teyit:** ${teyit} \n\n`
            }
        }

        if(u.bot === true) {
                const embed = new Discord.RichEmbed()
                        .setDescription("Botların seviyesi bulunmamaktadır!")
                        .setColor("RANDOM")
                msg.channel.send(embed)
                return
        }
  
        let wEmbed = new Discord.RichEmbed()
        .setTitle(`⌘ | Teyit Sistemi`)
        .setColor('RANDOM')
        .setDescription(`${str}`)
        msg.channel.send(wEmbed)
  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["teyitsıralama"],
  permLevel: 0,
    kategori: "teyit"
};

exports.help = {
  name: 'teyitsıralama',
  description: 'Teyit sisteminin sunucudaki liderlik tablosunu gĂ¶sterir.',
  usage: 'teyitsıralama'
};
const Discord = require('discord.js');
const talkedRecently = new Set();

exports.run = async(client, message, args) => {
    message.delete()
  
    const yasak = client.emojis.get('693976996321165385');
    if (message.channel.id !== '693286104668962886') return message.channel.send(`${yasak} **Bu komutun kullanımı, bu kanalda engellenmiştir.**`).then(m => m.delete(5000));
    if (!message.member.roles.find("name", "ᴍɪsᴀғɪʀ")) {
        return message.channel.send(' **Bu Komutu Kullanmak için** \*`ᴍɪsᴀғɪʀ*\` **Rolüne Sahip Olman Lazım** ')
            .then(m => m.delete(5000));
    }    
    if (talkedRecently.has(message.author.id)) {
           return message.channel.send("`10` Dakikada de Bir Oynayabilirsiniz - " + message.author);
    } else {

           // the user can type the command ... your command code goes here :)

        // Adds the user to the set so that they can't talk for a minute
        talkedRecently.add(message.author.id);
        setTimeout(() => {
        message.delete();
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 600000);// Şuan 5 Saniyedir Değiştirebilirsiniz.
    }  
  let guild = message.guild;
  let samet = message.guild.members.get('564890436053762059')
  let yunus = message.guild.members.get('420691365777899530')  
  let suleyman = message.guild.members.get('547824120113659926')
  let yagmur = message.guild.members.get('545493695684935682')
 const kullanıcı = message.author.id;
  
  message.delete();
  message.reply('Mesajını Gönderdim.')
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle(`**Bir Kişi Gelmiş**`)
  .setTimestamp()
  .setDescription(`
<@${kullanıcı}> Adlı Kullanıcı Ben Geldim Çağrısı Yaptı.

`);
  yunus.send(embed);
  samet.send(embed);
  suleyman.send(embed);
  yagmur.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'bengeldim',
  description: 'Geldiğini Bildirme Komutudur.',
  usage: 'bengeldim'
};
const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args, ops) => {
    message.delete()
    if (!message.member.roles.find("name", "ᕒ ᴛᴇʏɪᴛ ᓬ")) {
        return message.channel.send(' **Bu Komutu Kullanmak için** \*`ᕒ ᴛᴇʏɪᴛ ᓬ*\` **Rolüne Sahip Olman Lazım** ')
            .then(m => m.delete(5000));
    }  
    let toverify = message.guild.member(message.mentions.users.first());
    let verifyrole = message.guild.roles.find(`name`, "ʙᴀʏᴀɴ ᴍᴜᴅɪᴛᴀ");
    let verifyrolee = message.guild.roles.find(`name`, "ᴍɪsᴀғɪʀ");
    if(toverify.roles.find(`name`, "ʙᴀʏ ᴍᴜᴅɪᴛᴀ")) return message.channel.send('Teyit Başarısız, Kullanıcı Zaten Kayıtlı.')
    if(toverify.roles.find(`name`, "ʙᴀʏᴀɴ ᴍᴜᴅɪᴛᴀ")) return message.channel.send('Teyit Başarısız, Kullanıcı Zaten Kayıtlı.')
    if (!verifyrole) return message.reply("Rol Bulunamadı Lütfen 'Lianslı' Adıyla Rol Oluşturunuz.");
    if (!verifyrolee) return message.reply("Rol Bulunamadı Lütfen 'Lianslı' Adıyla Rol Oluşturunuz.");
    if (!toverify) return message.reply("Bir kullanıcıdan bahsetmelisin.");
    await (toverify.addRole(verifyrole.id),toverify.removeRole(verifyrolee.id));
    let vUser = message.guild.member(message.mentions.users.first());
    let teyitsayisi = await db.fetch(`teyit.${message.guild.id}.${message.author.id}`);
    let verifembed = new Discord.RichEmbed()
        .setTitle("Teyit Çıktısı")
        .setColor('#a5f23a')
        .addField("Teyit Eden Kişi", `${message.author.tag}`, true)
        .addField("Kanal", message.channel, true)
        .addField("Teyit Olan Kişi", `${vUser}`, true)
        .addField("Teyit Cinsiyeti", "Kız", true)
        .addField("Teyit Sayısı", `${teyitsayisi}`, true)
        .addField("Saudade Mudita", "Gururla Sunar...!", true)
        .setTimestamp();
    let veriflog = message.guild.channels.find(`name`, "🔺ᴋᴀʏıᴛʟᴀʀ");
    if (!veriflog) return message.channel.send("Doğrulama Kullanıcı Log Kanalı bulunamadı. Lütfen '🔺ᴋᴀʏıᴛʟᴀʀ' Adlı Kanal Oluşturunuz.`");
    veriflog.send(verifembed);
    
    let teyit = await db.add(`teyit.${message.guild.id}.${message.author.id}`, 1);
    let teyitkiz = await db.add(`teyitk.${message.guild.id}.${message.author.id}`, 1);

    const emoji1 = client.emojis.get('693976996321165385');
    const emoji2 = client.emojis.get('693987889549410396');
    const emoji3 = client.emojis.get('693972316182282271');
    const embed = new Discord.RichEmbed()
     .setColor("#0080FF")
    .setAuthor(client.user.username,client.user.displayAvatarURL)
    .setDescription(`${emoji1} ${vUser}, Aramıza Hoşgeldin :)
        
    ${emoji2}Seninle Beraber **${message.guild.memberCount}** kişiyiz.
    ${emoji2}Cinsiyet: **KIZ**

    ${emoji3}Şu Kanallara Göz Atmayı Unutma <#693286362778173492> **-** <#693286383728459838>`,true)
    .setTimestamp()
    .setFooter(`KURALLARA UYMAYI UNUTMAYINIZ.!`)
    
    let onay = message.guild.channels.find(`name`, "💬sᴏʜʙᴇᴛ");
    onay.send(embed).then(m => m.delete(60000));
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kız', 'Kız', 'KIZ', 'ʙᴀʏᴀɴ', 'bayan', 'BAYAN', 'Bayan'],
};

exports.help = {
  name: 'teyit-kız',
  description: 'Kullanıcı İçin Lianslı Rolünü Verir.',
  usage: 'bayan'
};
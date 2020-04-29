const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

// TEYIT \\

client.on("guildMemberAdd", async (member) => {
      let gkisi = client.users.get(member.id);
      const ktarih = new Date().getTime() - gkisi.createdAt.getTime();   

    if (ktarih < 2592000001) {
      member.addRole("SUPHELI HESAP ID")
        
    const embed = new Discord.RichEmbed()
     .setColor("#0080FF")
    .setAuthor(client.user.username,client.user.displayAvatarURL)
    .setDescription(`<@${member.user.id}>**, Aramıza Hoşgeldin :)**

     **Seninle Beraber ~*${member.guild.memberCount}*~ Kişiyiz.**
     **Teyit Olabilmeniz İçin Lütfen ~*"ᴄᴏɴғɪʀᴍᴀᴛɪᴏɴ"*~ Odalarına Giriş Yapınız.!**
     **Kayıt Tarihi: ${moment.utc(member.JoinedAt).format('DD.MM.YY')}**
     **Şüpheli Hesap!**

    **ᕒ ᴛᴇʏɪᴛ ᓬ Sorumlularımız Sizlerle İlgilenecektirler.**

`,true)
    
    .setTimestamp()
    .setFooter(`ŞÜPHELİ HESAPLAR YETKİLİ İLE İLETİŞİME GEÇSİNLER.!`)
        
    let mkanal = member.guild.channels.find(`name`, "MISAFIR KANAL ADI");
    mkanal.send(embed);
    
    }else{
              member.addRole("GUVENLI HESAP ID")
          
    const embed = new Discord.RichEmbed()
     .setColor("#0080FF")
    .setAuthor(client.user.username,client.user.displayAvatarURL)
    .setDescription(`<@${member.user.id}>**, Aramıza Hoşgeldin :)**

    **Seninle Beraber ${member.guild.memberCount} Kişiyiz.**
     **Teyit Olabilmeniz İçin Lütfen ~*"ᴄᴏɴғɪʀᴍᴀᴛɪᴏɴ"*~ Odalarına Giriş Yapınız.!**
     **Kayıt Tarihi: ${moment.utc(member.user.createdAt).format('DD.MM.YY')}**
     **Güvenli Hesap!**

    **Teyitçi Sorumlularımız Sizlerle İlgilenecektirler.**

`,true)
    
    .setTimestamp()
    .setFooter(`ŞÜPHELİ HESAPLAR YETKİLİ İLE İLETİŞİME GEÇSİNLER.!`)
    
    let mkanal = member.guild.channels.find(`name`, "MISAFIR KANAL ADI");
    mkanal.send(embed);
      
      }
});


// TEYIT \\
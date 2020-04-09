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

// OTOROL \\
client.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let otorole =  JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
      let arole = otorole[member.guild.id].sayi
  let giriscikis = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('Otorol Sistemi')
    .setDescription(`:loudspeaker: :inbox_tray:  @${member.user.tag}'a Otorol Verildi `)
.setColor("GREEN")
    .setFooter("Gnarge", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
      } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }

});

client.on("guildMemberAdd", async (member) => {
      let gkisi = client.users.get(member.id);
      const ktarih = new Date().getTime() - gkisi.createdAt.getTime();   
      let autorole =  JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
      let role = autorole[member.guild.id].sayi
      let giriscikis = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));  


    if (ktarih < 2592000001) {
      member.removeRole("693293177838501969", 300),   
      member.addRole("693337505294188554")
    
        let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    
    const emoji1 = client.emojis.get('693976996321165385');
    const emoji2 = client.emojis.get('693987889549410396');
    const emoji3 = client.emojis.get('693972316182282271');
    const guvenli = client.emojis.get('694002916104601630');
    const supheli = client.emojis.get('694002919766229094');  
    const embed = new Discord.RichEmbed()
     .setColor("#0080FF")
    .setAuthor(client.user.username,client.user.displayAvatarURL)
    .setDescription(`${emoji1} <@${member.user.id}>**, Aramıza Hoşgeldin :)**

    ${emoji2} **Seninle Beraber ~*${member.guild.memberCount}*~ Kişiyiz.**
    ${emoji2} **Teyit Olabilmeniz İçin Lütfen ~*"ᴄᴏɴғɪʀᴍᴀᴛɪᴏɴ"*~ Odalarına Giriş Yapınız.!**
    ${emoji2} **Kayıt Tarihi: ${moment.utc(member.JoinedAt).format('DD.MM.YY')}**
    ${supheli} **Şüpheli Hesap!**

    ${emoji3} **ᕒ ᴛᴇʏɪᴛ ᓬ Sorumlularımız Sizlerle İlgilenecektirler.**

`,true)
    
    .setTimestamp()
    .setFooter(`ŞÜPHELİ HESAPLAR YETKİLİ İLE İLETİŞİME GEÇSİNLER.!`)
    
    giriscikiskanali.send(embed)
    
    }else{
              member.addRole(role)
      
          let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    
    const emoji1 = client.emojis.get('693976996321165385');
    const emoji2 = client.emojis.get('693987889549410396');
    const emoji3 = client.emojis.get('693972316182282271');
    const guvenli = client.emojis.get('694002916104601630');
    const supheli = client.emojis.get('694002919766229094');
    const embed = new Discord.RichEmbed()
     .setColor("#0080FF")
    .setAuthor(client.user.username,client.user.displayAvatarURL)
    .setDescription(`${emoji1} <@${member.user.id}>**, Aramıza Hoşgeldin :)**

    ${emoji2} **Seninle Beraber ⌘*${member.guild.memberCount}*⌘ Kişiyiz.**
    ${emoji2} **Teyit Olabilmeniz İçin Lütfen ~*"ᴄᴏɴғɪʀᴍᴀᴛɪᴏɴ"*~ Odalarına Giriş Yapınız.!**
    ${emoji2} **Kayıt Tarihi: ${moment.utc(member.user.createdAt).format('DD.MM.YY')}**
    ${guvenli} **Güvenli Hesap!**

    ${emoji3} **ᕒ ᴛᴇʏɪᴛ ᓬ Sorumlularımız Sizlerle İlgilenecektirler.**

`,true)
    
    .setTimestamp()
    .setFooter(`ŞÜPHELİ HESAPLAR YETKİLİ İLE İLETİŞİME GEÇSİNLER.!`)
    
    giriscikiskanali.send(embed)

      }
});


// OTOROL \\
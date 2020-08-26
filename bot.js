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
      member.addRole("1241414131314141")
        
    const embed = new Discord.RichEmbed()
     .setColor("#0080FF")
    .setAuthor(client.user.username,client.user.displayAvatarURL)
    .setDescription(`<@${member.user.id}>**, Aramıza Hoşgeldin.**

     **Seninle Beraber ~*${member.guild.memberCount}*~ Kişiyiz.**
     **Teyit Olabilmeniz İçin Örnek = '!kayıt Burak 24' Yazınız.!**
     **Kayıt Tarihi: ${moment.utc(member.JoinedAt).format('DD.MM.YY')}**
     **Şüpheli Hesap!**

     **Bol keyifli zaman geçirmeniz dileğiyle - Trigger.**

`,true)
    
    .setTimestamp()
    .setFooter(`Şüpheli hesaplar yetkili ile iletişime geçsinler.!`)
        
    let mkanal = member.guild.channels.find(`name`, "register-chat");
    mkanal.send(embed);
    
    }else{
              member.addRole("0464564564564564")
    const arrow = client.emojis.get (`741028732784869406`) 
    const verifyy = client.emojis.get (`722641748005879828`)
    const embed = new Discord.RichEmbed()
     .setColor("#0080FF")
    .setAuthor(client.user.username,client.user.displayAvatarURL)
    .setDescription(`<@${member.user.id}>**, Aramıza Hoşgeldin.**

     ${arrow}  **Seninle Beraber ${member.guild.memberCount} Kişiyiz.**
     ${arrow} **Teyit Olabilmeniz İçin -V.Confirmed- Odalarından Birine Geçiniz.** '
     ${arrow} **Kayıt Tarihi: ${moment.utc(member.user.createdAt).format('DD.MM.YY')}**
     ${arrow} **Güvenli Hesap!**

    ${verifyy} **Bol keyifli zaman geçirmeniz dileğiyle - Trigger.**
    
  

`,true)
    
    .setTimestamp()
    .setFooter(`Şüpheli hesaplar yetkili ile iletişime geçsinler.!`)
    .setImage("https://cdn.discordapp.com/attachments/589366950015139844/741357730836512788/20200807_142346.gif")
    
    let mkanal = member.guild.channels.find(`name`, "register-chat");
    mkanal.send(embed);
      
      }
});

client.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let otorole =  JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
      let arole = otorole[member.guild.id].sayi
  let giriscikis = JSON.parse(fs.readFileSync("./otorol.json", "utf8")); 
  let embed = new Discord.RichEmbed()
    .setTitle('Otorol Sistemi')
    .setDescription(`:loudspeaker: :inbox_tray:  @${member.user.tag}'a Otorol Başarılıyla Verilmiştir. `)
.setColor("GREEN")
    .setFooter("ForumGrand", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
   // giriscikiskanali.send(`::loudspeaker: :white_check_mark: :rose: Hoşgeldin **${member.user.tag}** Rolün Başarılı Bir Şekilde Verildimiştir. :rose: :white_check_mark: :loudspeaker:`);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }

});

client.on("guildMemberAdd", async (member) => {
      let autorole =  JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
      let role = autorole[member.guild.id].sayi

      member.addRole(role)

});

/////////////////////////////////////
///////////////////////////////////////////////////

client.on("userUpdate", async (old, nev) => {
  let emingSunucu = "717698440410431529"; //Sunucu ID
  let emingKanal = "747488421890490398"; //BILGI KANAL ID
  let emingRol = "747488326029803612"; //ROL ID
  let emingTag = "✦"; //TAG
  if (old.username !== nev.username) {
    if (
      nev.username.includes(emingTag) &&
      !client.guilds
        .get(emingSunucu)
        .members.get(nev.id)
        .roles.has(emingRol)
    ) {
      client.channels
        .get(emingKanal)
        .send(
          ` **${nev}, \`${emingTag}\` Tagını aldı \`✦ Family of the Revers\` rolünü kazandı.**`
        );
      client.guilds
        .get(emingSunucu)
        .members.get(nev.id)
        .addRole(emingRol);
    }
    if (
      !nev.username.includes(emingTag) &&
      client.guilds
        .get(emingSunucu)
        .members.get(nev.id)
        .roles.has(emingRol)
    ) {
      client.guilds
        .get(emingSunucu)
        .members.get(nev.id)
        .removeRole(emingRol);
      client.channels
        .get(emingKanal)
        .send(
          ` **${nev}, \`${emingTag}\` Tagını çıkarttı \`そ Family of the Revers\` rolünü kaybetti.**`
        );
    }
  }
});





client.on('ready', () => {
  console.log(`Console Logs`);
  setInterval(function() {
    let channel = client.channels.get("74095996743503054") //MESAJIN GİDECEĞİ KANAL ID
    if (channel) {
      channel.send("birgün herkes kitap okuycak <@615215543032479760>")
    }
  }, 10000) //1000 ms = 1sn 
})





client.on('ready', () => {
  client.channels.get('741977321577381999').join()
})
//Developed by Owner Of The Night


client.on("message", message => {
  if (message.channel.type === "dm") return;
  if (message.content.toLowerCase() === "say") {
  var memettaglı = 0;
  let memettag = '✦';
  message.guild.members.forEach(member => {
  if(member.user.username.includes(memettag)) {
  memettaglı = memettaglı+1
    }
  })
    const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
    const embed = new Discord.RichEmbed()
    .setColor(`FFFFFF`)
    .setDescription(`<a:partner:722641259382177802> • Sunucumuzda **${message.guild.memberCount}** toplam, **${memettaglı}** taglı, **${count}** sesli üye bulunmakta.`)
    .setFooter(`HELIOS ❤ ECHO`)
    message.channel.send(embed)
  }
});

client.on("message", message => {
  if (message.channel.type === "dm") return;
  if (message.content.toLowerCase() === "!say") {
  var memettaglı = 0;
  let memettag = '✦';
  message.guild.members.forEach(member => {
  if(member.user.username.includes(memettag)) {
  memettaglı = memettaglı+1
    }
  })
    const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
    const embed = new Discord.RichEmbed()
    .setColor(`FFFFFF`)
    .setDescription(`<a:partner:722641259382177802> • Sunucumuzda **${message.guild.memberCount}** toplam, **${memettaglı}** taglı, **${count}** sesli üye bulunmakta.`)
    .setFooter(`HELIOS ❤ ECHO`)
    message.channel.send(embed)
  }
});

client.on("message", message => {
  if (message.channel.type === "dm") return;
  if (message.content.toLowerCase() === "r!say") {
  var memettaglı = 0;
  let memettag = '✦';
  message.guild.members.forEach(member => {
  if(member.user.username.includes(memettag)) {
  memettaglı = memettaglı+1
    }
  })
    const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
    const embed = new Discord.RichEmbed()
    .setColor(`FFFFFF`)
    .setDescription(`<a:partner:722641259382177802> • Sunucumuzda **${message.guild.memberCount}** toplam, **${memettaglı}** taglı, **${count}** sesli üye bulunmakta.`)
    .setFooter(`HELIOS ❤ ECHO`)
    message.channel.send(embed)
  }
});

client.on("message", message => {
  if (message.channel.type === "dm") return;
  if (message.content.toLowerCase() === "üye") {
  var memettaglı = 0;
  let memettag = '✦';
  message.guild.members.forEach(member => {
  if(member.user.username.includes(memettag)) {
  memettaglı = memettaglı+1
    }
  })
    const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
    const embed = new Discord.RichEmbed()
    .setColor(`FFFFFF`)
    .setDescription(`<a:partner:722641259382177802> • Sunucumuzda **${message.guild.memberCount}** toplam, **${memettaglı}** taglı, **${count}** sesli üye bulunmakta.`)
    .setFooter(`HELIOS ❤ ECHO`)
    message.channel.send(embed)
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('**Aleyküm selam Hoşgeldin ^^**');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'siktirgit') {
    msg.reply('**Argo Kelime Kullanma**');
  }
  
  if (msg.content === 'selamın aleykum') {
   	msg.reply('ve aleyküm selam');
  }

  if (msg.content === 'selamun aleyküm') {
   	msg.reply('ve aleyküm selam');
  }
  
  if (msg.content === 'bye bye') {
   	msg.reply('sağlıcakla kal!');
  }

  if (msg.content === 'günaydın') {
   	msg.reply('sana da günaydın');
  }

  if (msg.content === 'tag') {
   	msg.reply('✦');
  }

  if (msg.content === 'herkese günaydın') {
   	msg.reply('yepyeni bir güne merhaba :)');
  }

  if (msg.content === 'iyi geceler') {
   	msg.reply('sana da iyi geceler');
  }

  if (msg.content === 'iyi akşamlar') {
   	msg.reply('sana da iyi akşamlar');
  }

  if (msg.content === 'selamın aleyküm') {
   	msg.reply('ve aleyküm selam');
  }

  if (msg.content === 'güle güle') {
   	msg.reply('sana da güle güle');
  }
  
});


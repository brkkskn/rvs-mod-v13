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
        
    let mkanal = member.guild.channels.find(`name`, "taglı-alım");
    mkanal.send(embed);
    
    }else{
              member.addRole("0464564564564564")
    const arrow = client.emojis.get (`741028732784869406`) 
    const verify = client.emojis.get (`741289693760716881`)
    const embed = new Discord.RichEmbed()
     .setColor("#0080FF")
    .setAuthor(client.user.username,client.user.displayAvatarURL)
    .setDescription(`<@${member.user.id}>**, Aramıza Hoşgeldin.**

     ${arrow} **Seninle Beraber ${member.guild.memberCount} Kişiyiz.**
     ${arrow} **Teyit Olabilmeniz İçin -V.Confirmed- Odalarından Birine Geçiniz.** '
     ${arrow} **Kayıt Tarihi: ${moment.utc(member.user.createdAt).format('DD.MM.YY')}**
     ${arrow} **Güvenli Hesap!**

    ${verify} **Bol keyifli zaman geçirmeniz dileğiyle - Trigger.**

`,true)
    
    .setTimestamp()
    .setFooter(`Şüpheli hesaplar yetkili ile iletişime geçsinler.!`)
    
    let mkanal = member.guild.channels.find(`name`, "taglı-alım");
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
  let emingSunucu = "722442177141145632"; //Sunucu ID
  let emingKanal = "741040376747655320"; //BILGI KANAL ID
  let emingRol = "740959856734765128"; //ROL ID
  let emingTag = "そ"; //TAG
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
          ` **${nev}, \`${emingTag}\` Tagını aldı \`そ Family of the Revers\` rolünü kazandı.**`
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

///////////////////////////////////////////////////

const yourID = "440222721079508993"; //Instructions on how to get this: https://redd.it/40zgse //Kendi İD'nizi Yazın
const setupCMD = "!deneme" //İstediğiniz Komut Yapabilirsiniz örn : !kayıtol
let initialMessage = `deneme`; //Dilediğiniz Şeyi Yazabilirsiniz
const roles = ["üye", "Artist", "Public Relations", "Intern"]; //İstediğiniz Rolü Yazabilirsiniz
const reactions = ["✅", "", "", ""]; //İstediğiniz Emojiyi Ekleyebilirsiniz
const botToken = "";  //Burası Boş Kalsın
                    

//Load up the bot...
//const Discord = require('discord.js');
const bot = new Discord.Client();
bot.login(botToken);

//If there isn't a reaction for every role, scold the user!
if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";

//Function to generate the role messages, based on your settings
function generateMessages(){
    var messages = [];
    messages.push(initialMessage);
    for (let role of roles) messages.push(`Kayıt Olmak İçin **"${role}"** Emojisine Tıkla!`); //DONT CHANGE THIS
    return messages;
}


bot.on("message", message => {
    if (message.author.id == yourID && message.content.toLowerCase() == setupCMD){
        var toSend = generateMessages();
        let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions[idx]])];
        for (let mapObj of mappedArray){
            message.channel.send(mapObj[0]).then( sent => {
                if (mapObj[1]){
                  sent.react(mapObj[1]); 
                }
            });
        }
    }
})


bot.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
        
        let channel = bot.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg=> {
        let user = msg.guild.members.get(event.d.user_id);
        
        if (msg.author.id == bot.user.id && msg.content != initialMessage){
      
            var re = `\\*\\*"(.+)?(?="\\*\\*)`;
            var role = msg.content.match(re)[1];
        
            if (user.id != bot.user.id){
                var roleObj = msg.guild.roles.find(r => r.name === role);
                var memberObj = msg.guild.members.get(user.id);
                
                if (event.t === "MESSAGE_REACTION_ADD"){
                    memberObj.addRole(roleObj)
                } else {
                    memberObj.removeRole(roleObj);
                }
            }
        }
        })
 
    }   
});
const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
exports.run = async (client, message, args) => {
  //

  let prefix =
    (await require("quick.db").fetch(`prefix_${message.guild.id}`)) ||
    ayarlar.prefix;
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.channel.send(
      `Bu Komutu Kullanabilmek İçin "\`Sunucuyu Yönet\`" Yetkisine Sahip Olmalısın.`
    );

  let aktif = await db.fetch(`bottemizle_${message.guild.id}`);
  if (aktif) {
    db.delete(`bottemizle_${message.guild.id}`);
    message.channel.send(`🛑 Koruma Sistemi Devre Dışı Bırakıldı! 🛑`);
  }

  if (!aktif) {
    db.set(`bottemizle_${message.guild.id}`, "aktif");
    message.channel.send(`✅ Koruma Sistemi Aktif Edildi!`);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["koruma-sistemi", "koruma"],
  permLevel: 0
};

exports.help = {
  name: "koruma-sistemi",
  description:
    "Sunucuya Bot Eklendiğinde Atılmasını Sağlayan Sistemi Başarıyla Aktifleştirirsiniz/Kapatırsınız.",
  usage: "koruma-sistemi"
};
 
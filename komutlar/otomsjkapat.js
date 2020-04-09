 const Discord = require('discord.js')
const fs = require('fs')

exports.run = async (client, message, args) => {
      if (!message.member.roles.find("name", "👑")) {
        return message.channel.send(' **Bu Komutu Kullanmak için** \*`👑*\` **Rolüne Sahip Olman Lazım** ')
            .then(m => m.delete(5000));
    }    
  	let sunucuyaözelayarlarOtorol = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
		if(!sunucuyaözelayarlarOtorol[message.guild.id]) {
			const embed = new Discord.RichEmbed()
				.setDescription(`Otorolü Ayarlamadığın İçin Kapatamazsın!`)
				.setColor("RED")
				.setTimestamp('Ayarlamak İçin /otorol @roladi')
			message.channel.send({embed})
			return
		}
  exports.run = async (client, message, args, member) => {
      	let giriscikis = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
		delete giriscikis[message.guild.id]
		fs.writeFile("./otorol.json", JSON.stringify(giriscikis), (err) => {

		})
		const embed = new Discord.RichEmbed()
			.setDescription(`Otorol Mesajları Başarıyla Kapatıldı`)
			.setColor("RANDOM")
			.setTimestamp()
		message.channel.send({embed})
		return
	}}




exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["kapatotoyazı"],
  permLevel: 0
};

exports.help = {
  name: 'otorolmesajkapat', 
  description: 'Slots oyunu oynar',
  usage: 'otorolmesajkapat'
};
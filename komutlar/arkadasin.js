const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
 message.channel.send({embed: {
		  file:"https://st2.depositphotos.com/1499736/9556/i/950/depositphotos_95566772-stock-photo-man-pointing-finger-at-camera.jpg",
          color: 0xD96857,
		  description: "**La Banane Senin Arkadasindan**"
            }});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Arkadasin'],
  permLevel: 0
};

exports.help = {
  name: 'arkadasin',
  description: 'Arkadasini Bilir',
  usage: 'arkadasin'
};

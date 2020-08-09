const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
			message.channel.send({embed: {
            color: 0xD97634,
            "image": {
            "url": message.author.avatarURL,
                }
        }});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['pp', 'avatar'],
  permLevel: 0
};

exports.help = {
  name: 'avatarım',
  description: 'kedileri gösterir.',
  usage: 'avatarım'
};

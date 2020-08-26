const Discord = require('discord.js');
exports.run = function(client, message, args) {



    const çekiliş = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Çekiliş!", true)
    .addField("Çekilişi Yapan:", `<@${message.author.id}>`, true)
    .addField("Çekilişin Yapıldığı Kanal:", message.channel)
    .addField("Çekilişin Yapıldığı Zaman:", message.createdAt)
    .addField(`Çekilişi Kazanan:`, `<@${message.guild.members.random().id}>`, true)
    .setColor("RANDOM")
    .setDescription('')
    return message.channel.sendEmbed(çekiliş);
    
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["çekilişyap"],
  permLevel: 2
};

exports.help = {
  name: 'çekilişyap',
  description: 'Çekiliş yapar.',
  usage: 'çekilişyap'
};

client.on('message', async msg => {

	if (msg.author.bot) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);
	let command = msg.content.toLowerCase().split(' ')[0];

	if (command === 'çal') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
    .setDescription('❎ | Lütfen Seli Bir Kanala Giriş Yapınız!'));
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('❎ | Lütfen Seli Bir Kanala Giriş Yapınız!'));
		}
		if (!permissions.has('SPEAK')) {
			 return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('❎ | Şarkıyı Çalamıyorum Bu Kanalda Konuşma Yetkim Yok!'));
        }

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			 return msg.channel.sendEmbed(new Discord.RichEmbed)
      .setTitle(`✅** | **${playlist.title}** Adlı Şarkı Kuyruğa Eklendi!**`)
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
          
				 msg.channel.sendEmbed(new Discord.RichEmbed()                  
         .setTitle('Şarkı Seçimi')
         .setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
         .setFooter('Lütfen 1-10 Arasında Bir Rakam Seçiniz 10 Saniye İçinde Liste İptal Edilecektir!')
	 .setFooter('Örnek Kullanım 1')
         .setColor('0x36393E'));
          msg.delete(5000)
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						 return msg.channel.sendEmbed(new Discord.RichEmbed()
            .setColor('0x36393E')
            .setDescription('❎ | **10 Saniye İçinde Şarkı Seçmediğiniz İçin seçim İptal Edilmiştir!**.'));
                    }
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.sendEmbed(new Discord.RichEmbed()
          .setColor('0x36393E')
          .setDescription('❎ | YouTubede Böyle Bir Şarkı Yok !**'));
                }
            }
			return handleVideo(video, msg, voiceChannel);
      
		}
	} else if (command === 'gir') {
		return new Promise((resolve, reject) => {
			const voiceChannel = msg.member.voiceChannel;
			if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply('Kanalda Kimse Olmadığından Çıkıyorum!');
			voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
		});
	} else if (command === 'geç') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('❎ | Lütfen Seli Bir Kanala Giriş Yapınız!'));
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
     .setColor('RANDOM')
     .setTitle('❎ **Şu An Zaten Şarkı Çalmıyorum!'));                                              
		serverQueue.connection.dispatcher.end('**Sıradaki Şarkıya Geçildi!**');
		return undefined;
	} else if (command === 'durdur') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('❎ | Lütfen Seli Bir Kanala Giriş Yapınız!'));
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
     .setColor('RANDOM')
     .setTitle('❎ | Şu An Zaten Şarkı Çalmıyorum!'));                                              
		msg.channel.send(`:stop_button: **${serverQueue.songs[0].title}** Adlı Şarkı Durduruldu`);
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('**Şarkı Bitti**');
		return undefined;
	} else if (command === 'ses') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('❎ | Lütfen Seli Bir Kanala Giriş Yapınız!'));
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
     .setColor('RANDOM')
     .setTitle('❎ | Çalmayan Müziğin Sesine Bakamam'));                                              
		if (!args[1]) return msg.channel.sendEmbed(new Discord.RichEmbed()
   .setTitle(`:loud_sound: Şuanki Ses Seviyesi: **${serverQueue.volume}**`)
    .setColor('RANDOM'))
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle(`:loud_sound: Ses Seviyesi Ayarlanıyor: **${args[1]}**`)
    .setColor('RANDOM'));                             
	} else if (command === 'çalan') {
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle("❎ | Şu An Şarkı Çalınmıyor!")
    .setColor('RANDOM'));
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle("Çalan")                            
    .addField('Başlık', `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`, true)
    .addField("Süre", `${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`, true))
	} else if (command === 'sıra') {
    let index = 0;
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle("❎ | **Şarkı Kuyruğunda Şarkı Bulunmamakta**")
    .setColor('RANDOM'));
		  return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
     .setTitle('Şarkı Kuyruğu')
    .setDescription(`${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n')}`))
    .addField('Şu Anda Çalınan: ' + `${serverQueue.songs[0].title}`);
	} else if (command === '?duraklat') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle("**:pause_button: Şarkı Durduruldu!**")
      .setColor('RANDOM'));
		}
		return msg.channel.send('❎ | **Şarkı Çalmıyor Şu An**');
	} else if (command === 'devam') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle("**:arrow_forward: Şarkı Devam Ediyor!**")
      .setColor('RANDOM'));
		}
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle("**❎ | Şu An Şarkı Çalınmıyor!**")
    .setColor('RANDOM'));
	}
  

	return undefined;
});
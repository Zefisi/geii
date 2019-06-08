const Discord = require('discord.js');

const client = new Discord.Client();

var prefix ="*";

const ytdl = require('ytdl-core');

const queue = new Map();
var queunum=0;


var servers = {};

client.login("NTE5OTcxOTE5OTk1MzM4NzUy.DunFug.EacSh46rrTYUSazIllz_u0Kk2hM");



function play(connection, message) {
  
    var server = servers[message.guild.id];
  
    server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));
  
    server.queue.shift();
  
    server.dispatcher.on("end", function() { 
      if (server.queue[0]) play(connection, message);
  
      else connection.disconnect();
  
    });
}

client.on('message', message=> {
    if(message.content==="bonjour"){
        message.reply("Tu as eu combien en auto deja ?");
        console.log('le bot dit bonjour');
        }
    if (message.content=== prefix+ "level"){
        message.reply("Tu t'est fait en un jour ?");

        }

        if (message.content=== prefix+ "stop"){
            queunum=0;
           }

           if (message.content === prefix + "edt"){
            console.log("edt ok");
            var edt="https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwijvKvuxZPfAhWmz4UKHRcMAoUQjRx6BAgBEAU&url=https%3A%2F%2Fbeebom.com%2Freverse-image-search-engines-apps-uses%2F&psig=AOvVaw0LXth8dSZMcXawnAHcUK7T&ust=1544472310667946https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwijvKvuxZPfAhWmz4UKHRcMAoUQjRx6BAgBEAU&url=https%3A%2F%2Fbeebom.com%2Freverse-image-search-engines-apps-uses%2F&psig=AOvVaw0LXth8dSZMcXawnAHcUK7T&ust=1544472310667946"
            var edt_embed= new Discord.RichEmbed()
            .setColor('#40A497')
            .setTitle('Emploi du temps')
            .setImage(edt)
            .setFooter('Emploi du temps')
            message.channel.send(edt_embed);
            
        }
    
        if (message.content === prefix + "montages"){
            console.log("montages ok");
            var montages =[
                "https://nsa39.casimages.com/img/2018/12/09/mini_181209085311373599.png[/IMG][/url]"
    
    
    
            ];
            var gif = montages[Math.floor(Math.random()*montages.length)];
            var montages_embed= new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle('Montages GEII')
            .setImage(gif)
            .setFooter('Montages')
            message.channel.send(montages_embed);
            
        }

    

});



client.on("ready", () => {
    console.log("bot ok");
    client.user.setGame("Qui a Shutdown Pascal");
});

client.on("message", message => {
    

    



    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");
     
    switch (args[0].toLowerCase()) { 
      
            
    case "play":

      if (!args[1]) {

     
     message.channel.sendMessage("Tu dois m’indiquer un lien YouTube"); 
     

      return;

    
    }

    if(!message.member.voiceChannel) {

     message.channel.sendMessage(":x: Tu dois être dans un salon vocal"); 
 
     return;

    }
    

        queunum=queunum+1;
    

    if(!servers[message.guild.id]) servers[message.guild.id] = {

        
     queue: []
     

    };


    var server = servers[message.guild.id];


    server.queue.push(args[1]);

    if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {

     play(connection, message) 

    });

  break; 



    case "queu":

     if(message.member.voiceChannel) {
        var youtube_embed= new Discord.RichEmbed()
        .setColor('#40A497')
        .setTitle('Queu')
        .addField(queunum)
        message.channel.send(youtube_embed);
     

     break;
  
    }




      case "skip":
     

    if(!message.member.voiceChannel) {

     message.channel.sendMessage(":x: Tu dois être dans un salon vocal"); 

     

     return;
    
    }
    
        
    queunum=queunum-1;
    

      

    var server = servers[message.guild.id];

    if(server.dispatcher) server.dispatcher.end();

    break;

  case "stop":

    if(!message.member.voiceChannel) 
    
    return message.channel.send(":x: Tu dois être dans un salon vocal");

    message.member.voiceChannel.leave();

    break;
  
  }

});

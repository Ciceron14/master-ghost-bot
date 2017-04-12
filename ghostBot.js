const Discord = require('discord.js');
const client = new Discord.Client();



function commandIs(str,msg)
{
    return msg.content.toLowerCase().startsWith('!' + str);
}
function arguments(str)
{
    var start_pos = str.indexOf('"') + 1;
    var end_pos = str.indexOf('"', start_pos);
    return str.substring(start_pos, end_pos);
    //return str.substring(str.IndexOf('"') + 1, str.lastIndexOf('"'));
}


client.on('ready', () =>
{
    console.log('Ghost is online');
});


//WELCOME AND GOODBYE
client.on('guildMemberAdd', member =>
{
    let guild = member.guild;
    guild.channels.get('301180453883478016').sendMessage('A new guardian has joined. Welcome, ' + member.user + ' !' + System.lineSeparator() + "Don't forget to read the #open_broadcast !");
});
client.on('guildMemberRemove', member =>
{
    let guild = member.guild;
    guild.channels.get('301180453883478016').sendMessage('Guardian down ! ' + member.user + ' left the Conglomerate.' + System.lineSeparator() + 'Only ' + (guild.memberCount - 1) + " guardians left.");
});


//REACT TO MESSAGES IN CHANNEL
client.on('message', message =>
{

    //if (message.content.toString().includes('Ghost'))
    if (message.isMentioned("301176884438368257"))
    {
        //Bot informs member of its status
        if (message.content.toLowerCase().toString().includes('status'))
        {
            message.channel.sendMessage('I can run some basic search on the Ishtar database now, ' + trump(message.member.displayName, " ["));
        }

        //Bot does research in ishtar database
        else if (message.content.toLowerCase().toString().includes('search') && message.content.toLowerCase().toString().includes('ishtar'))
        {
            argString = arguments(message.content.toLowerCase().toString());
            args = argString.split(" ");
            if (args.length === 0)
            {
                message.channel.sendMessage('I need some keywords to find lore entries Guardian. Please include `"keywords"` in your command.');
            }
            else
            {
                var keywords = args.length + 1;
                message.channel.sendMessage("I was given " + (keywords - 1) + " keywords. Here is what I found :");
                var search = '';
                while (keywords > 1)
                {
                    search += args[args.length - keywords + 1] + "-";
                    keywords -= 1;
                }
                message.channel.sendMessage('http://www.ishtar-collective.net/categories/' + search.substring(0, search.length - 1));
            }
        }

        //Bot tells a joke
        else if (message.content.toLowerCase().toString().includes('joke'))
        {
            jokes = ["I had a very good joke, but I Phogoth it", "You're the joke."];
            i = Math.floor(Math.random() * (jokes.length));
            message.channel.sendMessage(jokes[i]);
        }

        //Bot is mentionned but no command is given
        else
        {
            message.channel.sendMessage('How can I help you, ' + trump(message.member.displayName, " ["));
        }
    }
});

function trump(str, pattern)
{
    if (str && str.length)
    {
        trumped = str;
        if (pattern && pattern.length)
        {
            var idx = str.indexOf(pattern);

            if (idx != -1)
            {
                trumped = str.substring(0, idx);
            }
        }
    }
    return (trumped);
}

//add bot to server = https://discordapp.com/oauth2/authorize?client_id=301176884438368257&scope=bot
//bot client id = 301176884438368257
client.login('MzAxMTc2ODg0NDM4MzY4MjU3.C83MZQ.CmryEmXsikHsgUFvICqKZqBSxIg');
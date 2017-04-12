const Discord = require('discord.js');
const client = new Discord.Client();

function commandIs(str,msg)
{
    return msg.content.toLowerCase().startsWith('!' + str);
}

client.on('ready', () =>
{
    console.log('Ghost is online');
});

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

client.on('message', message =>
{
    var args = message.content.split(/[ ]+/);

    //Bot won't reply to itself
    if (message.author.bot) return;

    //Bot informs member of its wip status
    if(commandIs("ghost", message))
    {
        message.channel.sendMessage('I am not ready yet ' + trump(message.member.displayName, " "));
    }

    //Bot insults
    if (commandIs("insult", message))
    {
        if (args.length === 1)
        {
            message.channel.sendMessage("lol you told me to insult nobody you dumbass. use `!insult + [name of the person to insult]` !");
        }
        else if (args.length === 2)
        {
            message.channel.sendMessage('you suck dicks ' + args[1]);
        }
        else
        {
            message.channel.sendMessage('chillout dude, wtf, one at a time');
        }
    }

    //Bot lore
    if (commandIs("lore", message))
    {
        if (args.length === 1)
        {
            message.channel.sendMessage("I need some keywords to find lore entries Guardian. Please type `!lore + [element to search]` !");
        }
        else
        {
            var keywords = args.length;
            var search = '';
            while (keywords > 1)
            {
                search += args[args.length - keywords + 1] + "-";
                keywords -= 1;
            }
            message.channel.sendMessage('http://www.ishtar-collective.net/categories/' + search.substring(0, search.length - 1));
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
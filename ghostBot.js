const Discord = require('discord.js');
const client = new Discord.Client();

var fs = require('fs');
//var finder = require('findit').find(__dirname);


function arguments(str)
{
    var start_pos = str.indexOf('"') + 1;
    var end_pos = str.indexOf('"', start_pos);
    return str.substring(start_pos, end_pos);
}


client.on('ready', () =>
{
    console.log('Ghost is online');
});


//WELCOME AND GOODBYE
client.on('guildMemberAdd', member =>
{
    let guild = member.guild;
    guild.channels.get('296718956545441794').sendMessage('A new guardian has joined. Welcome, ' + member.user + ' !' + System.lineSeparator() + "Don't forget to read the #open_broadcast !");
});
client.on('guildMemberRemove', member =>
{
    let guild = member.guild;
    guild.channels.get('296718956545441794').sendMessage('Guardian down ! ' + member.user + ' left the Conglomerate.' + System.lineSeparator() + 'Only ' + (guild.memberCount - 1) + " guardians left.");
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
            if (argString.length === 0)
            {
                message.channel.sendMessage('I need some keywords to find lore entries Guardian. Please include `"keywords"` in your command.');
            }
            else
            {
                args = argString.split(" ");
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

        //Bot manages fireteams
        else if (message.content.toLowerCase().toString().includes('fireteam'))
        {
            //CREATE
            if (message.content.toLowerCase().toString().includes('new'))
            {
                argString = arguments(message.content.toLowerCase().toString());
                if (argString.length <= 0)
                {
                    message.channel.sendMessage('I need a fireteam name Guardian. Please include `new, fireteam, "fireteam name"` in your command.');
                }
                else
                {
                    args = argString.split(" ");
                    var keywords = args.length + 1;
                    var fireteamName = '';
                    while (keywords > 1)
                    {
                        fireteamName += args[args.length - keywords + 1] + " ";
                        keywords -= 1;
                    }
                    fireteamName.substring(0, fireteamName.length - 1)
                    //TEST
                    guild.channels.get('315332691576750080').sendMessage(fireteamName + ".txt" + ' \n' + message.member.displayName.toString() + ' \n')
                    message.channel.sendMessage('Your fireteam "' + fireteamName + '" has been created !');
                    });
                    /*fs.writeFile("fireteams/-" + fireteamName + ".txt", message.member.displayName.toString() + ' \n', function (err)
                    {
                        if (err)
                        {
                            message.channel.sendMessage('Hum... Not sure what happened, but I was not able to create your fireteam...')
                        }
                        else
                        {
                            message.channel.sendMessage('Your fireteam "' + fireteamName + '" has been created !');
                        }
                    });*/
                }
            }
            //JOIN
            else if (message.content.toLowerCase().toString().includes('join')) {
                argString = arguments(message.content.toLowerCase().toString());
                if (argString.length <= 0)
                {
                    message.channel.sendMessage('You need a fireteam to join a fireteam. Please include `join, fireteam, "fireteam name"` in your command.');
                }
                else
                {
                    args = argString.split(" ");
                    var keywords = args.length + 1;
                    var fireteamName = '';
                    while (keywords > 1) {
                        fireteamName += args[args.length - keywords + 1] + " ";
                        keywords -= 1;
                    }
                    fireteamName.substring(0, fireteamName.length - 1)
                    if (fs.existsSync("fireteams/-" + fireteamName + ".txt"))
                    {
                        fs.readFile("fireteams/-" + fireteamName + ".txt", function (err, data)
                        {
                            if (err)
                            {
                                message.channel.sendMessage('Something went wrong...')
                            }
                            if (data.indexOf(message.member.displayName.toString()) >= 0)
                            {
                                message.channel.sendMessage('Looks like you already joined that fireteam, here is the current roster :')
                                fs.readFile("fireteams/-" + fireteamName + ".txt", 'utf8', function (err, data)
                                {
                                    if (err)
                                    {
                                        message.channel.sendMessage('Hum... well I think you joined but I cannot find it... weird.')
                                    }
                                    message.channel.sendMessage(data);
                                    message.channel.sendMessage('Anyway, I will not tell the others that you had forgotten about it, do not worry.')
                                });
                            }
                            else
                            {
                                fs.appendFile("fireteams/-" + fireteamName + ".txt", message.member.displayName.toString() + '\n', function (err)
                                {
                                    if (err)
                                    {
                                        message.channel.sendMessage('Hum... I could not add you to the fireteam...')
                                    }
                                    message.channel.sendMessage('You joined "' + fireteamName + '" !');
                                });
                            }
                        });
                    }
                    else
                    {
                        message.channel.sendMessage('Hum... I was not able to find your fireteam...')
                    }
                }
            }
            //SHOW
            else if (message.content.toLowerCase().toString().includes('show'))
            {
                argString = arguments(message.content.toLowerCase().toString());
                if (argString.length <= 0)
                {
                    message.channel.sendMessage('I need a fireteam name to be able to show the people who joined it. Please include `show, fireteam, "fireteam name"` in your command.');
                }
                else
                {
                    args = argString.split(" ");
                    var keywords = args.length + 1;
                    var fireteamName = '';
                    while (keywords > 1)
                    {
                        fireteamName += args[args.length - keywords + 1] + " ";
                        keywords -= 1;
                    }
                    fireteamName.substring(0, fireteamName.length - 1)
                    if (fs.existsSync("fireteams/-" + fireteamName + ".txt"))
                    {
                        fs.readFile("fireteams/-" + fireteamName + ".txt", 'utf8', function (err, data)
                        {
                            if (err)
                            {
                                message.channel.sendMessage('Hum... I could not read the fireteam roster...')
                            }
                            message.channel.sendMessage('Here is the current roster for "' + fireteamName + '":');
                            message.channel.sendMessage(data);
                        });
                    }
                    else
                    {
                        message.channel.sendMessage('Did you just tell me to find a fireteam that does not exist ?')
                    }
                }
            }
            //DELETE
            else if (message.content.toLowerCase().toString().includes('delete'))
            {
                argString = arguments(message.content.toLowerCase().toString());
                if (argString.length <= 0) {
                    message.channel.sendMessage('I need a fireteam name to be able to delete it. Please include `delete, fireteam, "fireteam name"` in your command.');
                }
                else
                {
                    args = argString.split(" ");
                    var keywords = args.length + 1;
                    var fireteamName = '';
                    while (keywords > 1)
                    {
                        fireteamName += args[args.length - keywords + 1] + " ";
                        keywords -= 1;
                    }
                    fireteamName.substring(0, fireteamName.length - 1)
                    if (fs.existsSync("fireteams/-" + fireteamName + ".txt"))
                    {
                        fs.unlink("fireteams/-" + fireteamName + ".txt")
                        message.channel.sendMessage('Your fireteam "' + fireteamName + '" has been deleted !');
                    }
                    else
                    {
                        message.channel.sendMessage('Did you just tell me to delete a fireteam that does not exist ?')
                    }
                }
            }
            //SHOW ALL FIRETEAMS
            else if (message.content.toLowerCase().toString().includes('list'))
            {
                message.channel.sendMessage('The list command is not ready yet...')
            }
            //UNCOMPLETE COMMAND
            else
            {
                message.channel.sendMessage('Did you say something guardian ? Add `new`, `join`, `delete` or `show` to your fireteams commands.')
            }
        }

        //Bot tells a destiny pun
        else if (message.content.toLowerCase().toString().includes('pun') || message.content.toLowerCase().toString().includes('joke'))
        {
            jokes = [
                "I had a very good joke, but I Phogoth it.",
                "Why are titans' eyes always hurting ? \nBecause they can't blink.",
                "Why shouldn't you have sex with the Templar? \nBecause he has harpies.",
                "Why did the Archon Priest get locked up? \nVandallism.",
                "What do you call two acolytes claping hands? \nA Hive five.",
                "Why did the Archon Priest get locked up? \nVandallism.",
                "Hey, are your pants purple ? \nBecause that ass is legendary.",
                "I have a crush on one of the Archons... I guess you could say I've Fallen in love.",
                "I went to a Hive party last week. \nIt was pretty enthralling.",
                "Why can't Xur get a girlfriend ? \nBecause he doesn't have any Icebreaker.",
                "What is a Knight's favorite game ? \nHive and seek.",
                "What do Voidwalkers apply to chaffed skin ? \nNova Balm.",
                "Why are some servitors called 'High Servitors' ? \nDregs.",
                "Okay, seriously, one more bad pun and I'm getting the Hellmouth of here.",
                "What do bowling pins hate in Destiny ? \nStrikes.",
                "I wanted to make a joke... but all the good ones Archon.",
                "I never understood the hype about the Kellslayer's Helm. \nIt looks rather plane to me.",
                "Yo mamma so fat that when she puts on Chatterwhite everybody thinks she's the Traveller",
                "What do Hive give each others on Christmas ? \nPresents of Crota.",
                "When I die I want my LFG team to burry me. \nSo they can let me down one last time.",
                "What does the Traveller blame when his message doesn't get accros ? \nHis Speakers.",
                "What do the Vex eat for breakfast ? \nCornfluxes.",
                "How does Oryx measure his ships' speed ? \nIn Dreadknots"
                ];
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
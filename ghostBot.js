const Discord = require('discord.js');
const client = new Discord.Client();

var fs = require('fs');

var initializing = [];

function arguments(str)
{
    var start_pos = str.indexOf('"') + 1;
    var end_pos = str.indexOf('"', start_pos);
    return str.substring(start_pos, end_pos);
}

function plannedOperations(ID, str)
{
    client.channels.get('315332691576750080').fetchMessage(ID)
        .then(message => message.edit(message.content + str))
        .catch(console.error);
}

client.on('ready', () =>
{
    console.log('Ghost is online');
});

//WELCOME AND GOODBYE
client.on('guildMemberAdd', member =>
{
    let guild = member.guild;
    guild.channels.get('296718956545441794').send("I'm receiving signals... I think it's a guardian !");
    guild.channels.get('296718956545441794').send("I'll try to initialize them");
});
client.on('guildMemberRemove', member =>
{
    let guild = member.guild;
    guild.channels.get('296718956545441794').send('Guardian down ! ' + member.user + ' left the Conglomerate.' + System.lineSeparator() + 'Only ' + (guild.memberCount - 1) + " guardians left.");
});


//REACT TO MESSAGES IN CHANNEL
client.on('message', message =>
{
    //TESTING INIT
    if (message.channel.type == "dm" && message.author.id != "301176884438368257")
    {
        var flat = [].concat.apply([], initializing);
        var col = flat.indexOf(message.author.id);
        var row = -1;
        if (col != -1) // found
        {
            if (initializing[col/2][1] == 0)
            {
                message.channel.sendMessage("Guardian ? This is the Conglomerate<s frequency. Your signal is very week...");
                message.channel.sendMessage("Guardian, do you copy ? Type `yes` if you can hear me. Type `no` if you can't... if that makes sense ?");
                initializing[col/2][1] += 1;
            }
            else if (initializing[col/2][1] == 1)
            {
                if (message.content.toLowerCase().toString() == "yes")
                {
                    message.channel.sendMessage("Awesome !");
                    initializing.splice(col/2, 1);
                }
                else if (message.content.toLowerCase().toString() == "no")
                {
                    message.channel.sendMessage("Wait... but then... how did you answer me ?");
                    message.channel.sendMessage("Come on you can do it, type `yes` if you copy");
                }
                else
                {
                    message.channel.sendMessage("I can't make sense of your signal Guardian.");
                    message.channel.sendMessage("Do you copy ? Please type `yes` if you do");
                }
            }
        }
        else
        {
            message.channel.sendMessage("yeah k");
        }
    }

    if (message.isMentioned("301176884438368257"))
    {
        //TESTING INIT
        if (message.content.toLowerCase().toString().includes('initialize'))
        {
            initializing.push([message.author.id, 0]);
            message.author.sendMessage('Does this work ?');
        }

        //Bot informs member of its status
        else if (message.content.toLowerCase().toString().includes('status'))
        {
            message.channel.send('I am learning how to initialize new members, ' + trump(message.member.displayName, " [") + "\nI am also working on a way to stock fireteams, to make it easier for you to plan upcoming games.");
        }

        //Bot does research in ishtar database
        else if (message.content.toLowerCase().toString().includes('search') && message.content.toLowerCase().toString().includes('ishtar'))
        {
            argString = arguments(message.content.toLowerCase().toString());
            if (argString.length === 0)
            {
                message.channel.send('I need some keywords to find lore entries Guardian. Please include `"keywords"` in your request.');
            }
            else
            {
                args = argString.split(" ");
                var keywords = args.length + 1;
                message.channel.send("I was given " + (keywords - 1) + " keywords. Here is what I found :");
                var search = '';
                while (keywords > 1)
                {
                    search += args[args.length - keywords + 1] + "-";
                    keywords -= 1;
                }
                message.channel.send('http://www.ishtar-collective.net/categories/' + search.substring(0, search.length - 1));
            }
        }

        //Bot manages fireteams
        else if (message.content.toLowerCase().toString().includes('fireteam'))
        {
            //planned_ops = message.channel.lastMessageID;
            //CREATE
            if (message.content.toLowerCase().toString().includes('new'))
            {
                argString = arguments(message.content.toLowerCase().toString());
                if (argString.length <= 0)
                {
                    message.channel.send('I need a fireteam name Guardian. Please include `new, fireteam, "fireteam name"` in your request.');
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
                    fireteamName.substring(0, fireteamName.length - 1);
                    //TEST
                    /*if (planned_ops == null)
                    {
                        planned_ops = message.member.guild.channels.get('315332691576750080').send(fireteamName + ".txt" + ' \n' + message.member.displayName.toString() + ' \n').id;
                    }
                    else
                    {
                        message.planned_ops.edit("Is it working ?");
                    }*/
                    plannedOperations('334875452554608640', "Edited that fucker");
                    message.channel.send('The fireteam "' + fireteamName + '" has been created !');
                    
                    /*fs.writeFile("fireteams/-" + fireteamName + ".txt", message.member.displayName.toString() + ' \n', function (err)
                    {
                        if (err)
                        {
                            message.channel.send('Hum... Not sure what happened, but I was not able to create your fireteam...')
                        }
                        else
                        {
                            message.channel.send('Your fireteam "' + fireteamName + '" has been created !');
                        }
                    });*/
                }
            }
            //JOIN
            else if (message.content.toLowerCase().toString().includes('join')) {
                argString = arguments(message.content.toLowerCase().toString());
                if (argString.length <= 0)
                {
                    message.channel.send('You need a fireteam to join a fireteam. Please include `join, fireteam, "fireteam name"` in your request.');
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
                                message.channel.send('Something went wrong...')
                            }
                            if (data.indexOf(message.member.displayName.toString()) >= 0)
                            {
                                message.channel.send('Looks like you already joined that fireteam, here is the current roster :')
                                fs.readFile("fireteams/-" + fireteamName + ".txt", 'utf8', function (err, data)
                                {
                                    if (err)
                                    {
                                        message.channel.send('Hum... well I think you joined but I cannot find it... weird.')
                                    }
                                    message.channel.send(data);
                                    message.channel.send('Anyway, I will not tell the others that you had forgotten about it, do not worry.')
                                });
                            }
                            else
                            {
                                fs.appendFile("fireteams/-" + fireteamName + ".txt", message.member.displayName.toString() + '\n', function (err)
                                {
                                    if (err)
                                    {
                                        message.channel.send('Hum... I could not add you to the fireteam...')
                                    }
                                    message.channel.send('You joined "' + fireteamName + '" !');
                                });
                            }
                        });
                    }
                    else
                    {
                        message.channel.send('Hum... I was not able to find your fireteam...')
                    }
                }
            }
            //DELETE
            else if (message.content.toLowerCase().toString().includes('delete'))
            {
                argString = arguments(message.content.toLowerCase().toString());
                if (argString.length <= 0) {
                    message.channel.send('I need a fireteam name to be able to delete it. Please include `delete, fireteam, "fireteam name"` in your request.');
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
                        message.channel.send('Your fireteam "' + fireteamName + '" has been deleted !');
                    }
                    else
                    {
                        message.channel.send('Did you just tell me to delete a fireteam that does not exist ?')
                    }
                }
            }
            //UNCOMPLETE COMMAND
            else
            {
                message.channel.send('Did you say something guardian ? Add `new`, `join`, `delete` or `show` to your fireteams request.')
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
            message.channel.send(jokes[i]);
        }

        //Bot is mentionned but no command is given
        else
        {
            message.channel.send('How can I help you, ' + trump(message.member.displayName, " ["));
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
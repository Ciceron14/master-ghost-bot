const Discord = require('discord.js');
const client = new Discord.Client();

var fs = require('fs');

var initializing = [];

//Guild info
var guildID = "292076742355451904";
var ghostID = "301176884438368257";

//Channels
var open_broadcastID = "292076742355451904";
var planned_operationsID = "315332691576750080";
var tactical_roundtableID = "315704892906012674";
var public_frequencyID = "296718956545441794";
var space_nonsenseID = "315561936668590081";
var test_channelID ="301180453883478016";

//Roles
var meme_available = "339897537584693258";

//Stuff
var stuff1 = 'MzAxMTc2ODg0NDM4MzY4MjU3';
var stuff2 = 'FJrFvqEU1GhFxNYTP-q3FZ6U';
var stuff3 = '.DHPAZA.74_';

//Saved Data
var users_info ={
   id: [{name: string, psn: string}],
};




//FUNCTIONS
function addUser(memberid, name)
{
    if (users_info.hasOwnProperty(id))
    {
        return(false);
    }
    else
    {
        users_info.push(memberid);
        users_info.memberid.push(realName(name), psnID(name));
        return(true);
    }
}

function realName(str)
{
    var pattern = " [";
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

function psnID(str)
{
    var start_pos = str.indexOf('[') + 1;
    var end_pos = str.indexOf(']', start_pos);
    return str.substring(start_pos, end_pos);
}

function arguments(str)
{
    var start_pos = str.indexOf('"') + 1;
    var end_pos = str.indexOf('"', start_pos);
    return str.substring(start_pos, end_pos);
}

function findFireteam(ID, str)
{
    client.channels.get('315332691576750080').fetchPinnedMessages()
        .then(messages => console.log(`Received ${messages.size} messages`))//message.edit(message.content + str))
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
    guild.channels.get(public_frequencyID).send("I'm receiving signals... I think it's a guardian !");
    guild.channels.get(public_frequencyID).send("I'll try to initialize them");

    initializing.push([member.id, 1]);
    member.sendMessage("Guardian ? This is the Conglomerate's frequency. Your signal is very weak...");
    member.sendMessage("Guardian, do you copy ? Type `yes` if you can hear me. Type `no` if you can't... if that makes sense ?");
});

client.on('guildMemberRemove', member =>
{
    let guild = member.guild;
    guild.channels.get(public_frequencyID).send('Guardian down ! ' + member.user + ' left the Conglomerate.\nOnly ' + (guild.memberCount - 1) + " guardians left.");
});








//REACT TO MESSAGES IN CHANNEL
client.on('message', message =>
{
    //MEMES AND ALL
    if (message.channel.id == space_nonsenseID)
    {
        client.guilds.get(guildID).members.get(message.author.id).hoistRole
        //var rolesList = [].concat.apply([], client.guilds.get("292076742355451904").members.get(message.author.id).roles)
        if (client.guilds.get(guildID).members.get(message.author.id).roles.has(meme_available))
        {
            client.guilds.get(guildID).members.get(message.author.id).removeRole(meme_available);
        }
        else
        {
            message.delete();
            message.author.sendMessage("Wait until you have a new meme available, check your roles");
        }

        //Bot tells a destiny pun
        if (message.content.toLowerCase().toString().includes('pun') || message.content.toLowerCase().toString().includes('joke'))
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

    }







    //DIRECT & INIT
    if (message.channel.type == "dm" && message.author.id != ghostID)
    {
        var flat = [].concat.apply([], initializing);
        var col = flat.indexOf(message.author.id);
        var row = -1;
        if (col != -1) // found
        {
            if (initializing[col/2][1] == 1) //FIRST CONTACT + ASK FOR NAME
            {
                if (message.content.toLowerCase().toString() == "yes")
                {
                    message.channel.sendMessage("Awesome ! Guardian, I need to know your PSN ID and how you want to be called by the members of the Conglomerate.");
                    message.channel.sendMessage("Please, type them like this: `NAME [PSN ID]`... Do not type anything else !");
                    initializing[col/2][1] += 1;
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

            else if (initializing[col/2][1] == 2) //RECEIVE NAME + ASK FOR CLAN OR ALLY
            {
                if (message.content.toString().includes(" [") && message.content.toString().includes("]") && message.content.toString().length >= 7)
                {
                    message.channel.sendMessage("Got it. I'm entering it in the database.");
                    client.guilds.get("292076742355451904").members.get(message.author.id).setNickname(message.content.toString());
                    message.channel.sendMessage("Why did you contact us ? Do you want to join our clan or do you just come as an ally from another clan / solo player ?");
                    initializing[col/2][1] += 1;
                }
                else
                {
                    message.channel.sendMessage("Wait... that doesn't sound right...");
                    message.channel.sendMessage("Please, type them exactly like this: `NAME [PSN ID]`...");
                }
            }

            else if (initializing[col/2][1] == 3) //RECEIVE CLAN OR ALLY + END
            {
                if (message.content.toLowerCase().toString().includes("clan") && (message.content.toLowerCase().toString().includes("ally") || message.content.toLowerCase().toString().includes("solo")))
                {
                    message.channel.sendMessage("You signal is weak Guardian... all your keywords are getting mixed up togeter...");
                    message.channel.sendMessage("Try to type `clan` or `ally` depending on why you contacted us !");
                }
                else if (message.content.toLowerCase().toString().includes("clan"))
                {
                    message.channel.sendMessage("Sweet ! I will let the command know !");
                    message.channel.sendMessage("Well, you're all set. I opened up the public channel, contact the Command to join the clan !");
                    client.guilds.get("292076742355451904").members.get(message.author.id).addRole("328988528543531021");
                    initializing.splice(col/2, 1);
                }
                else if (message.content.toLowerCase().toString().includes("ally") || message.content.toLowerCase().toString().includes("solo"))
                {
                    message.channel.sendMessage("Got it ! I will tell the others. Please contact the command if you are the leader of your own clan.");
                    client.guilds.get("292076742355451904").members.get(message.author.id).addRole("300841294010253312");
                    message.channel.sendMessage("Well, you're all set. I opened up the Conglomerate channels for you !");
                    client.guilds.get("292076742355451904").members.get(message.author.id).addRole("328988528543531021");
                    initializing.splice(col/2, 1);
                }
                else
                {
                    message.channel.sendMessage("You signal is weak Guardian... I need keywords so I can make sure I understand...");
                    message.channel.sendMessage("Try to type `clan` or `ally` depending on why you contacted us !");
                }
            }

            else 
            {
                message.channel.sendMessage("Ah... Something went wrong... please contact the Command.");
                initializing.splice(col/2, 1);
            }
        }
        else if(message.content.toLowerCase().toString().includes("add"))
        {
            if (addUser(message.member.displayName) == true)
                message.channel.sendMessage("Added you to the database");
            else
                message.channel.sendMessage("You're already in the database")
        }
        else
        {
            message.channel.sendMessage("What is up Guardian ?");
        }
    }







    if (message.isMentioned(ghostID))
    {

        //Bot informs member of its status
        if (message.content.toLowerCase().toString().includes('status'))
        {
            message.channel.send('I can now initialize new members, ' + realName(message.member.displayName) + "\nI am also working on a way to stock fireteams, to make it easier for you to plan upcoming games.");
        }







        //TACTICS AND KNOWLEDGE
        if(message.channel.id == tactical_roundtableID)
        {
            //Bot does research in ishtar database
            if (message.content.toLowerCase().toString().includes('search') && message.content.toLowerCase().toString().includes('ishtar'))
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
        }
        
        






        //LFG AND OPERATIONS
        if(message.channel.id == planned_operationsID)
        {
            //CREATE
            if (message.content.toLowerCase().toString().includes('new') || message.content.toLowerCase().toString().includes('create'))
            {
                argString = arguments(message.content.toLowerCase().toString());
                if (argString.length <= 0)
                {
                    message.channel.send('I need a fireteam name Guardian. Please include `new *or* create *+* "fireteam name"` in your request.');
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

                    //findFireteam('334875452554608640', "Edited that fucker");
                    message.channel.send('Fireteam: ' + fireteamName + '\n- ' + psnID(message.member.displayName));
                    
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
                    message.channel.send('You need a fireteam to join a fireteam. Please include `join *+* "fireteam name"` in your request.');
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
                if (argString.length <= 0) 
                {
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
        






        //Bot is mentionned but no command is given
        else
        {
            message.channel.send('How can I help you, ' + realName(message.member.id, message.member.displayName));
        }
    }
});





//add bot to server = https://discordapp.com/oauth2/authorize?client_id=301176884438368257&scope=bot
//bot client id = 301176884438368257
client.login(stuff1 + stuff3 + stuff2);
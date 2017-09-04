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
var group_activitiesID = "302145708939542529";
var tactical_roundtableID = "315704892906012674";
var public_frequencyID = "296718956545441794";
var space_nonsenseID = "315561936668590081";
var conglomerate_history = "352493075374931969";
var test_channelID ="301180453883478016";

//Roles
var initialized = "328988528543531021";
var allies  = "300841294010253312";
var conglomerate = "292077959894794241";
var in_trial = "";
var meme_available = "339897537584693258";

//Stuff
var owner = "157300578706259968";
var stuff1 = 'MzAxMTc2ODg0NDM4MzY4MjU3';
var stuff2 = 'FJrFvqEU1GhFxNYTP-q3FZ6U';
var stuff3 = '.DHPAZA.74_';

//Dictionnaries
var jokes = [
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

//Saved Data
//var users_data = fs.readFileSync("./data/users_info.json");
//var users_info = JSON.parse(fs.readFileSync("data/users_info.json", 'utf8'));




//FUNCTIONS
function saveData(filePath, dataToSave)
{
    var strData = JSON.stringify(dataToSave, null, 2);
    fs.writeFile(filePath, strData, finished);

    function finished(err)
    {
        console.log('saved new data');
    }
}

function pickLine(dictionnary)
{
    i = Math.floor(Math.random() * (dictionnary.length));
    return(dictionnary[i]);
}

function addUser(memberid, name)
{
    var results = [];
    var searchField = "id";
    var searchVal = memberid;
    for (var i=0 ; i < users_info.length ; i++)
    {
        if (users_info[i][searchField] == searchVal) {
            results.push(users_info[i]);
        }
    }
    if(results.length != 0)
    {
        return(false);
    }
    else
    {
        users_info.push({"id": memberid, "name": realName(name), "psn": psnID(name)});
        saveData("data/users_info.json", users_info);
        return(true);
    }
}

function realName(str)
{
    var start_pos = 0;
    var end_pos = str.indexOf(' [', start_pos);
    return str.substring(start_pos, end_pos);
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
    var end_pos = str.lastIndexOf('"');
    return str.substring(start_pos, end_pos);
}

function hasReacted(message, user)
{
    reactions = message.reactions;
    reactions.forEach(function(element) {
        if (element.toString() == user.id)
            {
                return(true);
            }
    }, this);
    return(false);
}

function addToFireteam(message, user, reaction)
{
    var toAdd = psnID(client.guilds.get(guildID).members.get(user.id).nickname);
    if (hasReacted(message, user))
        {
            reaction.remove(user);
        }
    else if(message.toString().indexOf(toAdd) < 0)
        {
            message.edit(message.content + "\n- " + toAdd);
        }
}

function removeFromFireteam(message, user)
{
    if(hasReacted(message, user) == false)
        {
            var toRemove = "\n- " + psnID(client.guilds.get(guildID).members.get(user.id).nickname);
            var newFireteam = message.toString().replace(toRemove,'');
            message.edit(newFireteam);
            if(message.content.toString().indexOf("Members:** \n- ") == -1)
                {
                    setTimeout(function () 
                    {
                        if (message.content.toString().indexOf("Members:** \n- ") == -1)
                            {
                                message.delete();
                            }
                    }, 10000);
                }
        }
}




client.on('ready', () =>
{
    console.log('Ghost is online');
    client.guilds.get(guildID).channels.get(planned_operationsID).fetchMessages();
    client.guilds.get(guildID).fetchMembers();
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




//REACT TO NEW REACTIONS
client.on("messageReactionAdd", (messageReaction, user) =>
{
    //FIRETEAMS
    if(messageReaction.message.channel.id == planned_operationsID)
        {
            //Joined Fireteam
            if(messageReaction.emoji.name.toString()[0] == "_")
                {
                    addToFireteam(messageReaction.message, user, messageReaction)
                }
        }
})

//REACT TO DELETED REACTIONS
client.on("messageReactionRemove", (messageReaction, user) =>
{
    //FIRETEAMS
    if(messageReaction.message.channel.id == planned_operationsID)
        {
            //Left Fireteam
            if(messageReaction.emoji.name.toString()[0] == "_")
                {
                    removeFromFireteam(messageReaction.message, user)
                }
        }
})




//REACT TO MESSAGES IN CHANNEL
client.on('message', message =>
{
    //MEMES AND ALL
    if (message.channel.id == space_nonsenseID)
    {
        if (client.guilds.get(guildID).members.get(message.author.id).roles.has(meme_available))
        {
            client.guilds.get(guildID).members.get(message.author.id).removeRole(meme_available);
            message.react(":caydethumbsup:354293197742276608");
        }
        else if(message.author.id != owner)
        {
            message.delete();
            message.author.sendMessage("You already posted a meme for this contest... How are you still talking ??");
        }

        if(message.author.id == owner && message.isMentioned(ghostID))
        {
            var membersList = client.guilds.get(guildID).members;
            console.log(membersList);
            if(message.content.toLowerCase().toString().includes("start") || message.content.toLowerCase().toString().includes("new") || message.content.toLowerCase().toString().includes("open"))
            {
                for(key in membersList)
                {
                    console.log(member + " hum");
                    client.guilds.get(guildID).members.get(key).addRole(meme_available);
                }
            }

            else if(message.content.toLowerCase().toString().includes("end") || message.content.toLowerCase().toString().includes("over") || message.content.toLowerCase().toString().includes("stop"))
            {
                for(key in membersList)
                {
                    client.guilds.get(guildID).members.get(key).removeRole(meme_available);
                }
            }
        }


        //Bot tells a destiny pun
        if (Math.random() < 0.05)
        {
            message.channel.send(pickLine(jokes));
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
                    client.guilds.get(guildID).members.get(message.author.id).setNickname(message.content.toString());
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
                    message.channel.sendMessage("Well, you're all set. I opened up the Conglomerate channels, go meet the members, if they vote for you you'll join the clan !");
                    client.guilds.get(guildID).members.get(message.author.id).addRole(in_trial);
                    client.guilds.get(guildID).members.get(message.author.id).addRole(initialized);
                    initializing.splice(col/2, 1);
                }
                else if (message.content.toLowerCase().toString().includes("ally") || message.content.toLowerCase().toString().includes("solo"))
                {
                    message.channel.sendMessage("Got it ! I will tell the others. Please contact the command if you are the leader of your own clan.");
                    client.guilds.get(guildID).members.get(message.author.id).addRole(allies);
                    message.channel.sendMessage("Well, you're all set. I opened up the Conglomerate channels for you !");
                    client.guilds.get(guildID).members.get(message.author.id).addRole(initialized);
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
            if (addUser(message.author.id, client.guilds.get(guildID).members.get(message.author.id).displayName) == true)
                message.channel.sendMessage("Added you to the database" + users_info.toString());
            else
                message.channel.sendMessage("You're already in the database" + users_info.toString())
        }
        else
        {
            message.channel.sendMessage("What is up Guardian ?");
        }
    }



    if (message.channel.type == "dm" && message.author.id == owner)
    {
        console.log("Ciceron is talking")
        var channelToUseID = "undefined";
        if (message.content.toLowerCase().toString().includes(open_broadcastID))
        {
            channelToUseID = open_broadcastID;
        }
        if (message.content.toLowerCase().toString().includes(planned_operationsID))
        {
            channelToUseID = planned_operationsID;
        }
        if (message.content.toLowerCase().toString().includes(group_activitiesID))
        {
            channelToUseID = group_activitiesID;
        }
        if (message.content.toLowerCase().toString().includes(tactical_roundtableID))
        {
            channelToUseID = tactical_roundtableID;
        }
        if (message.content.toLowerCase().toString().includes(public_frequencyID))
        {
            channelToUseID = public_frequencyID;
        }
        if (message.content.toLowerCase().toString().includes(space_nonsenseID))
        {
            channelToUseID = space_nonsenseID;
        }

        if (channelToUseID != "undefined")
        {
            var ping = "";
            if (message.content.toLowerCase().toString().includes("ping"))
            {
                ping = "<\@everyone> \n"
            }
            client.guilds.get(guildID).channels.get(channelToUseID).send(ping + arguments(message.content.toString()));
        }
    }



    if (message.isMentioned(ghostID))
    {

        //Bot informs member of its status
        if (message.content.toLowerCase().toString().includes('status'))
        {
            message.channel.send('Fireteams are ready ' + realName(message.member.displayName) + "\nI am now working on a way to implemnt memes contests");
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
        if(message.channel.id == group_activitiesID)
        {
            //CREATE
            if (message.content.toLowerCase().toString().includes('new') || message.content.toLowerCase().toString().includes('create'))
            {
                argString = arguments(message.content.toString());
                if (argString.length <= 0)
                {
                    message.channel.send('I need a description Guardian. Please include `new *or* create *+* "description of what you will be doing"` in your request.');
                }
                else
                {
                    args = argString.split(" ");
                    var keywords = args.length + 1;
                    var description = '';
                    while (keywords > 1)
                    {
                        description += args[args.length - keywords + 1] + " ";
                        keywords -= 1;
                    }
                    description.substring(0, description.length - 1);
                    message.guild.channels.get(planned_operationsID).send('**Fireteam:\n**' + description + "**\nMembers:** \n- " + psnID(message.member.displayName));
                    message.channel.send("I have created your fireteam.\nYou can go select your subclass by reacting to the fireteam in <#315332691576750080> !")
                }
            }
            //UNCOMPLETE COMMAND
            else
            {
                message.channel.send('Did you say something guardian ? Add `new`, `join`, `delete` or `show` to your fireteams request.')
            }
        }
        






        //Bot is mentionned but no command is given
        else if(message.author.id != owner)
        {
            message.channel.send('How can I help you, ' + realName(message.member.id, message.member.displayName));
        }
    }
});





//add bot to server = https://discordapp.com/oauth2/authorize?client_id=301176884438368257&scope=bot
//bot client id = 301176884438368257
client.login(stuff1 + stuff3 + stuff2);
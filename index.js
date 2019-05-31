const Discord = require('discord.js');
const moment = require("moment");

const bot = new Discord.Client();

/// TODO figure out way to dynamically get this bot id
const bot_id = "431193264633151499"

const TOKEN = 'NDMxMTkzMjY0NjMzMTUxNDk5.DqATYg.QQDETF7ZbDA5yWto4UGDKQBd3qg';
const pre = '%';
const dev = '275150435072081920';


let ping;
let message;
let epn;
let E;
let P;
let N;
let g;

bot.on('message', function (message) {

    let user_id = message.member.toString().split("@")[1].split(">")[0];
    // exclude message from bot
    if (user_id !== bot_id) {
        // DB CHECK HERE

        // GET User info
        bot.fetchUser(user_id)
            .then((user) => {

                let user_object = {
                    user_id: user.id,
                    user_name: user.username,
                    is_bot: user.bot,
                    is_verified: user.verified,
                    phone_verification: user.mfa_enabled,
                    nitro: user.premium_type,
                    joined_on: user.createdAt,
                    trust: 40
                };

                // creaete moment object from joined on
                let joined_on = moment(user_object.joined_on);

                // get human readable age ie 10 days ago
                let account_age_human = joined_on.fromNow();

                // get account age in days
                let account_age = moment().diff(user_object.joined_on, "days") 


                if (user_object.is_verified !== true) {
                    user_object.is_verified = false;
                }
                if (user_object.phone_verification !== true) {
                    user_object.phone_verification = false;
                }

                if (user_object.is_verified == true) {
                    E = 1;
                } else {
                    E = -1;
                }

                if (user_object.phone_verification == true) {
                    P = 1;
                } else {
                    P = -1;
                }

                N = user_object.nitro
                if (N === undefined){
                    N = 0
                }
                console.log(user_object);
                //g = (new Date().getTime() - user_object.joined_timestamp);
                //console.log(g);
                //g = g/86400
                //g = Math.cbrt(g)

                epn = 5 * E * P * N;

                //user_object.trust = 40 + g + epn;
                console.log(E);
                console.log(P);
                console.log(N);
                //console.log(g);

                //%Trust
                if (message.content === pre + 'Trust') {
                    if (user_object.trust < 5) {
                        message.channel.sendMessage('https://cdn.discordapp.com/attachments/583446347932368907/583446616455905320/Meter0.png');
                    } else if (user_object.trust < 15) {
                        message.channel.sendMessage('https://cdn.discordapp.com/attachments/583446347932368907/583446642657591306/Meter10.png');
                    } else if (user_object.trust < 25) {
                        message.channel.sendMessage('https://cdn.discordapp.com/attachments/583446347932368907/583446663956267067/Meter20.png');
                    } else if (user_object.trust < 35) {
                        message.channel.sendMessage('https://cdn.discordapp.com/attachments/583446347932368907/583446692129406981/Meter30.png');
                    } else if (user_object.trust < 45) {
                        message.channel.sendMessage('https://cdn.discordapp.com/attachments/583446347932368907/583446716616015913/Meter40.png');
                    } else if (user_object.trust < 55) {
                        message.channel.sendMessage('https://cdn.discordapp.com/attachments/583446347932368907/583446751978192899/Meter50.png');
                    } else if (user_object.trust < 65) {
                        message.channel.sendMessage('https://cdn.discordapp.com/attachments/583446347932368907/583446774384164874/Meter60.png');
                    } else if (user_object.trust < 75) {
                        message.channel.sendMessage('https://cdn.discordapp.com/attachments/583446347932368907/583446795623858176/Meter70.png');
                    } else if (user_object.trust < 85) {
                        message.channel.sendMessage('https://cdn.discordapp.com/attachments/583446347932368907/583446820919705601/Meter80.png');
                    } else if (user_object.trust < 95) {
                        message.channel.sendMessage('https://cdn.discordapp.com/attachments/583446347932368907/583446856319762453/Meter90.png');
                    } else {
                        message.channel.sendMessage('https://cdn.discordapp.com/attachments/583446347932368907/583446920786083860/Meter100.png');
                    }
                    message.reply(user_object.trust);
                }
                //%About
                if (message.content === pre + 'About') {
                    message.channel.sendMessage('DeltaBot : Does nothing yet');
                }

                //%Invite
                if (message.content === pre + 'Invite') {
                    message.channel.sendMessage('https://discordapp.com/api/oauth2/authorize?client_id=431193264633151499&scope=bot&permissions=1');
                }

                // %Ping
                if (message.content === pre + 'Ping') {

                    //

                    console.log("Connected to user {0}", user);

                    ping = -1 * (new Date().getTime() - message.createdTimestamp);
                    message.reply('Pong ' + ping + ' ms');
                }

                //%Me
                if (message.content === pre + 'Me') {
                    message.reply(user_object.user_name);
                }

                //%ID
                if (message.content === pre + 'ID') {
                    message.reply(user_object.user_id);
                }

                //%VerifiedEmail
                if (message.content === pre + 'Verified') {
                    if (user_object.is_verified === true) {
                        message.reply(user_object.is_verified);
                    } else {
                        message.reply(user_object.is_verified);
                        user_object.is_verified = false
                        message.reply(user_object.is_verified);
                    }
                }

                //%VerifiedPhone
                if (message.content === pre + 'VerifiedPhone') {

                }






            })
            .catch((err) => {
                message.channel.sendMessage("error:", err);
            })
    }



});

function VerifiedEmail() {

}

function VerifiedPhone() {

}
bot.login(TOKEN);
/*


REQUIRED FOR CORE FUNCTION

Variables Needed (From User)

User ID
Username
Servers that the user has been on with this bot
Amount of unique Servers user has been banned off of with this bot
Amount of unique Servers the user has been kicked or muted on with this bot
Day account was first found on a server with the bot
Whether or not the user has discord nitro
Whether or not the user has a verified email
Whether or not the user has a verified phone number
Warnings user has recieved on each server

Commands/functions Needed

%Help - Shows all commands
%Score Self - Outputs Trust level of User
%Score [User] - Outputs Trust level of [User}

Moderator Commands

%Ban [User] (Reason) - Bans User from server, adds the ban to their score, and the offender can receive a Direct message with the reason
%Kick [User] (Reason) - Kicks user from server, and  adds the kick to their score
%Mute [User] (Reason) (Time) - Mutes user for (Time) minutes, and adds the mute to their score
%Warn [User] (Reason) - Warns the user via direct message, no punishment
%Prohibit (Integer) - Prohibits anybody below (Integer) points of trust from entering the server
%ViewWarnings [User] - See if the user has recieved any warning before to prevent moderators from forgetting who they warned


COMMEND AND CONDEMN

Variables Needed (From User)

Amount of commends Recieved
Amount of condemns Recieved


Commands/functions Needed

%Commend [User] - Gives a commend to the user, slightly boosting their score
%Condemn [User] - Gives a condemn to the user, slightly lowering their score


*/

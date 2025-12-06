# lraj23 Self Bot

### Main Purpose

The main purpose of this bot is to permit me to easily do various tasks, or to automate other things, etc. as a generic self bot would do. If I use text commands like /echo, --as-self/echo, @channel, etc. the bot will respond to them in various ways, including taking actions as me.

### Demo Video

Since this bot is only supposed to be usable by me, I have included a 4 minute demo video where I use all of the bot's features as of that point in time. The title of the video is `lraj23-self-bot.mkv`, and it is about 83 megabytes. You can also try [this link](https://hackclub.enterprise.slack.com/files/U0947SL6AKB/F0A1RHAAK2N/lraj23-self-bot.mkv) in my channel to avoid downloading. The video consists of me using the /echo, --as-self/echo, @channel, @here, channel welcoming, and /winter features in that order (though I only @here ping and not @channel ping to reduce pings).

If you still have questions about the bot at all, just join [#lraj23-bot-testing](https://www.hackclub.enterprise.slack.com/archives/C09GR27104V) and ask me! I can demonstrate certain features live, take extra screen recordings, or just answer questions (as long as my local time is between 3PM and 11PM :skulk:)!

### Commands

In my bot, most commands are through text, where I send a message that includes a keyword, and then my bot deletes the original message (most of the time) and performs an action. Therefore, none of the below are commands, even if they appear to be, except for /lraj23-help. Additionally, whenever someone joins [#lraj23-bot-testing](https://www.hackclub.enterprise.slack.com/archives/C09GR27104V), [#lraj23s-lavish-abode](https://hackclub.enterprise.slack.com/archives/C09KUCDAXFE), or [my tier 2 personal channel (private)](https://hackclub.enterprise.slack.com/archives/C09RMSA9L2K), the bot greets them with a welcome message through my account then notifies me. It also asks the person who joined why they joined.

#### @channel
If any message I send in _any_ channel includes the text "@channel" my bot will automatically delete my message and replace it with the same message but with an actual channel ping. If my message includes "\\@channel" then my message does not get converted (this is so that I can say "@channel" without actually pinging, which could be disastrous). Also, including "\\@here" in a message automatically escapes any pings in it, including an otherwise nonescaped @channel ping.

#### @here
This works just the same as the above channel ping except with @here pings. Additionally, including "\\@here" does in fact escape the ping. Also, including "\\@channel" in a message automatically escapes any pings in it, including an otherwise nonescaped @here ping.

#### /echo
Including the text "/echo" in any message I send in any channel will result in the bot echoing my message. It will automatically delete my original message and respond with a message that says the same as I did but without "/echo". This can be escaped similarly to above with "\\/echo" if I want to mention the command without using. Also, if the bot is not in the channel, and it is private or otherwise unaccessible with the scope `chat.write:public` then the bot will automatically add itself before responding.

#### --as-self
If the message is already going to be echoed by the above method (so it must include "/echo"), but my message also includes "--as-self" then instead of my bot responding it will respond using my account, making it appear as though I simply deleted and resent the message edited. This can be useful for things like converting text to pings.

#### /winter
If a message includes "/winter" and is not escaped with "\/winter" the bot will automatically delete my original message. It will then make an AI request to generate a version of my message that is winter-themed. It prompts me if I want to use that, and if I do, it automatically sends that as me. If I don't like it and want to regenerate, I can also do that with one click. Finally, I can also just cancel sending the message.

#### /lraj23-help
This command gives some information about this bot, but isn't really useful.

### Links, Channels, etc.

The dedicated channel for testing this bot is [#lraj23-bot-testing](https://hackclub.enterprise.slack.com/archives/C09GR27104V), though it can only be used by me as of now. The GitHub repo is literally [right here](https://www.github.com/lraj23/lraj23-self-bot). My Hackatime project for this bot is called lraj23-self-bot.

### Demo Video Test

Does the demo video appear?

[Demo Video](https://raw.githubusercontent.com/lraj23/lraj23-self-bot/refs/heads/main/lraj23-self-bot.mp4)
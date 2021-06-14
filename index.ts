//Environnement variable
import * as dotenv from "dotenv";

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

import * as Discord from "discord.js";

// Creating a discord client
const client = new Discord.Client();

// We need to run it just one time and when the client is ready
// Because then it will get undefined if the client isn't ready
client.once("ready", (): void => {
  if (client == null) throw "Client undefined";
  const name = client?.user?.tag;
  console.log(`Online as ${name}`);

  if (
    process.env.GUILD == undefined ||
    process.env.CHANNEL == null ||
    process.env.MESSAGE == null
  )
    throw "wrong environnement variable, please see .env.example";

  const guild = client.guilds.cache.get(process.env.GUILD);
  if (guild == null) throw "Guild undefined";

  const channel = guild.channels.cache.get(process.env.CHANNEL);
  const Message = process.env.MESSAGE;
  if (channel == null || channel.type !== "text") throw "Channel undefined";

  (channel as Discord.TextChannel)
    .send(Message)
    .then(() => client.destroy())
    .catch((e) => console.error("send error : ", e));
});

if (process.env.TOKEN == null)
  throw "wrong environnement variable, please see .env.example";

client
  .login(process.env.TOKEN)
  .then(() => {
    console.log("bot correctly logged");
  })
  .catch((e) => console.error("login error : ", e));

// You could also make a command to pause and resume the job

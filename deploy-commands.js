const {
    REST,
    Routes,
    SlashCommandBuilder
} = require("discord.js");
require("dotenv").config();

const commands = [
    new SlashCommandBuilder()
    .setName("runningtext")
    .setDescription("Menampilkan running text LED")
    .addStringOption(option =>
        option.setName("text")
        .setDescription("Teks yang ingin ditampilkan")
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName("warna")
        .setDescription("Pilih warna LED")
        .addChoices({
            name: "Merah",
            value: "red"
        }, {
            name: "Hijau",
            value: "green"
        })
        .setRequired(true)
    )
].map(cmd => cmd.toJSON());

const rest = new REST({
        version: "10"
    })
    .setToken(process.env.DISCORD_TOKEN);

rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
            body: commands
        }
    )
    .then(() => console.log("Slash command berhasil di-upload (GUILD)"))
    .catch(console.error);
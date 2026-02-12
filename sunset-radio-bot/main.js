require("dotenv").config();
const {
    spawn
} = require("child_process");
const fs = require("fs");
const {
    Client,
    GatewayIntentBits,
    SlashCommandBuilder,
    Routes,
    REST,
} = require("discord.js");
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus,
    NoSubscriberBehavior,
    StreamType,
} = require("@discordjs/voice");

const radios = JSON.parse(fs.readFileSync("data/radios.json", "utf8"));
const bot = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

let connection, player;
let currentRadio = null;
let currentStreamTitle = null;
let currentGenre = null;

// ==================== REGISTER COMMANDS ====================
const commands = [
    new SlashCommandBuilder()
    .setName("list-radio")
    .setDescription("🎶 Lihat daftar radio yang tersedia"),
    new SlashCommandBuilder()
    .setName("play-radio")
    .setDescription("▶️ Putar salah satu radio dari daftar")
    .addIntegerOption((opt) =>
        opt
        .setName("id")
        .setDescription("ID radio dari /list-radio")
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName("info-radio")
    .setDescription("ℹ️ Lihat info radio yang sedang diputar"),
    new SlashCommandBuilder()
    .setName("stop-radio")
    .setDescription("⏹️ Hentikan radio dan keluar dari voice channel"),
];

// const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
// (async () => {
//   try {
//     console.log("⏳ Registering slash commands...");
//     await rest.put(
//       Routes.applicationGuildCommands(
//         (
//           await rest.get(Routes.user())
//         ).id,
//         process.env.GUILD_ID
//       ),
//       { body: commands }
//     );
//     console.log("✅ Slash commands registered!");
//   } catch (err) {
//     console.error(err);
//   }
// })();

const rest = new REST({
    version: "10"
}).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log("⏳ Registering global slash commands...");
        const app = await rest.get(Routes.user());
        await rest.put(Routes.applicationCommands(app.id), {
            body: commands
        });
        console.log("✅ Global commands registered!");
        console.log("⚠️ Perlu waktu ±1–2 menit agar muncul di semua server.");
    } catch (err) {
        console.error("❌ Error register command:", err);
    }
})();

// ==================== MAIN LOGIC ====================
bot.once("ready", () => {
    console.log(`📻 Sunset Brew Radio aktif sebagai ${bot.user.tag}`);
});

bot.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    // ===== /list-radio =====
    if (interaction.commandName === "list-radio") {
        const {
            EmbedBuilder
        } = require("discord.js");
        let desc = "";
        radios.forEach((r, i) => {
            desc += `\`${i + 1}\` — ${r.name}\n`;
        });

        const embed = new EmbedBuilder()
            .setColor("#1E90FF")
            .setTitle("📻 Daftar Radio Tersedia")
            .setDescription(desc)
            .setFooter({
                text: `Gunakan /play-radio id:<nomor> untuk memutar`
            });

        await interaction.reply({
            embeds: [embed]
        });
    }

    // ===== /play-radio =====
    // ===== /play-radio =====
    if (interaction.commandName === "play-radio") {
        const {
            EmbedBuilder
        } = require("discord.js");
        const id = interaction.options.getInteger("id");
        const radio = radios[id - 1];

        if (!radio) {
            const embed = new EmbedBuilder()
                .setColor("#FF5555")
                .setTitle("❌ ID radio tidak valid.")
                .setDescription(
                    "Silakan cek daftar radio dengan perintah `/list-radio`."
                );
            return interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        }

        const member = await interaction.guild.members.fetch(interaction.user.id);
        const vc = member.voice.channel;

        if (!vc) {
            const embed = new EmbedBuilder()
                .setColor("#FFAA00")
                .setTitle("🚫 Kamu belum join voice channel")
                .setDescription("Masuk dulu ke voice channel sebelum memutar radio!");
            return interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        }

        // Pesan awal
        const startEmbed = new EmbedBuilder()
            .setColor("#1E90FF")
            .setTitle("🎶 Memutar Radio")
            .setDescription(`Sedang menyiapkan stream untuk **${radio.name}**...`)
            .setFooter({
                text: "Mohon tunggu beberapa detik."
            });

        await interaction.reply({
            embeds: [startEmbed]
        });

        try {
            connection = joinVoiceChannel({
                channelId: vc.id,
                guildId: vc.guild.id,
                adapterCreator: vc.guild.voiceAdapterCreator,
            });

            await vc.guild.members.me.voice.setDeaf(true);

            if (player) player.stop();

            console.log("🎧 Streaming dari:", radio.url);

            const ffmpeg = spawn("ffmpeg", [
                "-reconnect",
                "1",
                "-reconnect_streamed",
                "1",
                "-reconnect_delay_max",
                "5",
                "-i",
                radio.url,
                "-vn",
                "-ar",
                "48000",
                "-ac",
                "2",
                "-b:a",
                "128k",
                "-f",
                "opus",
                "-c:a",
                "libopus",
                "pipe:1",
            ]);

            // Deteksi metadata dari FFmpeg
            ffmpeg.stderr.on("data", (data) => {
                const line = data.toString();
                console.log("[FFmpeg]", line);

                // 🔹 Deteksi judul lagu (StreamTitle)
                const titleMatch = line.match(/StreamTitle\s*:\s*(.*)/);
                if (titleMatch && titleMatch[1]) {
                    const title = titleMatch[1].trim();
                    if (title && title !== "N/A" && title !== currentStreamTitle) {
                        currentStreamTitle = title;
                        console.log(`🎵 Now Playing: ${title}`);
                    }
                }

                // 🔹 Deteksi genre (icy-genre)
                const genreMatch = line.match(/icy-genre\s*:\s*(.*)/i);
                if (genreMatch && genreMatch[1]) {
                    const genre = genreMatch[1].trim();
                    if (genre && genre !== "N/A") {
                        currentGenre = genre;
                        console.log(`🎼 Genre: ${genre}`);
                    }
                }

                // Jika ada perubahan metadata — update embed di Discord
                if (currentStreamTitle || currentGenre) {
                    const {
                        EmbedBuilder
                    } = require("discord.js");
                    const nowPlayingEmbed = new EmbedBuilder()
                        .setColor("#1E90FF")
                        .setTitle("📻 Sedang Memutar Radio")
                        .setDescription(`🎶 **${radio.name}**`)
                        .addFields(
                            currentStreamTitle ? {
                                name: "🎧 Lagu",
                                value: currentStreamTitle
                            } : {
                                name: "🎧 Lagu",
                                value: "Tidak tersedia"
                            },
                            currentGenre ? {
                                name: "🎼 Genre",
                                value: currentGenre
                            } : {
                                name: "🎼 Genre",
                                value: "Tidak tersedia"
                            }
                        )
                        .setFooter({
                            text: "Gunakan /info-radio untuk melihat detail radio.",
                        });

                    interaction.editReply({
                        embeds: [nowPlayingEmbed]
                    }).catch(() => {});
                }
            });

            player = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Play
                },
            });

            const resource = createAudioResource(ffmpeg.stdout, {
                inputType: StreamType.OggOpus,
                inlineVolume: true,
            });

            resource.volume.setVolume(0.8);
            player.play(resource);
            connection.subscribe(player);

            currentRadio = radio;
            currentStreamTitle = null;

            player.on(AudioPlayerStatus.Playing, async () => {
                console.log(`✅ Sekarang memutar: ${radio.name}`);

                const successEmbed = new EmbedBuilder()
                    .setColor("#1E90FF")
                    .setTitle("📻 Sedang Memutar Radio")
                    .setDescription(
                        `🎶 **${radio.name}**\n🔗 [Klik untuk buka stream](${radio.url})`
                    )
                    .setFooter({
                        text: "Gunakan /info-radio untuk melihat detail lagu saat ini.",
                    });

                await interaction.editReply({
                    embeds: [successEmbed]
                });
            });

            player.on("error", (err) => {
                console.error("❌ Player error:", err.message);
            });
        } catch (err) {
            console.error(err);

            const errorEmbed = new EmbedBuilder()
                .setColor("#FF5555")
                .setTitle("❌ Gagal Memutar Radio")
                .setDescription(
                    `Terjadi kesalahan saat mencoba memutar **${radio.name}**.`
                );

            interaction.followUp({
                embeds: [errorEmbed],
                ephemeral: true
            });
        }
    }

    // ===== /info-radio =====
    if (interaction.commandName === "info-radio") {
        if (!currentRadio) {
            return interaction.reply("❌ Tidak ada radio yang sedang diputar.");
        }

        const {
            EmbedBuilder
        } = require("discord.js");

        const embed = new EmbedBuilder()
            .setColor("#3498db")
            .setTitle("📻 Informasi Radio Saat Ini")
            .addFields({
                name: "🎶 Nama Radio:",
                value: currentRadio.name,
                inline: false
            }, {
                name: "🎧 Lagu:",
                value: currentStreamTitle || "Tidak ada metadata lagu.",
                inline: false,
            }, {
                name: "🎼 Genre:",
                value: currentGenre || "Tidak ada genre.",
                inline: false,
            })

            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });
    }

    // ===== /stop-radio =====
    if (interaction.commandName === "stop-radio") {
        if (player) player.stop();
        if (connection) {
            connection.destroy();
            connection = null;
        }
        currentRadio = null;
        currentStreamTitle = null;
        await interaction.reply(
            "⏹️ Radio dihentikan dan bot keluar dari voice channel."
        );
    }
});

bot.login(process.env.DISCORD_TOKEN);
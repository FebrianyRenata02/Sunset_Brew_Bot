// ---- Import Library ----

const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    PermissionsBitField,
    ChannelType,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");
require("dotenv").config();

// baca file .env


// Buat client bot
const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers // penting untuk member join/leave
    ],
});

// Event ketika bot online
bot.once("ready", () => {
    console.log(`✅ Bot sudah online sebagai ${bot.user.tag}`);
});

// Prefix bot
const prefix = "!";

// Event ketika pesan dibuat
bot.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    // COMMAND RULES
    if (message.content === `${prefix}rules`) {
        const rulesEmbed = new EmbedBuilder()
            .setColor("#ff8800")
            .setTitle("📜 Aturan Server Sunset Brew")
            .setDescription("Harap dibaca dengan baik sebelum mulai ngobrol 🍹")
            .addFields({
                name: "✅ 1.",
                value: "Mengikuti peraturan komunitas (https://discord.com/guidelines) dan terms of service (https://discord.com/terms) Discord."
            }, {
                name: "✅ 2.",
                value: "Tidak melanggar Privacy Policy & Terms of Service Discord."
            }, {
                name: "✅ 3.",
                value: "Gunakan bahasa yang sopan & saling menghargai."
            }, {
                name: "❌ 4.",
                value: "Dilarang spamming, scamming, atau penipuan."
            }, {
                name: "❌ 5.",
                value: "Dilarang mengirim konten NSFW / pornografi."
            }, {
                name: "❌ 6.",
                value: "Dilarang menggunakan nama/foto vulgar atau sulit ditag."
            }, {
                name: "❌ 7.",
                value: "Dilarang diskriminasi terkait ras, agama, gender, usia."
            }, {
                name: "❌ 8.",
                value: "Dilarang membawa masalah pribadi ke server."
            }, {
                name: "9.",
                value: "Apabila terdapat konteks kalimat yg tertera diatas, SEGERA LAPORKAN KE <@&1409428794963656797>"
            }, {
                name: "10.",
                value: "Gunakan Markdown agar postingan / tulisan kalian rapih.\nPelajari tata cara penulisan menggunakan markdown disini : https://support.discord.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline-"
            })
            .setImage("attachment://SunsetAnimation.gif")
            .setFooter({
                text: "Terima kasih sudah membaca aturan 🍵"
            });

        message.channel.send({
            embeds: [rulesEmbed],
            files: ["./SunsetAnimation.gif"],
        });
    }

    // ===============================
    // DAFTAR ROLES + GAMBAR
    // ===============================
    const path = require("path");

    if (message.content === `${prefix}daftarroles`) {

        const ROLE_IDS = {
            coOwner: "1441724729714151444",
            admin: "1409188625983344643",
            moderator: "1409428794963656797",
            mentor: "1409429807544143963",
            partnerOfficer: "1436008269431705886",
            sanDigitalAgency: "1443172599579541574",
            contributor: "1409485226799009854",
            donatur: "1409485300995985440",
            sunsetElite: "1409484699973324853",
            vip: "1409484544532545548",
            brewLovers: "1409464148223594516",

            work: "1438387300303245402",
            magang: "1438377429264498699",
            helper: "1438377939329744968",
            grandmaster: "1438382802927358043",
            master: "1438382452061110272",
            freshBeans: "1438380715506143263",
        };

        const embed = new EmbedBuilder()
            .setColor("#2b2d31")
            .setTitle("☕ Role Sunset Brew")
            .setDescription(`
<@&${ROLE_IDS.coOwner}> — Perwakilan & tangan kanan Owner  
<@&${ROLE_IDS.admin}> — Pengurus server & bantuan member  
<@&${ROLE_IDS.moderator}> — Keamanan & laporan  
<@&${ROLE_IDS.mentor}> — Pengajar / mentor komunitas  
<@&${ROLE_IDS.partnerOfficer}> — Kerja sama antar komunitas  
<@&${ROLE_IDS.sanDigitalAgency}> — Staff / Karyawan Perusahaan  
<@&${ROLE_IDS.contributor}> — Tim Web, Design, dll  
<@&${ROLE_IDS.donatur}> — Donatur server  
<@&${ROLE_IDS.sunsetElite}> — Booster server  
<@&${ROLE_IDS.vip}> — Member VIP  
<@&${ROLE_IDS.brewLovers}> — Member baru  

📈 **Level Roles**
<@&${ROLE_IDS.work}> — Level 35  
<@&${ROLE_IDS.magang}> — Level 25  
<@&${ROLE_IDS.helper}> — Level 20  
<@&${ROLE_IDS.grandmaster}> — Level 15  
<@&${ROLE_IDS.master}> — Level 10  
<@&${ROLE_IDS.freshBeans}> — Level 5
        `)
            .setImage("attachment://SunsetAnimation.gif")
            .setFooter({
                text: "Daftar role sunset brew"
            });

        await message.channel.send({
            embeds: [embed],
            files: ["./SunsetAnimation.gif"],
            allowedMentions: {
                roles: Object.values(ROLE_IDS)
            }
        });
    }

    // ===============================
    // Roles Pendidikan & Pekerjaan + GAMBAR
    // ===============================
    if (message.content === `${prefix}rolepekerjaan`) {

        const ROLE_IDS = {
            BisnisManagement: "1436673359189639188",
            AkuntansiKeuangan: "1436672207685157027",
            pengajar: "1436674321782411387",
            programmer: "1409488298623242272",
            uiuxdesain: "1436672900944891945",
            datasience: "1436674059034169475",
            gamedevelopment: "1436675344936599683",
            itsupport: "1438523838919872583"
        };

        const embed = new EmbedBuilder()
            .setColor("#2b2d31")
            .setTitle("🧑‍🎓 Role Pekerjaan & Pendidikan")
            .setDescription(`
💼 <@&${ROLE_IDS.BisnisManagement}> — Role untuk member yang bekerja di bidang **Business, Management & Entrepreneur**  

💰 <@&${ROLE_IDS.AkuntansiKeuangan}> — Role untuk member di bidang **Akuntansi, Keuangan & Perpajakan**  

🎓 <@&${ROLE_IDS.pengajar}> — Role untuk **Pengajar, Mentor, atau Educator** yang suka membantu member lain  

💻 <@&${ROLE_IDS.programmer}> — Role untuk **Programmer / Developer** yang suka ngoding & membangun aplikasi  

🎨 <@&${ROLE_IDS.uiuxdesain}> — Role untuk **UI / UX Designer & Graphic Designer**  

📊 <@&${ROLE_IDS.datasience}> — Role untuk **Data Science, Data Analyst & Machine Learning**  

🎮 <@&${ROLE_IDS.gamedevelopment}> — Role untuk **Game Developer & Game Designer**  

🛠️ <@&${ROLE_IDS.itsupport}> — Role untuk **IT Support & Technical Support** (troubleshooting sistem)
        `)
            .setImage("attachment://role_pekerjaan.png")
            .setFooter({
                text: "Daftar role pekerjaan & pendidikan Sunset Brew ☕"
            });

        await message.channel.send({
            embeds: [embed],
            files: ["./role_pekerjaan.png"],
            allowedMentions: {
                roles: Object.values(ROLE_IDS)
            }
        });
    }

    // ===============================
    // Roles Galery
    // ===============================
    if (message.content === `${prefix}rolegalery`) {

        const ROLE_IDS = {
            Photographic: "1459116968249393182",
            Musician: "1459131844472868864",
            Creative: "1459135910586089576",
            makanan: "1459116975631372310",
            pemandangan: "1459134581902016512",
            games: "1459139657584611328"
        };

        const embed = new EmbedBuilder()
            .setColor("#2b2d31")
            .setTitle("🖼️ Role Galery")
            .setDescription(`
📸 <@&${ROLE_IDS.Photographic}> — Role untuk member yang suka fotografi atau share foto di channel **Fotografi**

🎶 <@&${ROLE_IDS.Musician}> — Role untuk member yang share music di channel **Musician**

🎨 <@&${ROLE_IDS.Creative}> — Role untuk member yang share karya dan bakat di channel **Creative**

🍔 <@&${ROLE_IDS.makanan}> — Role untuk yang suka share makanan di channel **Makanan**

🌄 <@&${ROLE_IDS.pemandangan}> — Role yang suka share foto **Pemandangan**

🎮 <@&${ROLE_IDS.games}> — Role untuk member yang suka share **Game**

        `)
            .setImage("attachment://galery.png")
            .setFooter({
                text: "Galery Role Sunset Brew 🖼️"
            });

        await message.channel.send({
            embeds: [embed],
            files: ["./galery.png"],
            allowedMentions: {
                roles: Object.values(ROLE_IDS)
            }
        });
    }

    // ===============================
    // AUTO ROLE BERDASARKAN CHANNEL + GAMBAR
    // ===============================

    // channelId : roleId
    const IMAGE_CHANNEL_ROLE_MAP = {
        "1409424527737229353": "1459116968249393182", // 📸 fotografi
        "1409424627146555503": "1459131844472868864", // 🎶 musician
        "1409424730519506964": "1459135910586089576", // 🎨 creative
        "1437053922090025101": "1459116975631372310", // 🍔 makanan
        "1437055591800377445": "1459134581902016512", // 🌄 pemandangan
        "1409425212889501807": "1459139657584611328" // 🎲 games
    };

    const roleId = IMAGE_CHANNEL_ROLE_MAP[message.channel.id];
    if (!roleId) return;

    const hasImage = message.attachments.some(att =>
        (att.contentType && att.contentType.startsWith("image/")) ||
        /\.(png|jpe?g|gif|webp)$/i.test(att.name)
    );

    if (!hasImage) return;

    try {
        const member = await message.guild.members.fetch(message.author.id);
        if (member.roles.cache.has(roleId)) return;

        await member.roles.add(roleId);
        await message.channel.send(
            `${member} otomatis mendapatkan role <@&${roleId}>`
        );
    } catch (err) {
        console.error("❌ Auto role error:", err);
    }

    // =======================================================
    // AUTO REPLY KATA "WELCOME" TANPA PREFIX
    // =======================================================

    if (/^welcome$/i.test(message.content.trim())) {

        const guildId = message.guild.id; // ✅ TAMBAHKAN INI

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setLabel("📜 Rules")
            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.com/channels/${guildId}/1408840543664083025`),

            new ButtonBuilder()
            .setLabel("📘 introduction")
            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.com/channels/${guildId}/1409204682680701080`),

            new ButtonBuilder()
            .setLabel("🎭 Ambil Role")
            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.com/channels/${guildId}/1409423703682318397`),

            new ButtonBuilder()
            .setLabel("☁️ Perkenalan")
            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.com/channels/${guildId}/1442761544667496479`)
        );


        const welcomeEmbed = new EmbedBuilder()
            .setColor("#61dca3")
            .setTitle("👋 Selamat Datang!")
            .setDescription(
                `Halo ${message.author} selamat datang di **Sunset Brew ☕**\n\n` +

                `📌 Silakan lakukan langkah berikut:\n` +
                `• 📜 Baca Rules → <#1408840543664083025>\n` +
                `• 📘 Isi Introduction → <#1409204682680701080>\n` +
                `• 🎭 Ambil Role → <#1409423703682318397>\n` +
                `• ☁️ Perkenalan → <#1442761544667496479>`
            )
            .setImage("attachment://SunsetWelcome.gif")
            .setFooter({
                text: "Sunset Brew welcomes you!"
            });

        message.channel.send({
            embeds: [welcomeEmbed],
            components: [row],
            files: ["./SunsetWelcome.gif"]
        });
    }

});

// 🔹 Fungsi cari channel text pertama yg bisa bot kirim pesan
function getDefaultChannel(guild) {
    return guild.channels.cache.find(
        (ch) =>
        ch.type === ChannelType.GuildText &&
        ch.permissionsFor(guild.members.me).has(PermissionsBitField.Flags.SendMessages)
    );
}

// 🔹 Helper untuk legacy tag
function getLegacyTag(user) {
    return user.discriminator !== "0" ?
        `${user.username}#${user.discriminator}` :
        user.username;
}

// =======================================================
// WELCOME OTOMATIS MEMBER BARU (FINAL GLOBAL VERSION)
// =======================================================

bot.on("guildMemberAdd", async (member) => {

    const channel = getDefaultChannel(member.guild);
    if (!channel) return;

    const guildId = member.guild.id; // ✅ TAMBAHKAN INI

    const legacyTag = getLegacyTag(member.user);

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setLabel("📜 Rules")
        .setStyle(ButtonStyle.Link)
        .setURL(`https://discord.com/channels/${guildId}/1408840543664083025`),

        new ButtonBuilder()
        .setLabel("📘 introduction")
        .setStyle(ButtonStyle.Link)
        .setURL(`https://discord.com/channels/${guildId}/1409204682680701080`),

        new ButtonBuilder()
        .setLabel("🎭 Ambil Role")
        .setStyle(ButtonStyle.Link)
        .setURL(`https://discord.com/channels/${guildId}/1409423703682318397`),

        new ButtonBuilder()
        .setLabel("☁️ Perkenalan")
        .setStyle(ButtonStyle.Link)
        .setURL(`https://discord.com/channels/${guildId}/1442761544667496479`)
    );


    const welcomeEmbed = new EmbedBuilder()
        .setColor("#61dca3")
        .setTitle("👋 Selamat Datang!")
        .setDescription(
            `Halo ${member} selamat datang di **${member.guild.name}** 🍹\n` +
            `Kamu adalah member ke-**${member.guild.memberCount}**.\n\n` +

            `📌 Silakan lakukan langkah berikut:\n` +
            `• 📜 Baca Rules → <#1408840543664083025>\n` +
            `• 📘 Isi Introduction → <#1409204682680701080>\n` +
            `• 🎭 Ambil Role → <#1409423703682318397>\n` +
            `• ☁️ Perkenalan → <#1442761544667496479>\n\n` +

            `🪪 Username: **${legacyTag}**`
        )
        .setThumbnail(member.user.displayAvatarURL({
            dynamic: true,
            size: 512
        }))
        .setImage("attachment://SunsetWelcome.gif")
        .setFooter({
            text: "Sunset Brew welcomes you!"
        });

    channel.send({
        content: `${member}`,
        embeds: [welcomeEmbed],
        components: [row],
        files: ["./SunsetWelcome.gif"]
    });
});

// GOODBYE OTOMATIS MEMBER KELUAR
bot.on("guildMemberRemove", (member) => {
    const channel = getDefaultChannel(member.guild);
    if (!channel) return;

    const legacyTag = getLegacyTag(member.user);

    const goodbyeEmbed = new EmbedBuilder()
        .setColor("#ff0000")
        .setTitle("👋 Selamat Tinggal!")
        .setDescription(
            `**${legacyTag}** telah meninggalkan server 😢\n` +
            `Sekarang total member: **${member.guild.memberCount}**.`
        )
        .setThumbnail(member.user.displayAvatarURL({
            dynamic: true,
            size: 512
        })) // avatar user
        .setImage("attachment://SunsetGoodbye.gif")
        .setFooter({
            text: "Sunset Brew says goodbye!"
        });

    channel.send({
        embeds: [goodbyeEmbed],
        files: ["./SunsetGoodbye.gif"]
    });
});

// ====================================================================
// 5. SLASH COMMAND: /runningtext (LED MERAH)
// ====================================================================
bot.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "runningtext") {
        await interaction.deferReply();

        const text = interaction.options.getString("text") || "WELCOME TO SUNSET BREW";

        const ledText = text
            .toUpperCase()
            .split("")
            .join(" ") // jarak antar huruf
            .replace(/[A-Z]/g, "⬤⬤⬤") // titik LED merah
            .replace(/ /g, " "); // tetap jaga spacing

        await interaction.editReply(
            "```\n" + "⬤⬤⬤ LED PANEL ⬤⬤⬤\n" + ledText + "\n```"
        );
    }
});

// Login pakai token dari .env
bot.login(process.env.DISCORD_TOKEN);
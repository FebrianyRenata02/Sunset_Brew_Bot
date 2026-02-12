// ===============================
// Roles Pendidikan & Pekerjaan + GAMBAR
// ===============================
const path = require("path");

if (message.content === `${prefix}daftarroles`) {

    const ROLE_IDS = {
        BisnisManagement: "1",
        AkuntansiKeuangan: "2",
        pengajar: "3",
        programmer: "4",
        uiuxdesain: "5",
        datasience: "6",
        gamedevelopment: "7",
        itsupport: "8"
    };

    const embed = new EmbedBuilder()
        .setColor("#2b2d31")
        .setTitle("💼🧑‍🎓 Role Pekerjaan & Pendidikan")
        .setDescription(`
<@&${ROLE_IDS.BisnisManagement}> — Role untuk member yang bekerja di bidang **Business, Management & Entrepreneur**  
<@&${ROLE_IDS.AkuntansiKeuangan}> — Role untuk member di bidang **Akuntansi, Keuangan & Perpajakan**  
<@&${ROLE_IDS.pengajar}> — Role untuk **Pengajar, Mentor, atau Educator** yang suka membantu member lain  
<@&${ROLE_IDS.programmer}> — Role untuk **Programmer / Developer** yang suka ngoding & membangun aplikasi  
<@&${ROLE_IDS.uiuxdesain}> — Role untuk **UI / UX Designer & Graphic Designer**  
<@&${ROLE_IDS.datasience}> — Role untuk **Data Science, Data Analyst & Machine Learning**  
<@&${ROLE_IDS.gamedevelopment}> — Role untuk **Game Developer & Game Designer**  
<@&${ROLE_IDS.itsupport}> — Role untuk **IT Support & Technical Support** (troubleshooting sistem)
        `)
        .setImage("attachment://SunsetAnimation.gif")
        .setFooter({
            text: "Daftar role pekerjaan & pendidikan Sunset Brew ☕"
        });

    await message.channel.send({
        embeds: [embed],
        files: ["./SunsetAnimation.gif"],
        allowedMentions: {
            roles: Object.values(ROLE_IDS)
        }
    });
}
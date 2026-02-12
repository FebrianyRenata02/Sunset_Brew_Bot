const {
    createCanvas
} = require("canvas");

async function generateLED(text) {
    const pixelSize = 8; // ukuran kotak LED
    const padding = 20; // jarak pinggir
    const speed = 4; // kecepatan scroll
    const height = 60; // tinggi panel

    // Buat canvas lebar (teks akan scroll)
    const width = text.length * 40;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Background panel hitam
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);

    // Set font LED besar
    ctx.font = "bold 40px monospace";

    // Gambar teks menjadi path koordinat
    ctx.fillStyle = "red";
    ctx.textBaseline = "top";
    ctx.fillText(text, padding, 10);

    // Ambil pixel data untuk LED grid
    const data = ctx.getImageData(0, 0, width, height).data;

    // Buat canvas baru untuk LED grid
    const ledCanvas = createCanvas(width, height);
    const led = ledCanvas.getContext("2d");

    // Gambar LED grid kotak-kotak
    for (let y = 0; y < height; y += pixelSize) {
        for (let x = 0; x < width; x += pixelSize) {

            const index = ((y * width) + x) * 4;

            // Cek apakah pixel merah
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];

            if (r > 150 && g < 80 && b < 80) {
                // LED menyala (merah terang)
                led.fillStyle = "#ff3030";
                led.fillRect(x, y, pixelSize - 1, pixelSize - 1);

                // Glow LED
                led.fillStyle = "rgba(255, 70, 70, 0.25)";
                led.fillRect(x - 2, y - 2, pixelSize + 3, pixelSize + 3);
            } else {
                // LED mati (gelap)
                led.fillStyle = "#111";
                led.fillRect(x, y, pixelSize - 1, pixelSize - 1);
            }
        }
    }

    return ledCanvas.toBuffer("image/png");
}

module.exports = {
    generateLED
};
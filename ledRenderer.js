// ledRenderer.js
const {
    createCanvas
} = require("canvas");

function generateLED(text, color = "red") {
    const dotSize = 6;
    const spacing = 2;
    const hDots = 14;

    const width = (text.length * 18) * (dotSize + spacing);
    const height = hDots * (dotSize + spacing) + 20;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "#111";
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, width - 6, height - 6);

    ctx.fillStyle = "#300";
    for (let y = 0; y < hDots; y++) {
        for (let x = 0; x < text.length * 18; x++) {
            ctx.beginPath();
            ctx.arc(
                x * (dotSize + spacing) + 10,
                y * (dotSize + spacing) + 10,
                dotSize / 2,
                0, Math.PI * 2
            );
            ctx.fill();
        }
    }

    ctx.font = "bold 90px 'Courier New'";
    ctx.fillStyle = color === "green" ? "#0f0" : "#f00";
    ctx.textBaseline = "middle";

    ctx.fillText(text, 10, height / 2);

    return canvas.toBuffer();
}

module.exports = generateLED;
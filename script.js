const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');

let a = 1, b = 0, c = 0;
const scale = 40; // Pixels per unit

function updateValues() {
    a = parseFloat(document.getElementById('slider-a').value);
    b = parseFloat(document.getElementById('slider-b').value);
    c = parseFloat(document.getElementById('slider-c').value);

    document.getElementById('val-a').innerText = a.toFixed(1);
    document.getElementById('val-b').innerText = b.toFixed(1);
    document.getElementById('val-c').innerText = c.toFixed(1);

    document.getElementById('display-a').innerText = a.toFixed(1);
    document.getElementById('display-b').innerText = b.toFixed(1);
    document.getElementById('display-c').innerText = c.toFixed(1);

    const descA = document.getElementById('desc-a');
    if (a > 0) descA.innerText = "Concavidade para CIMA (Sorrindo)";
    else if (a < 0) descA.innerText = "Concavidade para BAIXO (Triste)";
    else descA.innerText = "Reta (Não é quadrática)";

    draw();
}

function draw() {
    const w = canvas.width;
    const h = canvas.height;
    const originX = w / 2;
    const originY = h / 2;

    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();

    for (let x = originX % scale; x < w; x += scale) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
    }

    for (let y = originY % scale; y < h; y += scale) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
    }
    ctx.stroke();

    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(w, originY);
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, h);
    ctx.stroke();

    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 3;
    ctx.beginPath();

    let first = true;
    for (let px = 0; px < w; px++) {
        const x = (px - originX) / scale;
        const y = (a * x * x) + (b * x) + c;
        const py = originY - (y * scale);

        if (first) {
            ctx.moveTo(px, py);
            first = false;
        } else {
            ctx.lineTo(px, py);
        }
    }
    ctx.stroke();
}

function resetValues() {
    document.getElementById('slider-a').value = 1;
    document.getElementById('slider-b').value = 0;
    document.getElementById('slider-c').value = 0;
    updateValues();
}

document.getElementById('slider-a').addEventListener('input', updateValues);
document.getElementById('slider-b').addEventListener('input', updateValues);
document.getElementById('slider-c').addEventListener('input', updateValues);

updateValues();


let currentPalette = [];
let savedPalettes = [];

const generateBtn = document.getElementById('generateBtn');
const saveBtn = document.getElementById('saveBtn');
const baseColorInput = document.getElementById('baseColor');
const paletteContainer = document.getElementById('paletteContainer');
const savedContainer = document.getElementById('savedContainer');
const loadingState = document.getElementById('loadingState');

function generatePalette() {
    showLoading(true);
    const base = baseColorInput.value;
    currentPalette = [
        base,
        lightenColor(base, 20),
        darkenColor(base, 20),
        complementaryColor(base),
        analogousColors(base)[0]
    ];
    setTimeout(() => {
        displayPalette();
        showLoading(false);
    }, 400);
}

function displayPalette() {
    paletteContainer.innerHTML = '';
    currentPalette.forEach(color => {
        const card = document.createElement('div');
        card.className = 'color-card';
        card.tabIndex = 0;

        const sample = document.createElement('div');
        sample.className = 'color-sample';
        sample.style.background = color;

        const code = document.createElement('div');
        code.className = 'color-code';
        code.textContent = color;

        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = 'Copy';
        copyBtn.onclick = () => copyToClipboard(color);

        card.appendChild(sample);
        card.appendChild(code);
        card.appendChild(copyBtn);
        paletteContainer.appendChild(card);
    });
}

function savePalette() {
    if (currentPalette.length === 0) return;
    savedPalettes.push([...currentPalette]);
    persistPalettes();
    displaySavedPalettes();
}

function displaySavedPalettes() {
    savedContainer.innerHTML = '';
    savedPalettes.forEach((palette, idx) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'saved-palette';

        palette.forEach(color => {
            const swatch = document.createElement('div');
            swatch.className = 'saved-color';
            swatch.style.background = color;
            wrapper.appendChild(swatch);
        });

        const delBtn = document.createElement('button');
        delBtn.textContent = '🗑';
        delBtn.title = 'Delete palette';
        delBtn.onclick = () => { deletePalette(idx); };
        wrapper.appendChild(delBtn);

        const exportBtn = document.createElement('button');
        exportBtn.textContent = '⬇';
        exportBtn.title = 'Export palette';
        exportBtn.onclick = () => exportPalette(palette);
        wrapper.appendChild(exportBtn);

        savedContainer.appendChild(wrapper);
    });
}

function lightenColor(hex, amt) {
    return shadeColor(hex, amt);
}
function darkenColor(hex, amt) {
    return shadeColor(hex, -amt);
}
function shadeColor(hex, percent) {
    let c = hex.replace('#','');
    if (c.length === 3) c = c.split('').map(x=>x+x).join('');
    let num = parseInt(c,16);
    let r = (num >> 16) + percent;
    let g = ((num >> 8) & 0x00FF) + percent;
    let b = (num & 0x0000FF) + percent;
    r = Math.max(0,Math.min(255,r));
    g = Math.max(0,Math.min(255,g));
    b = Math.max(0,Math.min(255,b));
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function complementaryColor(hex) {
    let c = hex.replace('#','');
    if (c.length === 3) c = c.split('').map(x=>x+x).join('');
    let num = parseInt(c,16);
    let comp = 0xFFFFFF ^ num;
    return "#" + comp.toString(16).padStart(6, '0');
}

function analogousColors(hex) {
    let hsl = hexToHSL(hex);
    let a1 = (hsl.h + 30) % 360;
    let a2 = (hsl.h + 330) % 360;
    return [hslToHex(a1, hsl.s, hsl.l), hslToHex(a2, hsl.s, hsl.l)];
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}

function deletePalette(idx) {
    savedPalettes.splice(idx, 1);
    persistPalettes();
    displaySavedPalettes();
}

function exportPalette(palette) {
    const data = JSON.stringify(palette, null, 2);
    const blob = new Blob([data], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'palette.json';
    a.click();
    URL.revokeObjectURL(url);
}

function showLoading(show) {
    loadingState.style.display = show ? 'flex' : 'none';
}

function persistPalettes() {
    localStorage.setItem('savedPalettes', JSON.stringify(savedPalettes));
}
function loadPalettes() {
    const data = localStorage.getItem('savedPalettes');
    if (data) savedPalettes = JSON.parse(data);
}

function hexToHSL(H) {
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
        r = "0x" + H[1] + H[1];
        g = "0x" + H[2] + H[2];
        b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
        r = "0x" + H[1] + H[2];
        g = "0x" + H[3] + H[4];
        b = "0x" + H[5] + H[6];
    }
    r /= 255; g /= 255; b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
    }
    return { h: Math.round(h), s: Math.round(s*100), l: Math.round(l*100) };
}

function hslToHex(h, s, l) {
    s /= 100; l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c/2, r=0, g=0, b=0;
    if (0 <= h && h < 60) { r = c; g = x; b = 0; }
    else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
    else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
    else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
    else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
    else if (300 <= h && h < 360) { r = c; g = 0; b = x; }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

window.addEventListener('DOMContentLoaded', () => {
    loadPalettes();
    displaySavedPalettes();
    generatePalette();
});

generateBtn.addEventListener('click', generatePalette);
saveBtn.addEventListener('click', savePalette);
baseColorInput.addEventListener('change', generatePalette);

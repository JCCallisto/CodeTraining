let currentPalette = [];
let savedPalettes = [];

const generateBtn = document.getElementById('generateBtn');
const saveBtn = document.getElementById('saveBtn');
const baseColorInput = document.getElementById('baseColor');
const paletteContainer = document.getElementById('paletteContainer');
const savedContainer = document.getElementById('savedContainer');

generateBtn.addEventListener('click', generatePalette);
saveBtn.addEventListener('click', savePalette);
baseColorInput.addEventListener('change', generatePalette);


import fs from 'fs';
import path from 'path';

const pspGames = [
  { file: 'assassinscreedbl', title: "Assassin's Creed", subtitle: 'Bloodlines', color: '#b91c1c' },
  { file: 'ben10ultimatealien', title: 'Ben 10', subtitle: 'Ultimate Alien', color: '#16a34a' },
  { file: 'callofduttyrtv', title: 'Call of Duty', subtitle: 'Roads to Victory', color: '#475569' },
  { file: 'crashmom', title: 'Crash', subtitle: 'Mind Over Mutant', color: '#ea580c' },
  { file: 'dantesinferno', title: "Dante's", subtitle: 'Inferno', color: '#7f1d1d' },
  { file: 'defjam', title: 'Def Jam', subtitle: 'Fight for NY', color: '#854d0e' },
  { file: 'dbzsb2', title: 'Dragon Ball Z', subtitle: 'Shin Budokai 2', color: '#ca8a04' },
  { file: 'gowcoolympus', title: 'God of War', subtitle: 'Chains of Olympus', color: '#991b1b' },
  { file: 'gowgos', title: 'God of War', subtitle: 'Ghost of Sparta', color: '#7f1d1d' },
  { file: 'legobatman', title: 'LEGO Batman', subtitle: 'The Videogame', color: '#1e3a8a' },
  { file: 'metalgear', title: 'Metal Gear Solid', subtitle: 'Peace Walker', color: '#334155' },
  { file: 'mkunchained', title: 'Mortal Kombat', subtitle: 'Unchained', color: '#dc2626' },
  { file: 'narutosuni', title: 'Naruto Shippuden', subtitle: 'Ultimate Ninja Impact', color: '#f97316' },
  { file: 'spidermanfof', title: 'Spider-Man', subtitle: 'Friend or Foe', color: '#b91c1c' },
  { file: 'toystory3', title: 'Toy Story 3', subtitle: 'The Video Game', color: '#0284c7' },
  { file: 'wwes', title: 'WWE', subtitle: 'SmackDown vs Raw', color: '#991b1b' },
];

const targetDir = 'public/images/games/PSP';
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

for (const g of pspGames) {
  const filePath = path.join(targetDir, `${g.file}.svg`);
  // se o arquivo não existe, cria um SVG estilizado retrô elegante de capa PSP
  if (!fs.existsSync(filePath)) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
  <defs>
    <linearGradient id="bg_${g.file}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0a14"/>
      <stop offset="40%" stop-color="${g.color}"/>
      <stop offset="100%" stop-color="#000000"/>
    </linearGradient>
    <radialGradient id="glow_${g.file}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="300" height="300" rx="16" fill="url(#bg_${g.file})" />
  <circle cx="150" cy="150" r="120" fill="url(#glow_${g.file})" />

  <!-- PSP Header Bar -->
  <rect x="0" y="0" width="300" height="42" rx="16" fill="#ffffff" fill-opacity="0.95" />
  <rect x="0" y="32" width="300" height="10" fill="#ffffff" fill-opacity="0.95" />
  <text x="24" y="27" font-family="'Helvetica Neue', Arial, sans-serif" font-size="20" font-weight="900" fill="#000000" letter-spacing="4">PSP</text>
  <text x="88" y="26" font-family="'Helvetica Neue', Arial, sans-serif" font-size="9" font-weight="bold" fill="#444444" letter-spacing="1">PlayStation Portable</text>
  <line x1="0" y1="42" x2="300" y2="42" stroke="#000000" stroke-width="2" />

  <!-- Decorative Border -->
  <rect x="12" y="54" width="276" height="234" rx="8" fill="none" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2" />

  <!-- Center Content -->
  <g transform="translate(150, 160)">
    <circle cx="0" cy="-10" r="48" fill="#ffffff" fill-opacity="0.08" stroke="#ffffff" stroke-opacity="0.25" stroke-width="2" />
    <!-- Game Pad Icon / Emblem -->
    <path d="M-18 -10 L18 -10 M0 -28 L0 8" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-opacity="0.8" />
    <circle cx="0" cy="-10" r="6" fill="${g.color}" />

    <!-- Game Title -->
    <text x="0" y="44" font-family="'Impact', 'Arial Black', sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="1">
      ${g.title.toUpperCase()}
    </text>
    <text x="0" y="66" font-family="'Helvetica Neue', Arial, sans-serif" font-size="11" font-weight="600" fill="#00f0ff" text-anchor="middle" letter-spacing="1.5">
      ${g.subtitle.toUpperCase()}
    </text>
  </g>

  <!-- Bottom Info -->
  <rect x="20" y="260" width="38" height="20" rx="3" fill="#ffffff" fill-opacity="0.9" />
  <text x="39" y="275" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#000000" text-anchor="middle">T</text>
</svg>`;
    fs.writeFileSync(filePath, svg, 'utf8');
    console.log(`Created: ${filePath}`);
  }
}
console.log('PSP covers check completed!');

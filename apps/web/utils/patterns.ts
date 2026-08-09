let patternCounter = 0;

export function patternSVG(pat: string, c1: string, c2: string): string {
  const svgns = 'http://www.w3.org/2000/svg';
  let inner = '';
  if (pat === 'diamond') {
    inner = Array.from({ length: 36 }).map((_, i) => {
      const col = i % 6, row = Math.floor(i / 6), cx = col * 60 + 30, cy = row * 90 + 45;
      return `<polygon points="${cx},${cy - 26} ${cx + 26},${cy} ${cx},${cy + 26} ${cx - 26},${cy}" fill="none" stroke="${c2}" stroke-opacity="0.35" stroke-width="1.5"/>`;
    }).join('');
  } else if (pat === 'temple') {
    inner = Array.from({ length: 8 }).map((_, i) => `<polygon points="${i * 45},420 ${i * 45 + 45},420 ${i * 45 + 22},370" fill="${c2}" opacity="0.25"/>`).join('');
  } else if (pat === 'jaal') {
    inner = Array.from({ length: 24 }).map((_, i) => {
      const cx = (i % 4) * 90 + 45, cy = Math.floor(i / 4) * 70 + 35;
      return `<circle cx="${cx}" cy="${cy}" r="16" fill="none" stroke="${c2}" stroke-opacity="0.3" stroke-width="1.4"/>`;
    }).join('');
  } else if (pat === 'peacock') {
    inner = Array.from({ length: 5 }).map((_, i) => `<path d="M${60 + i * 70} 420 C ${40 + i * 70} 320, ${80 + i * 70} 260, ${60 + i * 70} 180" stroke="${c2}" stroke-opacity="0.35" stroke-width="2" fill="none"/>`).join('');
  } else if (pat === 'floral') {
    inner = Array.from({ length: 30 }).map((_, i) => {
      const cx = (i % 6) * 60 + 30, cy = Math.floor(i / 6) * 80 + 40;
      return `<circle cx="${cx}" cy="${cy}" r="4" fill="${c2}" opacity="0.4"/>`;
    }).join('');
  } else if (pat === 'stripe') {
    inner = Array.from({ length: 14 }).map((_, i) => `<rect x="${i * 28}" y="0" width="10" height="420" fill="${c2}" opacity="0.18"/>`).join('');
  } else if (pat === 'dots') {
    inner = Array.from({ length: 70 }).map((_, i) => {
      const cx = (i % 10) * 38 + 19, cy = Math.floor(i / 10) * 38 + 19;
      return `<circle cx="${cx}" cy="${cy}" r="9" fill="none" stroke="${c2}" stroke-opacity="0.45" stroke-width="1.6"/><circle cx="${cx}" cy="${cy}" r="2.4" fill="${c2}" opacity="0.4"/>`;
    }).join('');
  } else if (pat === 'wave') {
    inner = Array.from({ length: 16 }).map((_, i) => {
      const y = i * 28;
      return `<path d="M0 ${y} Q45 ${y - 16} 90 ${y} T180 ${y} T270 ${y} T360 ${y}" stroke="${c2}" stroke-opacity="0.32" stroke-width="1.6" fill="none"/>`;
    }).join('');
  } else if (pat === 'block') {
    inner = Array.from({ length: 48 }).map((_, i) => {
      const col = i % 8, row = Math.floor(i / 8), x = col * 45 + 8, y = row * 60 + 8;
      return `<rect x="${x}" y="${y}" width="24" height="24" fill="none" stroke="${c2}" stroke-opacity="0.4" stroke-width="1.4"/>`;
    }).join('');
  } else if (pat === 'check') {
    inner = Array.from({ length: 12 }).map((_, i) => `<rect x="${i * 32}" y="0" width="16" height="420" fill="${c2}" opacity="0.14"/>`).join('') +
      Array.from({ length: 14 }).map((_, i) => `<rect x="0" y="${i * 32}" width="360" height="16" fill="${c2}" opacity="0.14"/>`).join('');
  } else if (pat === 'paisley') {
    inner = Array.from({ length: 15 }).map((_, i) => {
      const cx = (i % 5) * 72 + 36, cy = Math.floor(i / 5) * 130 + 65;
      return `<path d="M${cx} ${cy - 24} C ${cx + 24} ${cy - 24}, ${cx + 24} ${cy + 10}, ${cx} ${cy + 18} C ${cx - 16} ${cy + 22}, ${cx - 20} ${cy + 2}, ${cx - 4} ${cy - 4} C ${cx - 4} ${cy - 16}, ${cx - 8} ${cy - 22}, ${cx} ${cy - 24}Z" fill="none" stroke="${c2}" stroke-opacity="0.4" stroke-width="1.3"/>`;
    }).join('');
  } else if (pat === 'border') {
    inner = `<rect x="0" y="0" width="360" height="34" fill="${c2}" opacity="0.3"/><rect x="0" y="386" width="360" height="34" fill="${c2}" opacity="0.3"/>` +
      Array.from({ length: 18 }).map((_, i) => `<circle cx="${i * 20 + 10}" cy="17" r="4" fill="${c2}" opacity="0.5"/><circle cx="${i * 20 + 10}" cy="403" r="4" fill="${c2}" opacity="0.5"/>`).join('');
  } else if (pat === 'motif') {
    inner = Array.from({ length: 12 }).map((_, i) => {
      const cx = (i % 4) * 90 + 45, cy = Math.floor(i / 4) * 140 + 70;
      return `<circle cx="${cx}" cy="${cy}" r="30" fill="none" stroke="${c2}" stroke-opacity="0.35" stroke-width="1.6"/><circle cx="${cx}" cy="${cy}" r="4" fill="${c2}" opacity="0.4"/>`;
    }).join('');
  } else {
    inner = Array.from({ length: 60 }).map((_, i) => {
      const x = Math.random() * 360, y = Math.random() * 420;
      return `<circle cx="${x}" cy="${y}" r="${Math.random() * 1.6 + 0.4}" fill="${c2}" opacity="0.3"/>`;
    }).join('');
  }
  
  patternCounter++;
  const uid = 'g' + patternCounter;
  
  const sheen = `
    <defs>
      <linearGradient id="sheen-${uid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/>
        <stop offset="30%" stop-color="#ffffff" stop-opacity="0.02"/>
        <stop offset="65%" stop-color="#000000" stop-opacity="0.05"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.4"/>
      </linearGradient>
      <radialGradient id="vig-${uid}" cx="50%" cy="35%" r="75%">
        <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.45"/>
      </radialGradient>
    </defs>`;
    
  const overlay = `<rect width="360" height="420" fill="url(#sheen-${uid})"/><rect width="360" height="420" fill="url(#vig-${uid})"/>`;
  
  return `<svg viewBox="0 0 360 420" xmlns="${svgns}" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;">
    ${sheen}<rect width="360" height="420" fill="${c1}"/>${inner}${overlay}</svg>`;
}

function dark() {
  var darkmode = document.documentElement;
  darkmode.classList.toggle("dark-mode");
}

const layout = [
  ['ESC', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'],
  ["' \"", '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '- _', '+ = ', 'Backspace'],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '` ´', '{ [', '\\ |'],
  ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç', '^ ~', '} ]', 'Enter'],
  ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ', <', '. >', ': ;', '/ ?', 'Shift'],
  ['Ctrl', 'Fn', 'Win', 'Alt', 'Space', 'AltGr', 'Fn', '▤', 'Ctrl']
];

const keyboard = document.getElementById('keyboard');

layout.forEach((rowData, rowIndex) => {
  const row = document.createElement('div');
  row.className = 'row';

  rowData.forEach((keyLabel, keyIndex) => {
    const key = document.createElement('div');
    key.className = 'key';
    key.textContent = keyLabel;

    if (keyLabel === 'Backspace') key.classList.add('backspace');
    if (keyLabel === 'Tab') key.classList.add('tab');
    if (keyLabel === 'Caps') key.classList.add('caps');
    if (keyLabel === 'Enter') key.classList.add('enter');
    if (keyLabel === 'Shift') key.classList.add('shift');
    if (keyLabel === 'Space') key.classList.add('space');
    if (keyLabel === 'Ctrl') key.classList.add('ctrl');
    if (keyLabel === '\\ |') key.classList.add('accent')


    if (keyLabel === '\\ |' || keyLabel === ', <' || keyLabel === '. >' || keyLabel === "' \"" || keyLabel  === '- _' || keyLabel === '+ =' || keyLabel === '´ `' || keyLabel === '{ [' || keyLabel === '^ ~' || keyLabel === '} ]') {
      key.classList.add('top-text');
    }

    if (rowIndex === 0 && (keyIndex === 1 || keyIndex === 5 || keyIndex === 9)) {
      key.classList.add('gap-right');
    } 

    row.appendChild(key);
  });

  keyboard.appendChild(row);
});

document.querySelectorAll('.key').forEach(key => {
  let clickTimeout;

key.addEventListener('mousedown', () => {
  key.classList.add('active');
  key.classList.remove('removing');
});

key.addEventListener('mouseup', () => {
  setTimeout(() => {
    key.classList.add('removing');
    key.classList.remove('active');
  }, 100); // 100ms garante que o glow do clique termine de aparecer
});

  key.addEventListener('mouseleave', () => {
    key.classList.remove('active'); // se sair do botão, glow some
  });
});

const modal = document.querySelector('.section-skills-modal');
const modalContent = modal.querySelector('.modal-content');
const keys = document.querySelectorAll('.key');

// Classes de imagem que vão alternar
const imageClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];
let currentIndex = 0;

keys.forEach(key => {
  key.addEventListener('click', () => {
    const keyLabel = key.textContent.trim();

    // se for ESC, apenas fecha e não troca imagem
    if (keyLabel === 'ESC') {
      modal.classList.remove('show');
      return;
    }

    // mostra o modal
    modal.classList.add('show');

    // alterna entre as imagens
    currentIndex = (currentIndex + 1) % imageClasses.length;

    // atualiza a imagem
    modalContent.className = 'modal-content ' + imageClasses[currentIndex];
  });
});

// Fecha o modal com a tecla ESC do teclado físico, sem trocar imagem
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    modal.classList.remove('show');
  } else {
    // Qualquer outra tecla: abre e troca imagem
    modal.classList.add('show');
    currentIndex = (currentIndex + 1) % imageClasses.length;
    modalContent.className = 'modal-content ' + imageClasses[currentIndex];
  }
});

// fecha o modal com a tecla ESC do teclado físico
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') modal.classList.remove('show');
});


let index = 0;
const cards = document.querySelectorAll('.card');

// classes de imagem correspondentes às 4 cartas
const cardImages = ['Cimg1', 'Cimg2', 'Cimg3', 'Cimg4'];

function moveNextCard() {
  const currentMiddle = document.querySelector('.card.middle');

  // remove imagem e posição da carta que estava no meio
  if (currentMiddle) {
    currentMiddle.classList.remove('middle', ...cardImages);
    currentMiddle.classList.add('end');
  }

  // carta atual vai para o meio
  const nextCard = cards[index];
  nextCard.classList.remove('start', 'end');
  nextCard.classList.add('middle', cardImages[index]); // aplica a imagem correspondente

  index++;

  // se chegou na última carta → prepara para resetar
  if (index === cards.length) {
    document.querySelector('.decks').removeEventListener('click', moveNextCard);
    document.querySelector('.decks').addEventListener('click', resetCards, { once: true });
  }
}

function resetCards() {
  cards.forEach(card => {
    card.classList.remove('middle', 'end', ...cardImages);
    card.classList.add('start');
  });

  index = 0;

  document.querySelector('.decks').addEventListener('click', moveNextCard);
}

document.querySelector('.decks').addEventListener('click', moveNextCard);
const track = document.querySelector('.menu-slider-track');
const items = document.querySelectorAll('.slider-items');
const prev = document.querySelector('.arrow.left');
const next = document.querySelector('.arrow.right');

let slideIndex = 0;

function updateSlide() {
  const width = document.querySelector('.menu-slider').clientWidth;
  track.style.transform = `translateX(${-slideIndex * width}px)`;
}

next.addEventListener('click', () => {
  slideIndex++;
  if (slideIndex > items.length - 1) slideIndex = 0;
  updateSlide();
});

prev.addEventListener('click', () => {
  slideIndex--;
  if (slideIndex < 0) slideIndex = items.length - 1;
  updateSlide();
});

window.addEventListener('resize', updateSlide);

// Menu radial (disco de navegação) — substitui visualmente o header-nav
// original, mas mantém a mesma fonte de verdade: os IDs #about, #skills,
// #social, #projects, #contact das seções.
const radialItems = [
  { id: 'about', label: 'Sobre Mim', icon: 'person' },
  { id: 'skills', label: 'Skills', icon: 'code' },
  { id: 'social', label: 'Redes Sociais', icon: 'share' },
  { id: 'projects', label: 'Projetos', icon: 'folder' },
  { id: 'contact', label: 'Contato', icon: 'mail' }
];

const svgNS = 'http://www.w3.org/2000/svg';
const radialMenu = document.getElementById('radialMenu');
const radialBtn = document.getElementById('radialMenuBtn');
const radialOverlay = document.getElementById('radialMenuOverlay');

const cx = 200;
const cy = 200;
const NORMAL_RADIUS = 190;
const HOVER_RADIUS = 205; // setor "salta" pra fora do disco no hover
const LABEL_RATIO = 0.72; // posição do texto, proporcional ao raio atual
const ICON_RATIO = 0.42; // posição do ícone, proporcional ao raio atual
const sliceAngle = 360 / radialItems.length;

function polarToCartesian(angleDeg, radius) {
  const angleRad = (angleDeg - 90) * Math.PI / 180;
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad)
  };
}

// Monta o "d" do setor (fatia de pizza) pro raio informado
function sectorPath(startAngle, endAngle, radius) {
  const start = polarToCartesian(startAngle, radius);
  const end = polarToCartesian(endAngle, radius);
  const largeArc = (endAngle - startAngle) > 180 ? 1 : 0;
  return `M${cx},${cy} L${start.x},${start.y} A${radius},${radius} 0 ${largeArc},1 ${end.x},${end.y} Z`;
}

// Desenha um ícone simples (só formas básicas) dentro do grupo passado
function drawIcon(type, group) {
  const addShape = (tag, attrs) => {
    const shape = document.createElementNS(svgNS, tag);
    Object.entries(attrs).forEach(([key, value]) => shape.setAttribute(key, value));
    group.appendChild(shape);
  };

  if (type === 'person') {
    addShape('circle', { cx: 0, cy: -9, r: 7 });
    addShape('path', { d: 'M -14,14 C -14,-1 14,-1 14,14' });
  }

  if (type === 'code') {
    addShape('path', { d: 'M -8,-9 L -18,0 L -8,9' });
    addShape('path', { d: 'M 8,-9 L 18,0 L 8,9' });
  }

  if (type === 'share') {
    addShape('circle', { cx: -14, cy: -10, r: 4.5 });
    addShape('circle', { cx: -14, cy: 10, r: 4.5 });
    addShape('circle', { cx: 12, cy: 0, r: 4.5 });
    addShape('line', { x1: -14, y1: -10, x2: 12, y2: 0 });
    addShape('line', { x1: -14, y1: 10, x2: 12, y2: 0 });
  }

  if (type === 'folder') {
    addShape('path', { d: 'M -16,-6 L -4,-6 L 0,-2 L 16,-2 L 16,12 L -16,12 Z' });
  }

  if (type === 'mail') {
    addShape('rect', { x: -16, y: -10, width: 32, height: 20, rx: 2 });
    addShape('path', { d: 'M -16,-10 L 0,4 L 16,-10' });
  }
}

// Brilho suave saindo do centro (dá profundidade sem precisar de imagem)
const defs = document.createElementNS(svgNS, 'defs');
const shineGradient = document.createElementNS(svgNS, 'radialGradient');
shineGradient.setAttribute('id', 'radialShineGradient');
shineGradient.innerHTML = `
  <stop offset="0%" stop-color="#fff" stop-opacity="0.18" />
  <stop offset="100%" stop-color="#fff" stop-opacity="0" />
`;
defs.appendChild(shineGradient);
radialMenu.appendChild(defs);

radialItems.forEach((item, i) => {
  const startAngle = i * sliceAngle;
  const endAngle = startAngle + sliceAngle;
  const midAngle = startAngle + sliceAngle / 2;

  // <a> real dentro do SVG: mesma lógica de navegação por âncora do projeto
  // original (href="#about" etc.), então o scroll suave já vem do
  // "scroll-behavior: smooth" que já existe no style.css — sem JS extra.
  const itemLink = document.createElementNS(svgNS, 'a');
  itemLink.classList.add('radial-item');
  itemLink.setAttribute('href', `#${item.id}`);
  itemLink.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#${item.id}`);

  const sector = document.createElementNS(svgNS, 'path');
  sector.setAttribute('d', sectorPath(startAngle, endAngle, NORMAL_RADIUS));
  sector.classList.add('radial-sector');
  itemLink.appendChild(sector);

  const labelPos = polarToCartesian(midAngle, NORMAL_RADIUS * LABEL_RATIO);
  const label = document.createElementNS(svgNS, 'text');
  label.setAttribute('x', labelPos.x);
  label.setAttribute('y', labelPos.y);
  label.classList.add('radial-label');
  label.textContent = item.label;
  itemLink.appendChild(label);

  const iconPos = polarToCartesian(midAngle, NORMAL_RADIUS * ICON_RATIO);
  const iconGroup = document.createElementNS(svgNS, 'g');
  iconGroup.setAttribute('transform', `translate(${iconPos.x}, ${iconPos.y})`);
  iconGroup.classList.add('radial-icon');
  drawIcon(item.icon, iconGroup);
  itemLink.appendChild(iconGroup);

  // Hover real: entra → expande, sai → volta. Nada de mover o elemento no
  // DOM (isso é o que causava o "travamento"). A expansão é geometria de
  // verdade — o raio do setor aumenta e o texto/ícone acompanham — e não
  // um transform/scale, que distorceria a fatia a partir do ponto errado.
  function setRadius(radius) {
    sector.setAttribute('d', sectorPath(startAngle, endAngle, radius));

    const lp = polarToCartesian(midAngle, radius * LABEL_RATIO);
    label.setAttribute('x', lp.x);
    label.setAttribute('y', lp.y);

    const ip = polarToCartesian(midAngle, radius * ICON_RATIO);
    iconGroup.setAttribute('transform', `translate(${ip.x}, ${ip.y})`);
  }

  itemLink.addEventListener('mouseenter', () => {
    itemLink.classList.add('is-active');
    setRadius(HOVER_RADIUS);
  });

  itemLink.addEventListener('mouseleave', () => {
    itemLink.classList.remove('is-active');
    setRadius(NORMAL_RADIUS);
  });

  // A navegação em si é feita pelo próprio <a> (o navegador cuida do
  // scroll); aqui só fechamos o disco.
  itemLink.addEventListener('click', () => {
    closeRadialMenu();
  });

  radialMenu.appendChild(itemLink);
});

const radialShine = document.createElementNS(svgNS, 'circle');
radialShine.setAttribute('cx', cx);
radialShine.setAttribute('cy', cy);
radialShine.setAttribute('r', NORMAL_RADIUS);
radialShine.setAttribute('fill', 'url(#radialShineGradient)');
radialShine.classList.add('radial-shine');
radialMenu.appendChild(radialShine);

const radialOutline = document.createElementNS(svgNS, 'circle');
radialOutline.setAttribute('cx', cx);
radialOutline.setAttribute('cy', cy);
radialOutline.setAttribute('r', NORMAL_RADIUS);
radialOutline.classList.add('radial-outline');
radialMenu.appendChild(radialOutline);

function openRadialMenu() {
  radialOverlay.classList.add('show');
}

function closeRadialMenu() {
  radialOverlay.classList.remove('show');
}

radialBtn.addEventListener('click', openRadialMenu);

radialOverlay.addEventListener('click', (e) => {
  if (e.target === radialOverlay) closeRadialMenu();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeRadialMenu();
});
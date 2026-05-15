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
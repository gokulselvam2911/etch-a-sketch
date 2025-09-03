const container = document.getElementById('container');
const sizeSlider = document.getElementById('gridSize');
const gridValue = document.getElementById('gridValue');
const gridValue2 = document.getElementById('gridValue2');
const colorPicker = document.getElementById('colorPicker');
const randomColorCheckbox = document.getElementById('randomColor');
const darkenModeCheckbox = document.getElementById('darkenMode');
const clearBtn = document.getElementById('clear');

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

function createGrid(size) {
  container.innerHTML = '';

  const containerWidth = container.clientWidth;
  const cellSize = containerWidth / size;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-cell');
    cell.style.width = `${cellSize}px`;
    cell.style.height = `${cellSize}px`;
    cell.dataset.darkness = 0;

    cell.addEventListener('mouseover', () => {
      let colorToApply = randomColorCheckbox.checked ? randomColor() : colorPicker.value;

      if (darkenModeCheckbox.checked) {
        let darkness = parseFloat(cell.dataset.darkness) || 0;
        darkness = Math.min(darkness + 0.1, 1);
        cell.dataset.darkness = darkness;
        cell.style.backgroundColor = colorToApply;
        cell.style.opacity = darkness;
      } else {
        cell.style.backgroundColor = colorToApply;
        cell.style.opacity = 1;
        cell.dataset.darkness = 0;
      }
    });

    container.appendChild(cell);
  }
}

// initial grid
createGrid(16);

// live slider update
sizeSlider.addEventListener('input', () => {
  const newSize = parseInt(sizeSlider.value);
  gridValue.textContent = newSize;
  gridValue2.textContent = newSize;
  createGrid(newSize);
});

// clear button
clearBtn.addEventListener('click', () => {
  [...container.children].forEach(cell => {
    cell.style.backgroundColor = 'white';
    cell.style.opacity = 1;
    cell.dataset.darkness = 0;
  });
});

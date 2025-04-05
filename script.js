// Your code here.
const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');
const containerRect = container.getBoundingClientRect();

let activeItem = null;
let offsetX = 0;
let offsetY = 0;

// Set initial positions in grid layout
items.forEach((item, index) => {
  const row = Math.floor(index / 5);
  const col = index % 5;
  item.style.left = `${col * 105}px`;
  item.style.top = `${row * 105}px`;

  item.addEventListener('mousedown', (e) => {
    activeItem = item;
    const rect = item.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    item.style.zIndex = 1000;
  });
});

document.addEventListener('mousemove', (e) => {
  if (!activeItem) return;

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  const maxX = container.clientWidth - activeItem.clientWidth;
  const maxY = container.clientHeight - activeItem.clientHeight;

  x = Math.max(0, Math.min(x, maxX));
  y = Math.max(0, Math.min(y, maxY));

  activeItem.style.left = `${x}px`;
  activeItem.style.top = `${y}px`;
});

document.addEventListener('mouseup', () => {
  if (activeItem) {
    activeItem.style.zIndex = 1;
  }
  activeItem = null;
});

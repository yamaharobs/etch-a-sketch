const DEFAULT_COLOR = '#ffffff';
const DEFAULT_SIZE = 16;


let currentSize = DEFAULT_SIZE
let currentColor = DEFAULT_COLOR

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

const grid = document.querySelector('.grid');
const gridItem = document.querySelector('.grid-item');
const gridSize = document.querySelector('.grid-size')
const gridOptionsBtn = document.querySelector('.grid-options-button')
const pageDimmer = document.querySelector('.page-dimmer')
const saveBtn = document.querySelector('.save-button')
const clearGridBtn = document.querySelector('.clear-grid')
const gridSlider = document.querySelector('.grid-slider')
const colorPicker = document.querySelector('.color-picker')

gridOptionsBtn.addEventListener('click', () => {

    pageDimmer.classList.remove('hide');
})

clearGridBtn.addEventListener('click', reloadGrid);

saveBtn.addEventListener('click', () => {
    pageDimmer.classList.add('hide');
})

gridSlider.onchange = (e) => changeGridSize(e.target.value);

gridSlider.onmousemove = (e) => updateGridSize(e.target.value);



function changeGridSize(value) {
    setCurrentSize(value);
    updateGridSize(value);
    reloadGrid();



}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    e.target.style.backgroundColor = currentColor;
}

colorPicker.oninput = (e) => setCurrentColor(e.target.value);

function reloadGrid() {
    clearGrid()
    setupGrid(currentSize);
}

function clearGrid() {
    grid.innerHTML = '';
}

function setCurrentSize(newSize) {
    currentSize = newSize
}

function setCurrentColor(newColor) {
    currentColor = newColor
}

function updateGridSize(value) {
    gridSize.innerHTML = `${value} x ${value}`;
}





function setupGrid(size) {
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`

    for (i = 0; i < size * size; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.addEventListener('mouseover', changeColor)
        gridItem.addEventListener('mousedown', changeColor)
        grid.appendChild(gridItem);
    }

}

window.onload = () => {

    setupGrid(DEFAULT_SIZE);
}


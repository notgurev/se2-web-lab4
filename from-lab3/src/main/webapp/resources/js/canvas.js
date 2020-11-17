let canvasContainer = document.getElementById("graph-picture");

let backgroundCanvas = document.getElementById("background-canvas");
let bCtx = backgroundCanvas.getContext("2d");

let foregroundCanvas = document.getElementById("foreground-canvas");
let fCtx = foregroundCanvas.getContext("2d");

let aimCanvas = document.getElementById("aim-canvas");
let aimCtx = aimCanvas.getContext("2d");

let rFieldFromSlider = document.getElementById("hidden-canvas-form:hidden-r");
let rValueText = document.getElementById("hidden-canvas-form:r-value-text");
let xCanvasForm = document.getElementById("hidden-canvas-form:hidden-x");
let yCanvasForm = document.getElementById("hidden-canvas-form:hidden-y");

let matchingRadsCheckbox = document.getElementById("checkbox-limit-with-matching-r");

// Dimensions
const CANVAS_WH = 500;
const CANVAS_CENTER_X = 250;
const CANVAS_CENTER_Y = 250;
const R_OFFSET = 200;

// Lines, shapes
const LINES_COLOR = "#000000";
const SHAPES_COLOR = "#43b581";
// Points
const POINT_OUTLINE_COLOR = "#000000";
const POINT_OUTLINE_WIDTH = 3;
const POINT_RADIUS = 4;

function canvasX(event) {
    return event.pageX - canvasContainer.offsetLeft;
}

function canvasY(event) {
    return event.pageY - canvasContainer.offsetTop;
}

aimCtx.strokeStyle = POINT_OUTLINE_COLOR;
aimCtx.fillStyle = 'yellow';
aimCtx.lineWidth = POINT_OUTLINE_WIDTH;
fCtx.strokeStyle = POINT_OUTLINE_COLOR;
fCtx.lineWidth = POINT_OUTLINE_WIDTH;

aimCanvas.addEventListener('mouseout', eraseAim);

aimCanvas.addEventListener('mousemove', e => {
    eraseAim();

    aimCtx.beginPath();

    let rValue = rFieldFromSlider.value;
    let scale = rValue / R_OFFSET;

    aimCtx.arc(
        Math.round((canvasX(e) - CANVAS_CENTER_X) * scale) / scale + CANVAS_CENTER_X,
        canvasY(e),
        POINT_RADIUS, 0, 2 * Math.PI
    );
    aimCtx.stroke();
    aimCtx.fill();
    aimCtx.closePath();
})

function drawPointOnGraph(x, y, successful) {
    fCtx.fillStyle = successful ? "lawngreen" : "red";
    fCtx.beginPath();
    fCtx.arc(
        CANVAS_CENTER_X + x * R_OFFSET / rFieldFromSlider.value,
        CANVAS_CENTER_Y - y * R_OFFSET / rFieldFromSlider.value, POINT_RADIUS, 0, 2 * Math.PI);
    fCtx.stroke();
    fCtx.fill();
    fCtx.closePath();
}

function drawBackground() {
    drawShapes(bCtx);
    drawCoordsSystem(bCtx);
    drawLetters(bCtx, rFieldFromSlider.value);
}

function clearCanvas(context) {
    context.clearRect(0, 0, CANVAS_WH, CANVAS_WH);
}

function eraseAim() {
    clearCanvas(aimCtx);
}

function eraseBackground() {
    clearCanvas(bCtx);
}

function erasePoints() {
    clearCanvas(fCtx);
}

function redrawAll() {
    eraseBackground();
    erasePoints();
    drawAll();
}

function redrawPoints() {
    erasePoints();
    drawPoints()
}

function drawAll() {
    drawBackground();
    drawPoints();
}

window.onload = drawAll;

// used in main.xhtml
function sliderChange() {
    redrawAll();
    rValueText.innerText = (+rFieldFromSlider.value).toFixed(1);
}

function getPoints() {
    let table = document.getElementById("results-table_data");
    if (table.childElementCount === 1 && Array.from(table.children[0].classList).includes("ui-datatable-empty-message"))
        return;
    return Array.from(table.children).map(tr => {
        let cells = tr.cells;
        return {
            x: +cells[0].innerText,
            y: +cells[1].innerText,
            r: +cells[2].innerText,
            successful: cells[3].innerText.includes("hit")
        }
    })
}

function drawPoints() {
    erasePoints();
    let selectedR = +rFieldFromSlider.value;
    let points = getPoints();
    if (points !== undefined) {
        if (matchingRadsCheckbox.checked) {
            getPoints().forEach(point => {
                if (point.r === selectedR) drawPointOnGraph(point.x, point.y, point.successful);
            })
        } else {
            getPoints().forEach(point => {
                drawPointOnGraph(point.x, point.y, point.successful);
            })
        }
    }
}

function drawShapes(context) {
    context.fillStyle = SHAPES_COLOR;
    // прямоугольник
    context.fillRect(CANVAS_CENTER_X, CANVAS_CENTER_Y, R_OFFSET, R_OFFSET / 2);
    // треугольник
    context.moveTo(CANVAS_CENTER_X, CANVAS_CENTER_Y);
    context.beginPath();
    context.lineTo(CANVAS_CENTER_X, CANVAS_CENTER_Y - R_OFFSET);
    context.lineTo(CANVAS_CENTER_X - R_OFFSET, CANVAS_CENTER_Y);
    context.lineTo(CANVAS_CENTER_X, CANVAS_CENTER_Y);
    context.fill();
    // четверть круга
    context.beginPath();
    context.lineTo(CANVAS_CENTER_X, CANVAS_CENTER_Y - R_OFFSET);
    context.arc(CANVAS_CENTER_X, CANVAS_CENTER_Y, R_OFFSET, 3 / 2 * Math.PI, 0);
    context.lineTo(CANVAS_CENTER_X, CANVAS_CENTER_Y);
    context.fill();
}

function drawCoordsSystem(context) {
    context.beginPath();
    context.strokeStyle = LINES_COLOR;
    context.lineWidth = 2;
    context.moveTo(0, 250);
    context.lineTo(500, 250);
    context.stroke();
    context.beginPath();
    context.lineWidth = 2;
    context.moveTo(250, 500);
    context.lineTo(250, 0);
    context.stroke();
}

function drawLetters(context, rValue) {
    const TEXT_OFFSET = 5; //px

    const R = String(rValue);
    const HALF_R = String(rValue / 2);

    context.strokeStyle = LINES_COLOR;
    context.font = "15px Arial"
    // R
    context.textAlign = "center"
    // слева
    context.strokeText("- " + R, CANVAS_CENTER_X - R_OFFSET, CANVAS_CENTER_Y - TEXT_OFFSET);
    context.strokeText("- " + HALF_R, CANVAS_CENTER_X - R_OFFSET / 2, CANVAS_CENTER_Y - TEXT_OFFSET);
    // справа
    context.strokeText(R, CANVAS_CENTER_X + R_OFFSET, CANVAS_CENTER_Y - TEXT_OFFSET);
    context.strokeText(HALF_R, CANVAS_CENTER_X + R_OFFSET / 2, CANVAS_CENTER_Y - TEXT_OFFSET);
    // сверху
    context.textAlign = "left";
    context.strokeText(R, CANVAS_CENTER_X + TEXT_OFFSET, CANVAS_CENTER_Y - R_OFFSET);
    context.strokeText(HALF_R, CANVAS_CENTER_X + TEXT_OFFSET, CANVAS_CENTER_Y - R_OFFSET / 2);
    // снизу
    context.strokeText("- " + R, CANVAS_CENTER_X + TEXT_OFFSET, CANVAS_CENTER_Y + R_OFFSET);
    context.strokeText("- " + HALF_R, CANVAS_CENTER_X + TEXT_OFFSET, CANVAS_CENTER_Y + R_OFFSET / 2);
    // X, Y
    context.strokeText("X", 485, 250 - TEXT_OFFSET);
    context.strokeText("Y", 250 + TEXT_OFFSET, 15);
}

aimCanvas.addEventListener('click', e => { // костыль с aimCanvas, т.к. он с бОльшим z-index
    let rValue = rFieldFromSlider.value;

    let scale = rValue / R_OFFSET;

    let canvasX = e.pageX - canvasContainer.offsetLeft;
    let canvasY = e.pageY - canvasContainer.offsetTop;

    let x = Math.round((canvasX - CANVAS_CENTER_X) * scale);
    let y = (CANVAS_CENTER_Y - canvasY) * scale;

    xCanvasForm.value = x;
    yCanvasForm.value = y;

    // jsf remote command call
    console.log(x, y, rValue);
    window.submitCanvasClick();
})
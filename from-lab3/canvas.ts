import {PointService} from "../src/main/angular/lab-app/src/app/point.service";
import {canvasRelativeX, canvasRelativeY} from "../src/main/angular/lab-app/src/app/useful";
import {Hit} from "../src/main/angular/lab-app/src/app/interfaces";

// Dimensions
const CANVAS_WH = 500;
const CANVAS_CENTER_X = CANVAS_WH / 2;
const CANVAS_CENTER_Y = CANVAS_WH / 2;
const R_OFFSET = 200; // from center
// Lines, shapes
const LINES_COLOR = "#000000";
const SHAPES_COLOR = "#43b581";
// Points
const POINT_OUTLINE_COLOR = "#000000";
const POINT_OUTLINE_WIDTH = 3;
const POINT_RADIUS = 4;

class FakeComponent {
    canvasContainer: HTMLElement // graph-picture

    backgroundCanvas: HTMLCanvasElement
    bCtx: CanvasRenderingContext2D

    foregroundCanvas: HTMLCanvasElement
    fCtx: CanvasRenderingContext2D

    aimCanvas: HTMLCanvasElement
    aimCtx: CanvasRenderingContext2D

    points: Hit[]
    rValue: number
    matchingRads: boolean

    constructor(private pointService: PointService) {
    }

    // should be done differently
    addingEventListeners() {
        // костыль с aimCanvas, т.к. он с бОльшим z-index
        this.aimCanvas.addEventListener('click', e => this.submitHit(e))

        // remove crosshair when mouse out
        this.aimCanvas.addEventListener('mouseout', this.eraseAim);

        // crosshair
        this.aimCanvas.addEventListener('mousemove', e => this.redrawAim(e))
    }

    ngOnInit(): void {
        this.aimCtx.strokeStyle = POINT_OUTLINE_COLOR;
        this.aimCtx.fillStyle = 'yellow';
        this.aimCtx.lineWidth = POINT_OUTLINE_WIDTH;
        this.fCtx.strokeStyle = POINT_OUTLINE_COLOR;
        this.fCtx.lineWidth = POINT_OUTLINE_WIDTH;

        this.drawAll();
    }

    // on click
    submitHit(e: MouseEvent) {
        let scale = this.rValue / R_OFFSET;
        let x = Math.round((canvasRelativeX(e, this.canvasContainer) - CANVAS_CENTER_X) * scale);
        let y = (CANVAS_CENTER_Y - canvasRelativeY(e, this.canvasContainer)) * scale;
        this.pointService.submitHit(x, y, this.rValue);
    }

    drawLetters(ctx: CanvasRenderingContext2D) {
        const TEXT_OFFSET = 5; //px

        const R = String(this.rValue);
        const HALF_R = String(this.rValue / 2);

        ctx.strokeStyle = LINES_COLOR;
        ctx.font = "15px Arial"
        // R
        ctx.textAlign = "center"
        // слева
        ctx.strokeText("- " + R, CANVAS_CENTER_X - R_OFFSET, CANVAS_CENTER_Y - TEXT_OFFSET);
        ctx.strokeText("- " + HALF_R, CANVAS_CENTER_X - R_OFFSET / 2, CANVAS_CENTER_Y - TEXT_OFFSET);
        // справа
        ctx.strokeText(R, CANVAS_CENTER_X + R_OFFSET, CANVAS_CENTER_Y - TEXT_OFFSET);
        ctx.strokeText(HALF_R, CANVAS_CENTER_X + R_OFFSET / 2, CANVAS_CENTER_Y - TEXT_OFFSET);
        // сверху
        ctx.textAlign = "left";
        ctx.strokeText(R, CANVAS_CENTER_X + TEXT_OFFSET, CANVAS_CENTER_Y - R_OFFSET);
        ctx.strokeText(HALF_R, CANVAS_CENTER_X + TEXT_OFFSET, CANVAS_CENTER_Y - R_OFFSET / 2);
        // снизу
        ctx.strokeText("- " + R, CANVAS_CENTER_X + TEXT_OFFSET, CANVAS_CENTER_Y + R_OFFSET);
        ctx.strokeText("- " + HALF_R, CANVAS_CENTER_X + TEXT_OFFSET, CANVAS_CENTER_Y + R_OFFSET / 2);
        // X, Y
        ctx.strokeText("X", 485, 250 - TEXT_OFFSET);
        ctx.strokeText("Y", 250 + TEXT_OFFSET, 15);
    }

    drawCoordsSystem(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.strokeStyle = LINES_COLOR;
        ctx.lineWidth = 2;
        ctx.moveTo(0, 250);
        ctx.lineTo(500, 250);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(250, 500);
        ctx.lineTo(250, 0);
        ctx.stroke();
    }

    // wrong shapes probably
    drawShapes(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = SHAPES_COLOR;
        // прямоугольник
        ctx.fillRect(CANVAS_CENTER_X, CANVAS_CENTER_Y, R_OFFSET, R_OFFSET / 2);
        // треугольник
        ctx.moveTo(CANVAS_CENTER_X, CANVAS_CENTER_Y);
        ctx.beginPath();
        ctx.lineTo(CANVAS_CENTER_X, CANVAS_CENTER_Y - R_OFFSET);
        ctx.lineTo(CANVAS_CENTER_X - R_OFFSET, CANVAS_CENTER_Y);
        ctx.lineTo(CANVAS_CENTER_X, CANVAS_CENTER_Y);
        ctx.fill();
        // четверть круга
        ctx.beginPath();
        ctx.lineTo(CANVAS_CENTER_X, CANVAS_CENTER_Y - R_OFFSET);
        ctx.arc(CANVAS_CENTER_X, CANVAS_CENTER_Y, R_OFFSET, 3 / 2 * Math.PI, 0);
        ctx.lineTo(CANVAS_CENTER_X, CANVAS_CENTER_Y);
        ctx.fill();
    }

    clearCanvas(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, CANVAS_WH, CANVAS_WH);
    }

    eraseAim() {
        this.clearCanvas(this.aimCtx);
    }

    eraseBackground() {
        this.clearCanvas(this.bCtx);
    }

    erasePoints() {
        this.clearCanvas(this.fCtx);
    }

    redrawAll() {
        this.eraseBackground();
        this.erasePoints();
        this.drawAll();
    }

    // used when points data changes
    redrawPoints() {
        this.erasePoints();
        this.drawPoints();
    }

    redrawAim(e) {
        this.eraseAim();

        this.aimCtx.beginPath();

        let scale = this.rValue / R_OFFSET;

        this.aimCtx.arc(
            Math.round((canvasRelativeX(e, this.canvasContainer) - CANVAS_CENTER_X) * scale) / scale + CANVAS_CENTER_X,
            canvasRelativeY(e, this.canvasContainer),
            POINT_RADIUS, 0, 2 * Math.PI
        );
        this.aimCtx.stroke();
        this.aimCtx.fill();
        this.aimCtx.closePath();
    }

    drawAll() {
        this.drawBackground();
        this.drawPoints();
    }

    drawPointOnGraph(x, y, successful) {
        this.fCtx.fillStyle = successful ? "lawngreen" : "red";
        this.fCtx.beginPath();
        this.fCtx.arc(
            CANVAS_CENTER_X + x * R_OFFSET / this.rValue,
            CANVAS_CENTER_Y - y * R_OFFSET / this.rValue, POINT_RADIUS, 0, 2 * Math.PI);
        this.fCtx.stroke();
        this.fCtx.fill();
        this.fCtx.closePath();
    }

    drawBackground() {
        this.drawShapes(this.bCtx);
        this.drawCoordsSystem(this.bCtx);
        this.drawLetters(this.bCtx);
    }

    // todo переделать
    drawPoints() {
        this.erasePoints();
        if (this.points !== undefined) {
            if (this.matchingRads) {
                this.points.forEach(point => {
                    if (point.r === this.rValue) this.drawPointOnGraph(point.x, point.y, point.result);
                })
            } else {
                this.points.forEach(point => {
                    this.drawPointOnGraph(point.x, point.y, point.result);
                })
            }
        }
    }
}
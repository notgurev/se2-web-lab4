import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Hit} from '../../model/interfaces';
import {canvasRelativeX, canvasRelativeY} from '../../model/useful';

// Dimensions
const R_OFFSET = 200; // from center
// Lines, shapes
const LINES_COLOR = '#000000';
const SHAPES_COLOR = '#aaaef3'; // todo default value of field
// Points
const POINT_OUTLINE_COLOR = '#000000';
const POINT_OUTLINE_WIDTH = 3;
const POINT_RADIUS = 4;

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, AfterViewInit, OnChanges, DoCheck {
  @ViewChild('container') canvasContainerRef!: ElementRef<HTMLElement>;
  @ViewChild('background') backgroundCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('foreground') foregroundCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('aim') aimCanvasRef!: ElementRef<HTMLCanvasElement>;

  @Input('widthHeight') CANVAS_WH!: number;
  @Input('radius') rValue!: number;
  @Input('data') points!: Hit[];
  @Input('matching-radius') matchingRads!: boolean;

  // retarded
  initialized: boolean = false;

  // even more retarded
  pointsLength!: number;

  // surprisingly not so retarded
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  // todo clean boilerplate
  CANVAS_CENTER_X!: number;
  CANVAS_CENTER_Y!: number;
  canvasContainer!: HTMLElement;
  bCtx!: CanvasRenderingContext2D;
  fCtx!: CanvasRenderingContext2D;
  aimCtx!: CanvasRenderingContext2D;

  ngOnChanges(changes: SimpleChanges) {
    if (this.initialized) {
      this.redrawAll();
    }
  }

  // to detect array changes
  ngDoCheck() {
    if (this.points.length != this.pointsLength) {
      this.pointsLength = this.points.length;
      this.redrawPoints();
    }
  }


  ngOnInit() {
    this.pointsLength = this.points.length;
    console.log(this.pointsLength + ' is points length');
  }

  ngAfterViewInit() {
    this.CANVAS_CENTER_X = this.CANVAS_WH / 2;
    this.CANVAS_CENTER_Y = this.CANVAS_CENTER_X;

    this.bCtx = this.backgroundCanvasRef.nativeElement.getContext('2d')!;
    this.fCtx = this.foregroundCanvasRef.nativeElement.getContext('2d')!;
    this.aimCtx = this.aimCanvasRef.nativeElement.getContext('2d')!;
    this.canvasContainer = this.canvasContainerRef.nativeElement;

    this.aimCtx.strokeStyle = POINT_OUTLINE_COLOR;
    this.aimCtx.fillStyle = 'yellow';
    this.aimCtx.lineWidth = POINT_OUTLINE_WIDTH;
    this.fCtx.strokeStyle = POINT_OUTLINE_COLOR;
    this.fCtx.lineWidth = POINT_OUTLINE_WIDTH;

    this.initialized = true;

    this.drawAll();
  }

  submitHit(e: MouseEvent) {
    let scale = this.rValue / R_OFFSET;
    let x = Math.round((canvasRelativeX(e, this.canvasContainer) - this.CANVAS_CENTER_X) * scale);
    let y = (this.CANVAS_CENTER_Y - canvasRelativeY(e, this.canvasContainer)) * scale;

    this.onSubmit.emit({'x': x, 'y': y, 'r': this.rValue});
  }

  drawLetters(ctx: CanvasRenderingContext2D, canvasCenterX: number, canvasCenterY: number) {
    const TEXT_OFFSET = 5; //px

    const R = String(this.rValue);
    const HALF_R = String(this.rValue / 2);

    ctx.strokeStyle = LINES_COLOR;
    ctx.font = '15px Arial';
    // R
    ctx.textAlign = 'center';
    // слева
    ctx.strokeText('- ' + R, canvasCenterX - R_OFFSET, canvasCenterY - TEXT_OFFSET);
    ctx.strokeText('- ' + HALF_R, canvasCenterX - R_OFFSET / 2, canvasCenterY - TEXT_OFFSET);
    // справа
    ctx.strokeText(R, canvasCenterX + R_OFFSET, canvasCenterY - TEXT_OFFSET);
    ctx.strokeText(HALF_R, canvasCenterX + R_OFFSET / 2, canvasCenterY - TEXT_OFFSET);
    // сверху
    ctx.textAlign = 'left';
    ctx.strokeText(R, canvasCenterX + TEXT_OFFSET, canvasCenterY - R_OFFSET);
    ctx.strokeText(HALF_R, canvasCenterX + TEXT_OFFSET, canvasCenterY - R_OFFSET / 2);
    // снизу
    ctx.strokeText('- ' + R, canvasCenterX + TEXT_OFFSET, canvasCenterY + R_OFFSET);
    ctx.strokeText('- ' + HALF_R, canvasCenterX + TEXT_OFFSET, canvasCenterY + R_OFFSET / 2);
    // X, Y
    ctx.strokeText('X', 485, 250 - TEXT_OFFSET);
    ctx.strokeText('Y', 250 + TEXT_OFFSET, 15);
  }

  drawCoordsSystem(ctx: CanvasRenderingContext2D) {
    console.log('Drawing coords system');
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

  clearCanvas(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.CANVAS_WH, this.CANVAS_WH);
  }

  // wrong shapes probably
  drawShapes(ctx: CanvasRenderingContext2D, canvasCenterX: number, canvasCenterY: number) {
    console.log('Drawing shapes');
    ctx.fillStyle = SHAPES_COLOR;
    // прямоугольник
    ctx.fillRect(canvasCenterX - R_OFFSET, canvasCenterY, canvasCenterX, R_OFFSET / 2);
    // треугольник
    ctx.moveTo(canvasCenterX, canvasCenterY);
    ctx.beginPath();
    ctx.lineTo(canvasCenterX, canvasCenterY + R_OFFSET);
    ctx.lineTo(canvasCenterX + R_OFFSET, canvasCenterY);
    ctx.lineTo(canvasCenterX, canvasCenterY);
    ctx.fill();
    // четверть круга
    ctx.beginPath();
    ctx.lineTo(canvasCenterX - R_OFFSET, canvasCenterY);
    ctx.arc(canvasCenterX, canvasCenterY, R_OFFSET, -Math.PI, -Math.PI / 2);
    ctx.lineTo(canvasCenterX, canvasCenterY);
    ctx.fill();
  }

  eraseAim() {
    this.clearCanvas(this.aimCtx);
  }

  eraseBackground() {
    console.log('Erasing background canvas');
    this.clearCanvas(this.bCtx);
  }

  erasePoints() {
    console.log('Erasing foreground canvas');
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

  redrawAim(e: MouseEvent) {
    this.eraseAim();

    this.aimCtx.beginPath();

    let scale = this.rValue / R_OFFSET;

    this.aimCtx.arc(
      Math.round((canvasRelativeX(e, this.canvasContainer) - this.CANVAS_CENTER_X) * scale) / scale + this.CANVAS_CENTER_X,
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

  drawPointOnGraph(x: number, y: number, successful: boolean) {
    this.fCtx.fillStyle = successful ? 'lawngreen' : 'red';
    this.fCtx.beginPath();
    this.fCtx.arc(
      this.CANVAS_CENTER_X + x * R_OFFSET / this.rValue,
      this.CANVAS_CENTER_Y - y * R_OFFSET / this.rValue, POINT_RADIUS, 0, 2 * Math.PI
    );
    this.fCtx.stroke();
    this.fCtx.fill();
    this.fCtx.closePath();
  }

  drawBackground() {
    this.drawShapes(this.bCtx, this.CANVAS_CENTER_X, this.CANVAS_CENTER_Y);
    this.drawCoordsSystem(this.bCtx);
    this.drawLetters(this.bCtx, this.CANVAS_CENTER_X, this.CANVAS_CENTER_Y);
  }

  drawPoints() {
    if (this.matchingRads) {
      this.points.forEach(point => {
        if (point.r == this.rValue) {
          this.drawPointOnGraph(point.x, point.y, point.result!);
        }
      });
    } else {
      this.points.forEach(point => {
        this.drawPointOnGraph(point.x, point.y, point.result!);
      });
    }
  }
}

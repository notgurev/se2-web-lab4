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
import {Hit} from '../../model/Hit';
import {canvasRelativeX, canvasRelativeY} from '../../model/useful';

// Dimensions
const R_OFFSET = 200; // from center // todo changeable
// Lines, shapes
const LINES_COLOR = '#000000'; // todo changeable
const SHAPES_COLOR = '#aaaef3'; // todo changeable
// Points
const POINT_OUTLINE_COLOR = '#000000'; // todo changeable
const POINT_OUTLINE_WIDTH = 3; // todo remove

const design = {
  colors: {
    aim: 'yellow',
    hit: 'lawngreen',
    miss: 'red'
  },
  pointRadius: 4, // todo whatever
};

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, AfterViewInit, OnChanges, DoCheck {
  @ViewChild('container') canvasContainerRef!: ElementRef<HTMLElement>;
  @ViewChild('aim') aimCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input('widthHeight') wh!: number;
  @Input('radius') rValue!: number;
  @Input('data') hits!: Hit[];
  @Input('matching-radius') matchingRads!: boolean;

  // retarded
  initialized: boolean = false;

  // even more retarded
  pointsLength!: number;

  // surprisingly not so retarded
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  center!: number;
  canvasContainer!: HTMLElement;
  aimCtx!: CanvasRenderingContext2D;
  ctx!: CanvasRenderingContext2D;

  ngOnChanges(changes: SimpleChanges) {
    if (this.initialized && (changes.rValue || changes.matchingRads)) {
      this.redrawAll();
    }
  }

  // to detect array changes
  // todo observable instead
  ngDoCheck() {
    if (this.hits.length != this.pointsLength) {
      this.pointsLength = this.hits.length;
      this.redrawAll();
    }
  }

  // todo observable instead
  ngOnInit() {
    this.pointsLength = this.hits.length;
  }

  ngAfterViewInit() {
    this.center = this.wh / 2;

    this.aimCtx = this.aimCanvasRef.nativeElement.getContext('2d')!;
    this.aimCtx.strokeStyle = POINT_OUTLINE_COLOR;
    this.aimCtx.lineWidth = POINT_OUTLINE_WIDTH;

    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.ctx.lineWidth = POINT_OUTLINE_WIDTH;
    this.ctx.strokeStyle = POINT_OUTLINE_COLOR;

    this.canvasContainer = this.canvasContainerRef.nativeElement;

    this.initialized = true;

    this.drawAll();
  }

  submitHit(e: MouseEvent) {
    let scale = this.drawingR / R_OFFSET;
    let x = Math.round((canvasRelativeX(e, this.canvasContainer) - this.center) * scale);
    let y = (this.center - canvasRelativeY(e, this.canvasContainer)) * scale;

    this.onSubmit.emit({'x': x, 'y': y, 'r': this.rValue});
  }

  drawLetters(ctx: CanvasRenderingContext2D, canvasCenterX: number, canvasCenterY: number) {
    const TEXT_OFFSET = 5; //px

    const R = String(this.drawingR);
    const HALF_R = String(this.drawingR / 2);

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
    // styles
    ctx.strokeStyle = LINES_COLOR;
    ctx.lineWidth = 2;

    // horizontal
    ctx.beginPath();
    ctx.moveTo(0, this.center);
    ctx.lineTo(this.wh, this.center);
    ctx.stroke();
    ctx.beginPath();

    // vertical
    ctx.moveTo(this.center, this.wh);
    ctx.lineTo(this.center, 0);
    ctx.stroke();
  }

  clearCanvas(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.wh, this.wh);
  }

  drawShapes(ctx: CanvasRenderingContext2D, canvasCenterX: number, canvasCenterY: number) {
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

  eraseAim = () => this.clearCanvas(this.aimCtx);

  // used when rValue changes
  redrawAll() {
    this.clearCanvas(this.ctx);
    this.drawAll();
  }

  redrawAim(e: MouseEvent, ctx: CanvasRenderingContext2D) {
    this.eraseAim();
    let scale = this.drawingR / R_OFFSET;
    ctx.fillStyle = design.colors.aim;
    ctx.beginPath();
    ctx.arc(
      Math.round((canvasRelativeX(e, this.canvasContainer) - this.center) * scale) / scale + this.center,
      canvasRelativeY(e, this.canvasContainer),
      design.pointRadius, 0, 2 * Math.PI
    );
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  drawAll() {
    this.drawBackground(this.ctx);
    this.drawHits(this.ctx);
  }

  drawHit(ctx: CanvasRenderingContext2D, x: number, y: number, fillStyle: any) {
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.arc(
      this.center + x * R_OFFSET / this.drawingR,
      this.center - y * R_OFFSET / this.drawingR, design.pointRadius, 0, 2 * Math.PI
    );
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  drawBackground(ctx: CanvasRenderingContext2D) {
    if (this.rValue != 0) {
      this.drawShapes(ctx, this.center, this.center);
    }
    this.drawCoordsSystem(this.ctx);
    this.drawLetters(ctx, this.center, this.center);
  }

  drawHits(ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = POINT_OUTLINE_WIDTH; // todo remove
    let hits = this.matchingRads ? this.hits.filter(point => point.r == this.rValue) : this.hits;
    hits.forEach(point => this.drawHit(ctx, point.x, point.y, design.colors[point.result ? 'hit' : 'miss']));
  }

  get drawingR(): number {
    return this.rValue == 0 ? 1 : this.rValue;
  }
}

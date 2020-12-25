import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Hit} from "../interfaces";

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
  @ViewChild('container') canvasContainer!: ElementRef<HTMLCanvasElement>;
  @ViewChild('background') backgroundCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('foreground') foregroundCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('aim') aimCanvas!: ElementRef<HTMLCanvasElement>;

  @Input('widthHeight') CANVAS_WH!: number;
  @Input('radius') R!: number;
  @Input('data') points!: Hit[]; // todo not sure if not null

  constructor() {
  }

  ngOnInit(): void {
  }
}

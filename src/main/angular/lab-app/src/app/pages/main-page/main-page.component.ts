import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {route} from '../../model/useful';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Hit} from '../../model/Hit';
import {PointService} from '../../services/point.service';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {ErrorMessageService} from '../../services/error-message.service';
import {DisplayModeService} from '../../services/display-mode.service';

interface SubmitResult {
  result: boolean;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  username!: string;
  hits: Hit[] = [];
  pointForm: FormGroup;
  xValues = [-5, -4, -3, -2, -1, 0, 1, 2, 3].reverse();
  rValues = [-5, -4, -3, -2, -1, 0, 1, 2, 3].reverse();
  canvasRadius = 1;
  matchingRadius = false;

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private pointService: PointService,
              private messageService: MessageService,
              private ems: ErrorMessageService,
              public dms: DisplayModeService) {
    this.pointForm = fb.group({
      x: ['', [Validators.required]],
      y: ['', [Validators.required, Validators.min(-4.9999999), Validators.max(4.9999999)]],
      r: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.username = this.authService.username ?? '[something is wrong]';
    this.getHits();
  }

  submitHit(hit: Hit) {
    console.log(`Submitting point with x = ${hit.x}, y = ${hit.y}, r = ${hit.r}`);
    this.pointService.postHit(hit).pipe(
      catchError(this.handleError.bind(this))
    ).subscribe(
      response => {
        this.hits.push(Object.assign({result: (response as SubmitResult).result}, hit));
      }
    );
  }

  getHits() {
    this.pointService.getHits().pipe(
      catchError(this.handleError.bind(this))
    ).subscribe(
      hits => {
        this.hits = hits as Hit[];
      }
    );
  }

  clearHits() {
    this.pointService.deleteHits().pipe(
      catchError(this.handleError.bind(this))
    ).subscribe(
      () => this.hits = []
    );
  }

  private handleError(errorResp: HttpErrorResponse) {
    let error = errorResp.error;
    this.messageService.add({
      detail: (this.ems.any(error) ?? errorResp.statusText)!,
      severity: 'error',
      closable: true,
      key: 'main',
      life: 5 * 1000
    });
    return throwError(errorResp);
  }

  signOut(): void {
    this.authService.signOut();
    route('/auth', this.router);
  }

  get yForm() {
    return this.pointForm.get('y')!;
  }

  get rForm() {
    return this.pointForm.get('r')!;
  }
}

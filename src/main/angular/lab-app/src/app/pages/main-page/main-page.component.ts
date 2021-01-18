import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {route} from '../../model/functions';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Hit} from '../../model/Hit';
import {HitService} from '../../services/hit.service';
import {catchError} from 'rxjs/operators';
import {Subject, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {ErrorTranslateService} from '../../services/error-translate.service';
import {DisplayModeService} from '../../services/display-mode.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  username!: string;
  $hits: Subject<Hit[]> = new Subject<Hit[]>();
  pointForm: FormGroup;
  xValues = [-5, -4, -3, -2, -1, 0, 1, 2, 3].reverse();
  rValues = [-5, -4, -3, -2, -1, 0, 1, 2, 3].reverse();
  canvasRadius = 1;
  matchingRadius = false;
  readonly canvasWidthHeight = 500;

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              public hitService: HitService,
              private messageService: MessageService,
              private errorTranslateService: ErrorTranslateService,
              public dms: DisplayModeService) {
    this.pointForm = fb.group({
      x: ['', [Validators.required]],
      y: ['0', [Validators.min(-4.99999), Validators.max(4.99999)]],
      r: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.username = this.authService.username ?? '[something is wrong]';
    this.getHits();
  }

  submitHit(hit: Hit) {
    console.log(`Submitting hit with x = ${hit.x}, y = ${hit.y}, r = ${hit.r}`);
    this.hitService.postHit(hit).pipe(
      catchError(this.handleError.bind(this))
    ).subscribe(
      () => this.getHits()
    );
  }

  getHits() {
    console.log(`GET hits`);
    this.hitService.getHits().pipe(
      catchError(this.handleError.bind(this))
    ).subscribe(
      hits => this.$hits.next(hits as Hit[])
    );
  }

  clearHits() {
    console.log(`DELETE hits (clear)`);
    this.hitService.deleteHits().pipe(
      catchError(this.handleError.bind(this))
    ).subscribe(
      () => this.$hits.next([])
    );
  }

  private handleError(errorResp: HttpErrorResponse) {
    this.errorTranslateService.getLocalizedErrorMessage(errorResp).then(message => {
      this.messageService.add({
        detail: message,
        severity: 'error',
        closable: true,
        key: 'main',
        life: 5 * 1000
      });
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

  isNaN(value: number): boolean {
    return Number.isNaN(value);
  }
}

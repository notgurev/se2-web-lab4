import {Component, Input} from '@angular/core';
import {Hit} from '../../model/Hit';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input('value') value: Hit[] = [];

  constructor() {
  }
}
